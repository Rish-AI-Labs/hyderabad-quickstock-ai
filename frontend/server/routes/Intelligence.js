import express from 'express';
import { GoogleGenAI } from '@google/genai';
import { bedrockClient } from '../aws-config.js';
import { InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

const router = express.Router();

// ─── Provider Detection ───────────────────────────────────────────────────────
// Returns the active AI provider based on what's configured in .env
const getAIProvider = () => {
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
        return 'bedrock'; // Production: AWS Bedrock
    }
    if (process.env.GEMINI_API_KEY) {
        return 'gemini'; // Development/Fallback: Google Gemini
    }
    return 'mock'; // No credentials: Mock responses
};

// ─── Live Data Fetcher ────────────────────────────────────────────────────────
const getLivePlatformContext = async () => {
    return {
        timestamp: new Date().toISOString(),
        platform: "QuickStock AI - Hyderabad Hyper-Local Distributor",
        coverage: "500+ delivery nodes across Hyderabad — Gachibowli, HITEC City, Jubilee Hills, Banjara Hills, Secunderabad, Kukatpally, LB Nagar.",
        active_nodes: [
            { node: "500001 (Gachibowli)", category: "Fresh Produce", current_stock_units: 840, reorder_point: 200, avg_daily_demand: 120, status: "Healthy" },
            { node: "500034 (HITEC City)", category: "Dairy", current_stock_units: 320, reorder_point: 150, avg_daily_demand: 90, status: "Healthy" },
            { node: "500082 (Jubilee Hills)", category: "Packaged Goods", current_stock_units: 1200, reorder_point: 300, avg_daily_demand: 210, status: "Overstocked" },
            { node: "500016 (Secunderabad)", category: "Fresh Produce", current_stock_units: 90, reorder_point: 200, avg_daily_demand: 150, status: "⚠️ LOW STOCK - Action Required" },
            { node: "500072 (Kukatpally)", category: "Dairy", current_stock_units: 450, reorder_point: 100, avg_daily_demand: 80, status: "Healthy" },
        ],
        demand_trends: {
            "tomato_1kg": { unit: "kg", recent_7d_avg: 126, trend: "+8% vs last week", peak_nodes: ["500001", "500016"] },
            "onion_1kg": { unit: "kg", recent_7d_avg: 98, trend: "-3% vs last week", peak_nodes: ["500082"] },
            "milk_1L": { unit: "L", recent_7d_avg: 310, trend: "+2% vs last week", peak_nodes: ["500034", "500072"] },
            "bread_400g": { unit: "pkt", recent_7d_avg: 75, trend: "+5% vs last week", peak_nodes: ["500082", "500034"] },
        },
        live_signals: [
            { type: "weather", signal: "Rain probability 72% in Gachibowli and HITEC City in next 48h. Impacts last-mile delivery by ~20%." },
            { type: "event", signal: "Bathukamma festival in 6 days. Expected +35% demand on fresh flowers, traditional snacks, ready-to-eat foods." },
            { type: "competitor", signal: "Zepto stockout detected at 2 nodes near Kukatpally. Potential demand spike for onion, tomato." },
            { type: "supply_chain", signal: "Tomato wholesale price up 12% at Bowenpally APMC mandi today. Review procurement plan." },
        ],
        next_3day_forecast: {
            "tomato_1kg_500001": { p10: 110, p50: 135, p90: 165, unit: "kg" },
            "onion_1kg_500082": { p10: 85, p50: 100, p90: 120, unit: "kg" },
            "milk_1L_500034": { p10: 280, p50: 315, p90: 360, unit: "L" },
        },
        system_health: {
            forecast_model_accuracy: "88%",
            last_model_update: "2 hours ago",
            nodes_reporting: "512/514",
        }
    };
};

