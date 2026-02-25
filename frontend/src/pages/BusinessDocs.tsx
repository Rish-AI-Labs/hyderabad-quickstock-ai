import { TrendingUp, Target, Zap, Shield, BarChart2, BookOpen, ArrowRight, DollarSign, Activity, ShoppingCart } from 'lucide-react';

const BusinessDocs = () => {
    return (
        <div className="space-y-10 pb-16 overflow-y-auto max-h-screen pr-2 custom-scrollbar animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-primary-500/10 rounded-2xl border border-primary-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                        <BookOpen className="h-10 w-10 text-primary-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-heading font-bold text-white tracking-tight">Business Docs</h1>
                        <p className="text-gray-400 mt-1 text-lg font-medium">Strategic ROI & Operational Excellence Guide</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-surface-light/30 border border-white/5 rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Live Strategy Mode</span>
                </div>
            </div>

            {/* Core Value Proposition */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-panel p-10 rounded-3xl relative overflow-hidden group">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/10 blur-[100px] rounded-full" />
                    <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                        <TrendingUp className="h-6 w-6 text-primary-400" /> Executive Summary: The AI Edge
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                        QuickStock AI isn't just a dashboard; it's a Profit Protection Engine. In high-velocity retail like quick-commerce, 15 minutes of being out-of-stock on a top SKU can mean a 12% drop in daily node profitability.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-primary-500/30 transition-all">
                            <h4 className="text-white font-bold mb-2">Revenue Recovery</h4>
                            <p className="text-sm text-gray-500">Recapture up to 18% of lost revenue typically attributed to stockouts and poor placement.</p>
                        </div>
                        <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-accent-500/30 transition-all">
                            <h4 className="text-white font-bold mb-2">Waste Elimination</h4>
                            <p className="text-sm text-gray-500">Reduce perishable spoilage by 25% through hyper-accurate, weather-adjusted demand modeling.</p>
                        </div>
                    </div>
                </div>
                <div className="glass-panel p-10 rounded-3xl flex flex-col justify-center items-center text-center border-accent-500/10">
                    <div className="w-20 h-20 bg-accent-500/10 rounded-full flex items-center justify-center mb-6 border border-accent-500/20 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                        <DollarSign className="h-10 w-10 text-accent-400" />
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-white mb-2">14-22%</h3>
                    <p className="text-gray-400 uppercase text-xs font-bold tracking-widest">Average ROI Improvement</p>
                    <div className="mt-8 pt-8 border-t border-white/5 w-full">
                        <p className="text-[11px] text-gray-500 italic font-medium">"Based on pilot testing across 500+ micro-fulfillment nodes."</p>
                    </div>
                </div>
            </div>

            {/* Deep Dive: Metrics that Matter */}
            <div className="space-y-8">
                <h3 className="text-2xl font-heading font-bold text-white pl-4 border-l-4 border-primary-500">Deep Dive: Metrics that Matter</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* WMAPE */}
                    <div className="glass-panel p-8 rounded-3xl hover:translate-y-[-4px] transition-all">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-red-500/10 rounded-2xl text-red-400 border border-red-500/20">
                                <Activity className="h-6 w-6" />
                            </div>
                            <h4 className="text-xl font-bold text-white">WMAPE</h4>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Weighted Mean Absolute Percentage Error. This is our core accuracy metric. Why weighted? Because an error in a best-seller (Milk) hurts more than an error in a slow-mover (Premium Salt). WMAPE ensures the AI focuses where the volume is.
                        </p>
                        <div className="py-3 px-4 bg-surface-dark rounded-xl border border-white/5 inline-flex items-center gap-2">
                            <span className="text-xs font-bold text-primary-400 italic">Target: {'>'}92%</span>
                        </div>
                    </div>

                    {/* OTIF */}
                    <div className="glass-panel p-8 rounded-3xl hover:translate-y-[-4px] transition-all">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400 border border-cyan-500/20">
                                <Shield className="h-6 w-6" />
                            </div>
                            <h4 className="text-xl font-bold text-white">OTIF</h4>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            On-Time In-Full. This measures your brand promise. In quick-commerce, OTIF means having the stock ready *before* the customer taps "Order". We track node-level fulfillment health to prevent partial order cancels.
                        </p>
                        <div className="py-3 px-4 bg-surface-dark rounded-xl border border-white/5 inline-flex items-center gap-2">
                            <span className="text-xs font-bold text-cyan-400 italic">Target: {'>'}98.5%</span>
                        </div>
                    </div>

                    {/* DoS */}
                    <div className="glass-panel p-8 rounded-3xl hover:translate-y-[-4px] transition-all">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-400 border border-orange-500/20">
                                <Zap className="h-6 w-6" />
                            </div>
                            <h4 className="text-xl font-bold text-white">DoS</h4>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Days of Supply. We translate raw stock numbers into time. "50 units" is meaningless; "2.4 Days of Supply" based on AI-predicted demand is actionable. It tells the operator exactly when the next truck must arrive.
                        </p>
                        <div className="py-3 px-4 bg-surface-dark rounded-xl border border-white/5 inline-flex items-center gap-2">
                            <span className="text-xs font-bold text-orange-400 italic">Risk: {'<'}1.5 Days</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Strategic Sections */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <div className="glass-panel p-10 rounded-3xl border border-white/5">
                    <h3 className="text-2xl font-heading font-bold text-white mb-8 flex items-center gap-3">
                        <Target className="h-6 w-6 text-primary-400" /> Forecasting Intelligence
                    </h3>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-gray-400 border border-white/10">1</div>
                            <div>
                                <h5 className="text-white font-bold mb-1">Hyper-Local Pincode Modeling</h5>
                                <p className="text-sm text-gray-500">Most systems forecast at the city level. We forecast at the 500m radius level, capturing local demographics (e.g., higher snack demand near hostels).</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-gray-400 border border-white/10">2</div>
                            <div>
                                <h5 className="text-white font-bold mb-1">Signal Correlation Heatmap</h5>
                                <p className="text-sm text-gray-500">We don't just say "Demand will go up". We show the correlation: "Rain + Saturday Evening = 40% Spike in Tea/Biscuits". This build trust with managers.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-gray-400 border border-white/10">3</div>
                            <div>
                                <h5 className="text-white font-bold mb-1">Confidence Scoring (P10/P50/P90)</h5>
                                <p className="text-sm text-gray-500">We provide risk boundaries. P50 is the expected demand, while P90 prepares the business for peak surges, ensuring zero stockouts during high-stakes weekends.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-10 rounded-3xl border border-white/5 bg-accent-500/[0.02]">
                    <h3 className="text-2xl font-heading font-bold text-white mb-8 flex items-center gap-3">
                        <BarChart2 className="h-6 w-6 text-accent-400" /> Advanced Analytics Mastery
                    </h3>
                    <div className="space-y-6">
                        <div className="p-6 bg-surface-dark/40 rounded-2xl border border-white/5">
                            <h5 className="text-primary-400 font-bold mb-3 uppercase text-xs tracking-widest flex items-center gap-2">
                                <DollarSign className="h-3 w-3" /> Financial Impact: Overstock vs Lost Sales
                            </h5>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                Our analytics engine calculates the Carrying Cost of capital tied up in slow-movers vs the Revenue at Risk from popular items. This helps CFOs optimize working capital without starving growth.
                            </p>
                        </div>
                        <div className="p-6 bg-surface-dark/40 rounded-2xl border border-white/5">
                            <h5 className="text-accent-400 font-bold mb-3 uppercase text-xs tracking-widest flex items-center gap-2">
                                <ShoppingCart className="h-3 w-3" /> Category Benchmarking
                            </h5>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                Not all categories behave the same. We benchmark "Fresh" against "Staples" to find systemic fulfillment issues. If Fresh OTIF is low while Staples is high, it flags a cold-chain logistics bottleneck.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="p-10 glass-panel rounded-3xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">Ready to optimize your network?</h3>
                    <p className="text-gray-400">Our Business Intelligence layer is designed to give you a competitive advantage in local commerce.</p>
                </div>
                <button className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-heading font-bold rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2 group">
                    View ROI Insights <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default BusinessDocs;
