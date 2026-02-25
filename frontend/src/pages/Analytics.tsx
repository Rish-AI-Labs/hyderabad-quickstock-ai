import { Sparkles, TrendingUp, Target, Activity, CheckCircle2, AlertCircle, CloudRain, ShoppingCart } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Analytics = () => {

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            Performance Analytics
            <Activity className="h-6 w-6 text-primary-400" />
          </h1>
          <p className="text-gray-400 mt-2 text-sm max-w-2xl">Historical accuracy tracking and network-wide efficiency metrics.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 glass-panel rounded-lg text-sm text-gray-300 hover:text-white hover:border-white/20 transition-all font-medium">Export Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                <AlertCircle className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Revenue at Risk</p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-white tracking-tight flex items-baseline gap-2">
                ₹1.2<span className="text-2xl text-gray-400 font-medium">Cr</span>
              </p>
              <p className="text-xs text-red-400 mt-2 flex items-center gap-1 font-medium bg-red-500/10 w-fit px-2 py-1 rounded border border-red-500/20">
                Potential stockout impact
              </p>
              <p className="text-sm text-gray-500 mt-3 pt-3 border-t border-white/5">Calculated based on P90 demand spikes vs current stock levels.</p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-3xl rounded-full" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Network OTIF</p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-white tracking-tight flex items-baseline gap-2">
                96.4<span className="text-3xl text-gray-400">%</span>
              </p>
              <p className="text-xs text-primary-400 mt-2 flex items-center gap-1 font-medium bg-primary-500/10 w-fit px-2 py-1 rounded border border-primary-500/20">
                <TrendingUp className="h-3 w-3" /> +2.1% fulfillment
              </p>
              <p className="text-sm text-gray-500 mt-3 pt-3 border-t border-white/5">Percentage of orders delivered On-Time and In-Full.</p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 blur-3xl rounded-full" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-accent-500/10 border border-accent-500/20 text-accent-400">
                <Target className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Weighted Accuracy</p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-white tracking-tight flex items-baseline gap-2">
                92.8<span className="text-3xl text-gray-400">%</span>
              </p>
              <div className="w-full bg-surface-dark rounded-full h-1.5 mt-4 border border-white/5 overflow-hidden">
                <div className="bg-gradient-to-r from-accent-400 to-primary-500 h-1.5 rounded-full" style={{ width: `92.8%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-2">Overall WMAPE efficiency for current quarter.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial & Category Intelligence Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-heading font-semibold text-white">Financial Impact: Waste vs Lost Sales</h3>
            <span className="text-xs text-gray-500">Quarterly Values (₹ Lakhs)</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { category: 'Dairy', waste: 12, loss: 8 },
                { category: 'Fresh', waste: 25, loss: 12 },
                { category: 'Staples', waste: 5, loss: 18 },
                { category: 'RTE', waste: 15, loss: 4 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="category" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="waste" name="Carrying Cost / Waste" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="loss" name="Lost Sales / Opportunity" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-heading font-semibold text-white mb-6">Signal Correlation Heatmap</h3>
          <div className="space-y-4">
            {[
              { factor: 'Heavy Rain in Gachibowli', correlation: 88, impact: 'High Surge on Dairy/Essentials', icon: <CloudRain className="text-cyan-400" /> },
              { factor: 'Mandi Price Spike (Onion)', correlation: 72, impact: 'Procurement Volume Optimized', icon: <TrendingUp className="text-primary-400" /> },
              { factor: 'Festive Weekend (Bathukamma)', correlation: 94, impact: 'Peak Demand on Sweets/RTE', icon: <Sparkles className="text-accent-400" /> },
              { factor: 'Zepto Stockout Detected', correlation: 65, impact: 'Competitor Capture Opportunity', icon: <ShoppingCart className="text-yellow-400" /> },
            ].map((item, idx) => (
              <div key={idx} className="bg-surface-light/30 border border-white/5 rounded-xl p-4 flex items-center gap-4 group hover:bg-surface-light/50 transition-all">
                <div className="p-3 rounded-lg bg-white/5">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-white">{item.factor}</p>
                    <span className="text-xs font-bold text-primary-400">{item.correlation}% Accuracy</span>
                  </div>
                  <p className="text-[11px] text-gray-500">{item.impact}</p>
                  <div className="w-full bg-surface-dark rounded-full h-1 mt-2 overflow-hidden">
                    <div className="bg-primary-500 h-full rounded-full" style={{ width: `${item.correlation}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