// ─── Chart Data Selector ─────────────────────────────────────────────────────
// Based on query keywords, return the most relevant chart data from liveContext.
const getChartForQuery = (query, liveContext) => {
    const q = query.toLowerCase();

    // ① Forecast / produce / 3-day queries → P10/P50/P90 chart (check FIRST)
    if (q.includes('forecast') || q.includes('produce') || q.includes('p50') || q.includes('p10') || q.includes('p90') || q.includes('3 day') || q.includes('next')) {
        return {
            type: 'bar',
            title: '3-Day Demand Forecast (P10 / P50 / P90)',
            xKey: 'item',
            bars: [
                { key: 'p10', name: 'P10 (Conservative)', color: '#06b6d4' },
                { key: 'p50', name: 'P50 (Expected)', color: '#10b981' },
                { key: 'p90', name: 'P90 (Peak)', color: '#8b5cf6' }
            ],
            data: Object.entries(liveContext.next_3day_forecast).map(([k, v]) => ({
                item: k.replace(/_/g, ' ').split(' ').slice(0, 2).join(' '),
                p10: v.p10, p50: v.p50, p90: v.p90
            }))
        };
    }

    // ② Demand / trend queries → 7-day historical avg
    if (q.includes('demand') || q.includes('trend') || q.includes('weekly') || q.includes('average')) {
        return {
            type: 'bar',
            title: '7-Day Average Demand by SKU',
            xKey: 'sku',
            bars: [{ key: 'avg_demand', name: 'Avg Daily Demand (units)', color: '#8b5cf6' }],
            data: Object.entries(liveContext.demand_trends).map(([sku, d]) => ({
                sku: sku.replace(/_/g, ' '),
                avg_demand: d.recent_7d_avg,
                trend: d.trend
            }))
        };
    }

    // ③ Inventory / stock level queries → Bar chart of nodes
    if (q.includes('stock') || q.includes('inventory') || q.includes('node') || q.includes('reorder') || q.includes('optimize')) {
        return {
            type: 'bar',
            title: 'Live Inventory Levels vs Reorder Point',
            xKey: 'node',
            bars: [
                { key: 'current_stock', name: 'Current Stock', color: '#10b981' },
                { key: 'reorder_point', name: 'Reorder Point', color: '#ef4444' }
            ],
            data: liveContext.active_nodes.map(n => ({
                node: n.node.split(' ')[0],
                current_stock: n.current_stock_units,
                reorder_point: n.reorder_point,
            }))
        };
    }

    // ④ Festival / weather / signal queries → signals card
    if (q.includes('festival') || q.includes('rain') || q.includes('weather') || q.includes('bathukamma') || q.includes('signal') || q.includes('what if')) {
        return {
            type: 'signals',
            title: 'Active Live Signals',
            data: liveContext.live_signals
        };
    }

    // ⑤ Default: inventory overview
    return {
        type: 'bar',
        title: 'Inventory Overview by Node',
        xKey: 'node',
        bars: [{ key: 'current_stock', name: 'Current Stock Units', color: '#10b981' }],
        data: liveContext.active_nodes.map(n => ({
            node: n.node.split(' ')[0],
            current_stock: n.current_stock_units,
        }))
    };
};

// ─── Prompt Builder ───────────────────────────────────────────────────────────
const buildSystemPrompt = (liveContext) => `
You are the QuickStock AI Intelligence — a data-driven AI agent for a hyper-local quick commerce distribution platform in Hyderabad, India.
Answer STRICTLY based on the real-time platform data below. Cite specific SKUs, node IDs, and numbers. Use markdown with bullet points. Be concise.
Today: ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.

--- LIVE PLATFORM DATA ---
${JSON.stringify(liveContext)}
--- END DATA ---
`;

