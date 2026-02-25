import { Terminal, Code, Cpu, Server, Database, Layers, Settings, Book, Box, ShieldCheck, Zap } from 'lucide-react';

const DevDocs = () => {
    return (
        <div className="space-y-12 pb-20 overflow-y-auto max-h-screen pr-2 custom-scrollbar animate-fade-in">
            {/* Header / Title Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-accent-500/10 rounded-2xl border border-accent-500/20 shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                        <Code className="h-10 w-10 text-accent-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-heading font-bold text-white tracking-tight">Developer Docs</h1>
                        <p className="text-gray-400 mt-1 text-lg font-medium font-mono text-accent-400/80">v0.0.1: Technical Internal Manual</p>
                    </div>
                </div>
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-accent-500/10 border border-accent-500/20 rounded-full">
                    <Box className="h-3 w-3 text-accent-400" />
                    <span className="text-[10px] font-bold text-accent-300 uppercase tracking-widest">Master Docs</span>
                </div>
            </div>

            {/* Introduction / Philosophy */}
            <div className="glass-panel p-10 rounded-3xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 blur-[100px] rounded-full" />
                <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                    <Book className="h-6 w-6 text-accent-400" /> Core Engineering Philosophy
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <p className="text-gray-400 leading-relaxed text-sm">
                        The QuickStock AI platform is built for **resilient micro-services** interacting via a high-performance React bridge. We prioritize low-latency state synchronization and reactive UI components that can handle thousands of concurrent SKU signals without taxing the main thread.
                        Our "Code Book" approach ensures that any developer joining the project can understand the data lineage from a hyper-local pincode signal to a service-level safety stock recommendation.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5 text-primary-400" />
                            <span className="text-sm font-bold text-white">Full-Stack Type Safety with TypeScript</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Zap className="h-5 w-5 text-cyan-400" />
                            <span className="text-sm font-bold text-white">Optimistic UI & Live Refresh Hooks</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Cpu className="h-5 w-5 text-accent-400" />
                            <span className="text-sm font-bold text-white">Neural Net Integration via Bedrock</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Architecture: The Data Pipeline */}
            <div className="space-y-6">
                <h3 className="text-xl font-heading font-bold text-white pl-4 border-l-4 border-accent-500">System Architecture & Data Flow</h3>

                <div className="glass-panel p-1 border border-white/5 rounded-[2rem] overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
                        <div className="p-8">
                            <Layers className="h-8 w-8 text-primary-400 mb-6" />
                            <h4 className="font-bold text-white mb-4">Frontend Layer</h4>
                            <ul className="text-xs text-gray-500 space-y-3">
                                <li>• **Vite + React (SWC):** Fast builds & HMR</li>
                                <li>• **Tailwind CSS:** JIT utility-first styling</li>
                                <li>• **Recharts:** Canvas/SVG data orchestration</li>
                                <li>• **Lucide React:** Iconography system</li>
                            </ul>
                        </div>
                        <div className="p-8 bg-surface-dark/20">
                            <Server className="h-8 w-8 text-cyan-400 mb-6" />
                            <h4 className="font-bold text-white mb-4">Express API Bridge</h4>
                            <ul className="text-xs text-gray-500 space-y-3">
                                <li>• **Middleware:** Session-based JWT auth</li>
                                <li>• **Route Handlers:** Abstracting AWS SDK complexity</li>
                                <li>• **Mock Pipeline:** Configurable via `.env` toggle</li>
                                <li>• **SST / AWS Lambda:** Scalable serverless logic</li>
                            </ul>
                        </div>
                        <div className="p-8">
                            <Database className="h-8 w-8 text-purple-400 mb-6" />
                            <h4 className="font-bold text-white mb-4">AI Intelligence</h4>
                            <ul className="text-xs text-gray-500 space-y-3">
                                <li>• **Bedrock / LitLLM:** Multi-LLM adapter core</li>
                                <li>• **RAG Pipeline:** Context injection from node status</li>
                                <li>• **TimeSeries ML:** Safety stock P90 logic</li>
                                <li>• **Prompt Engineering:** Dynamic template engine</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Implementational Patterns (Code Book) */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <h3 className="text-xl font-heading font-bold text-white">Live Data Synchronization</h3>
                    <div className="bg-surface-dark/80 p-6 rounded-2xl border border-white/5 font-mono text-xs leading-relaxed group hover:border-accent-500/30 transition-all">
                        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                            <span className="text-accent-400 flex items-center gap-2"><Terminal className="h-3 w-3" /> useLiveSync.ts</span>
                            <span className="text-gray-600">TypeScript</span>
                        </div>
                        <p className="text-pink-400">const<span className="text-white"> useDashboardSync = () =&gt; {"{"}</span></p>
                        <p className="pl-4 text-gray-400">// Trigger re-fetch every 30s for demo real-time feel</p>
                        <p className="pl-4"><span className="text-orange-400">useEffect</span>(() =&gt; {"{"}</p>
                        <p className="pl-8 text-pink-400">const<span className="text-white"> interval = <span className="text-orange-400">setInterval</span>(() =&gt; {"{"}</span></p>
                        <p className="pl-12 text-blue-400">fetchRealTimeMetrics<span className="text-white">();</span></p>
                        <p className="pl-8 text-white">{"}"}, <span className="text-orange-400">30000</span>);</p>
                        <p className="pl-8 text-pink-400">return<span className="text-white"> () =&gt; <span className="text-orange-400">clearInterval</span>(interval);</span></p>
                        <p className="pl-4 text-white">{"}"}, []);</p>
                        <p className="text-white">{"}"};</p>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed italic">
                        This pattern ensures that the global view always reflects the latest inventory spikes, correlating to the Signal Correlation engine.
                    </p>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-heading font-bold text-white">AWS Implementation Pattern</h3>
                    <div className="bg-surface-dark/80 p-6 rounded-2xl border border-white/5 font-mono text-xs leading-relaxed group hover:border-accent-500/30 transition-all">
                        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                            <span className="text-cyan-400 flex items-center gap-2"><Settings className="h-3 w-3" /> aws-config.js</span>
                            <span className="text-gray-600">JavaScript</span>
                        </div>
                        <p className="text-gray-400">// Bedrock Runtime Invocation</p>
                        <p className="text-pink-400">async function<span className="text-white"> callInference(prompt) {"{"}</span></p>
                        <p className="pl-4 text-pink-400">const<span className="text-white"> command = <span className="text-orange-400">new InvokeModelCommand</span>({"{"}</span></p>
                        <p className="pl-8 text-white">modelId: <span className="text-green-400">'anthropic.claude-v3'</span>,</p>
                        <p className="pl-8 text-white">body: <span className="text-orange-400">JSON.stringify</span>({"{"} prompt {"}"})</p>
                        <p className="pl-4 text-white">{"}"});</p>
                        <p className="pl-4 text-pink-400">return await<span className="text-white"> client.<span className="text-blue-400">send</span>(command);</span></p>
                        <p className="text-white">{"}"}</p>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed italic">
                        The backend translates Bedrock's RAW byte-stream response into clean JSON for the frontend Intelligence and Forecast pages.
                    </p>
                </div>
            </div>

            {/* Dev Environment & Onboarding */}
            <div className="glass-panel p-10 rounded-3xl border border-white/5 bg-gradient-to-br from-accent-500/[0.03] to-transparent">
                <h3 className="text-2xl font-heading font-bold text-white mb-8">Onboarding: Set up your Dev Environment</h3>
                <div className="space-y-6">
                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="h-10 w-10 rounded-xl bg-orange-400/10 flex items-center justify-center border border-orange-400/20 text-orange-400 flex-shrink-0">
                            <Terminal className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-1">Environment Variables</h4>
                            <p className="text-xs font-mono text-gray-500 mb-4 bg-black/40 p-2 rounded tracking-tighter">
                                AWS_ACCESS_KEY_ID=... <br />
                                AWS_REGION=ap-south-1 <br />
                                LITLLM_API_KEY=...
                            </p>
                            <p className="text-sm text-gray-500">Ensure the AWS user has IAM permissions for `bedrock:InvokeModel` and `lambda:InvokeFunction`.</p>
                        </div>
                    </div>
                </div>

                {/* System Architecture Diagram */}
                <div className="space-y-6">
                    <h3 className="text-xl font-heading font-bold text-white pl-4 border-l-4 border-cyan-500">
                        Full System Architecture Diagram
                    </h3>
                    <div className="glass-panel p-4 rounded-3xl border border-white/5 overflow-hidden group hover:border-cyan-500/20 transition-all">
                        <div className="flex items-center gap-2 mb-4 px-2">
                            <Cpu className="h-4 w-4 text-cyan-400" />
                            <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">AWS Architecture · QuickStock AI</span>
                        </div>
                        <img
                            src="/architecture.png"
                            alt="Hyderabad QuickStock AI System Architecture"
                            className="w-full rounded-2xl border border-white/5 object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevDocs;
