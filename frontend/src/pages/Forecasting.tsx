import { useState } from 'react';
import { TrendingUp, Calendar, MapPin, Package, Cpu, Sparkles, Navigation, AlertCircle, Info, Target, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { apiService } from '../services/api';
import toast from 'react-hot-toast';

const Forecasting = () => {
  const [productId, setProductId] = useState('tomato_1kg');
  const [pincode, setPincode] = useState('500001');
  const [days, setDays] = useState(7);
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateForecast = async () => {
    setLoading(true);
    try {
      const response = await apiService.generateForecast(productId, pincode, days);
      // The API now returns the forecast object directly in response.data
      setForecast(response.data);
      toast.success('Simulation Complete', {
        icon: '🧠',
        style: { background: 'rgba(12, 74, 110, 0.9)', color: '#fff', backdropFilter: 'blur(10px)', border: '1px solid rgba(16, 185, 129, 0.3)' }
      });
    } catch (error) {
      toast.error('Simulation Failed', {
        style: { background: 'rgba(111, 28, 28, 0.9)', color: '#fff', backdropFilter: 'blur(10px)', border: '1px solid rgba(239, 68, 68, 0.3)' }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary-500/10 rounded-xl border border-primary-500/20">
          <Cpu className="h-8 w-8 text-primary-400" />
        </div>
        <div>
          <h1 className="text-3xl font-heading font-bold text-white tracking-tight">Demand Simulator</h1>
          <p className="text-gray-400 mt-1">Run probabilistic forecasts using real-time local signals</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Parameters Panel */}
        <div className="lg:col-span-1 border-r border-white/5 pr-0 lg:pr-6">
          <div className="glass-panel rounded-2xl p-6 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-3xl rounded-full pointer-events-none" />

            <h3 className="text-lg font-heading font-semibold text-white mb-6">Simulation Parameters</h3>

            <div className="space-y-5 relative z-10">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  SKU Selection
                </label>
                <div className="relative">
                  <select
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-surface/50 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all"
                  >
                    <option value="tomato_1kg" className="bg-surface">Tomato (1kg) - Fresh</option>
                    <option value="onion_1kg" className="bg-surface">Onion (1kg) - Essential</option>
                    <option value="potato_1kg" className="bg-surface">Potato (1kg) - Essential</option>
                    <option value="milk_1l" className="bg-surface">Milk (1L) - Dairy</option>
                    <option value="bread_400g" className="bg-surface">Bread (400g) - Bakery</option>
                  </select>
                  <Package className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Target Node (Pincode)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-surface/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all"
                    placeholder="Enter 6-digit PIN"
                  />
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Horizon (Days)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                    min="1"
                    max="30"
                    className="w-full pl-10 pr-4 py-3 bg-surface/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all"
                  />
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleGenerateForecast}
                  disabled={loading}
                  className="w-full relative group overflow-hidden rounded-xl px-4 py-3 disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-cyan-600 transition-all duration-300 group-hover:scale-105" />
                  <div className="relative flex items-center justify-center text-white font-medium">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white mr-3" />
                        Running Neural Net...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Execute Simulation
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          {forecast ? (
            <div className="space-y-6 animate-slide-up">
              <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-primary-500 to-accent-500" />

                <div className="flex items-center justify-between mb-8 mt-2">
                  <h3 className="text-xl font-heading font-bold text-white">Simulation Results</h3>
                  <div className="flex gap-4">
                    <span className="bg-surface-light px-3 py-1 rounded-lg text-xs text-gray-400 font-mono border border-white/5">
                      ID: {forecast.forecast_id.split('-')[0]}
                    </span>
                    <span className="bg-primary-500/10 text-primary-400 border border-primary-500/20 px-3 py-1 rounded-lg text-xs font-medium">
                      {forecast.prediction_horizon_days} Day Horizon
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4">Predicted Inventory Requirement (Units)</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="glass-panel bg-cyan-900/10 border-cyan-500/10 rounded-xl p-5 hover:border-cyan-500/30 transition-colors">
                    <p className="text-sm font-medium text-cyan-400 mb-2">P10 (Conservative)</p>
                    <p className="text-4xl font-heading font-bold text-white tracking-tight">{Math.round(forecast.predicted_demand?.p10 || 0)}</p>
                    <p className="text-xs text-cyan-500/70 mt-2">Lower Confidence Bound</p>
                  </div>
                  <div className="glass-panel bg-primary-900/20 border-primary-500/30 rounded-xl p-5 shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)] transform scale-105 relative z-10 hover:border-primary-400/50 transition-colors">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">TARGET BASELINE</div>
                    <p className="text-sm font-medium text-primary-400 mb-2">P50 (Expected)</p>
                    <p className="text-5xl font-heading font-bold text-white tracking-tight drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">{Math.round(forecast.predicted_demand?.p50 || 0)}</p>
                    <p className="text-xs text-primary-500 mt-2">Median Probability</p>
                  </div>
                  <div className="glass-panel bg-accent-900/10 border-accent-500/10 rounded-xl p-5 hover:border-accent-500/30 transition-colors">
                    <p className="text-sm font-medium text-accent-400 mb-2">P90 (Aggressive/Peak)</p>
                    <p className="text-4xl font-heading font-bold text-white tracking-tight">{Math.round(forecast.predicted_demand?.p90 || 0)}</p>
                    <p className="text-xs text-accent-500/70 mt-2">Upper Buffer Limit</p>
                  </div>
                </div>

                {/* Inventory Strategy Logic */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-surface-light/30 rounded-xl p-5 border border-white/5 flex items-center justify-between group hover:bg-surface-light/50 transition-all">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">Safety Stock</span>
                        <Info className="h-3 w-3 text-gray-500" />
                      </div>
                      <p className="text-2xl font-heading font-bold text-white">{Math.round((forecast.predicted_demand?.p90 || 0) - (forecast.predicted_demand?.p50 || 0))}</p>
                      <p className="text-[10px] text-gray-500 mt-1">Units (P90 - P50 Variance)</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400">
                      <Package className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="bg-surface-light/30 rounded-xl p-5 border border-white/5 flex items-center justify-between group hover:bg-surface-light/50 transition-all">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Service Level</span>
                        <Target className="h-3 w-3 text-gray-500" />
                      </div>
                      <p className="text-2xl font-heading font-bold text-white">98.5<span className="text-sm text-gray-500">%</span></p>
                      <p className="text-[10px] text-gray-500 mt-1">Target Fulfillment Probability</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Zap className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                <div className="bg-surface-light/30 rounded-xl p-5 border border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium mb-1">Model Confidence Score</p>
                      <p className="text-sm text-gray-400">Based on historical variance and anomaly detection</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-heading font-bold text-primary-400">{(forecast.confidence_score * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-surface-dark rounded-full h-1.5 mt-3 border border-white/5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-primary-500 h-1.5 rounded-full"
                      style={{ width: `${forecast.confidence_score * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Time Series Chart */}
              {forecast.time_series && (
                <div className="glass-panel rounded-2xl p-6">
                  <h3 className="text-lg font-heading font-semibold text-white mb-6 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary-400" />
                    Demand Projection Timeline ({days} Days)
                  </h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={forecast.time_series} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorP50" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorP90" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="p90" stroke="none" fill="url(#colorP90)" name="P90 Peak" />
                        <Area type="monotone" dataKey="p10" stroke="none" fill="white" fillOpacity={0.05} name="P10 Base" />
                        <Area type="monotone" dataKey="p50" stroke="#10b981" strokeWidth={3} fill="url(#colorP50)" name="P50 Expected" activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#0a0f1c' }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Influencing Factors */}
                {forecast.influencing_factors && forecast.influencing_factors.length > 0 && (
                  <div className="glass-panel rounded-2xl p-6 h-full border-t border-accent-500/30">
                    <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent-400" />
                      Primary Drivers
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {forecast.influencing_factors.map((factor: string, index: number) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-surface-light border border-white/10 text-gray-200 rounded-xl text-sm capitalize flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-400 block animate-pulse" />
                          {factor.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actionable Insights */}
                {forecast.actionable_insights && forecast.actionable_insights.length > 0 && (
                  <div className="glass-panel rounded-2xl p-6 h-full border-t border-yellow-500/30">
                    <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                      AI Recommendations
                    </h3>
                    <ul className="space-y-3">
                      {forecast.actionable_insights.map((insight: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-gray-300 bg-surface-light/40 p-3 rounded-lg border border-white/5">
                          <Navigation className="h-4 w-4 text-primary-400 mt-0.5 flex-shrink-0 lg:mt-0" />
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] glass-panel rounded-2xl p-12 text-center flex flex-col items-center justify-center border-dashed border-white/10">
              <div className="w-20 h-20 bg-surface-light rounded-full flex items-center justify-center mb-6">
                <Package className="h-10 w-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-heading text-white mb-2">No Active Simulation</h3>
              <p className="text-gray-500 max-w-sm">Configure parameters on the left and run the simulator to visualize predicted demand metrics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forecasting;