// ─── AI Caller (Multi-Provider) ───────────────────────────────────────────────
const askAI = async (userQuery, liveContext) => {
    try {
        const provider = getAIProvider();
        console.log(`[Intelligence] Using AI provider: ${provider.toUpperCase()}`);

        const systemPrompt = buildSystemPrompt(liveContext);

        // 1. AWS Bedrock (Production)
        if (provider === 'bedrock') {
            const modelId = process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-sonnet-20240229-v1:0';
            const payload = {
                anthropic_version: "bedrock-2023-05-31",
                max_tokens: 1000,
                system: systemPrompt,
                messages: [{ role: "user", content: userQuery }]
            };
            const command = new InvokeModelCommand({
                ModelId: modelId,
                ContentType: 'application/json',
                Accept: 'application/json',
                Body: JSON.stringify(payload)
            });
            const response = await bedrockClient.send(command);
            const body = JSON.parse(new TextDecoder().decode(response.body));
            return { text: body.content?.[0]?.text || 'No response.', provider: 'AWS Bedrock' };
        }

        // 2. Google Gemini (Fallback)
        if (provider === 'gemini') {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            console.log('[Intelligence] Calling Gemini 2.5S Flash with explicit structure...');
            try {
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-lite',
                    contents: [{ role: 'user', parts: [{ text: userQuery }] }],
                    systemInstruction: { parts: [{ text: systemPrompt }] },
                    config: { temperature: 0.2, maxOutputTokens: 512 }
                });
                return { text: response.text(), provider: 'Google Gemini' };
            } catch (apiError) {
                console.error('[Intelligence] Gemini API Error Details:', JSON.stringify(apiError, null, 2));
                throw apiError;
            }
        }

        // 3. Mock (No credentials)
        return {
            text: `** Mock Response ** (No AI credentials configured) \n\nYour query: "${userQuery}"\n\nTo enable real AI responses, add to your \`.env\`:\n- \`AWS_ACCESS_KEY_ID\` + \`AWS_SECRET_ACCESS_KEY\` → uses AWS Bedrock\n- Or \`GEMINI_API_KEY\` → uses Google Gemini`,
            provider: 'Mock'
        };
    } catch (error) {
        console.error('[Intelligence] askAI Error:', error.message, error.stack);
        throw error;
    }
};

// ─── Routes ───────────────────────────────────────────────────────────────────

router.post('/query', async (req, res) => {
    try {
        const { query } = req.body;
        const liveContext = await getLivePlatformContext();
        const { text, provider } = await askAI(query, liveContext);

        const chart = getChartForQuery(query, liveContext);

        res.status(200).json({
            query,
            response: text,
            chart,
            provider_used: provider,
            context_fetched: true,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('[Intelligence] Query error:', error);
        res.status(500).json({ error: 'Failed to process AI Intelligence query' });
    }
});

router.post('/what-if', async (req, res) => {
    try {
        const { scenario } = req.body;
        const liveContext = await getLivePlatformContext();

        const prompt = `
Analyze this what-if scenario against the live platform data.
Scenario: ${JSON.stringify(scenario)}

Provide:
1. Specific affected nodes and SKUs from the data
2. Quantified impact on demand using numbers from the data
3. Concrete 2-3 step action plan with exact quantities
`;
        const { text, provider } = await askAI(prompt, liveContext);

        res.status(200).json({
            scenario,
            impact_analysis: text,
            provider_used: provider,
            suggestions: []
        });
    } catch (error) {
        console.error('[Intelligence] What-if error:', error);
        res.status(500).json({ error: 'Failed to process what-if scenario' });
    }
});

router.post('/recommendations', async (req, res) => {
    try {
        const { forecast } = req.body;
        const liveContext = await getLivePlatformContext();

        const prompt = `
Given this forecast AND the live platform data, provide exactly 3 prioritized recommendations.
Forecast: ${JSON.stringify(forecast)}

Each recommendation must name the specific SKU, node ID, and give a concrete action with exact quantities.
`;
        const { text, provider } = await askAI(prompt, liveContext);

        res.status(200).json({
            recommendations: text.split('\n').filter(line => line.trim().length > 2),
            provider_used: provider
        });
    } catch (error) {
        console.error('[Intelligence] Recommendations error:', error);
        res.status(500).json({ error: 'Failed to generate recommendations' });
    }
});

export default router;
