import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  TrendingUp, TrendingDown, Package, AlertTriangle, Activity,
  MapPin, Sparkles, Zap, ShoppingCart, BarChart2, RefreshCw,
  CheckCircle2, Info
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, RadialBarChart, RadialBar, Cell
} from 'recharts';

// ─── Dynamic Data Generators ──────────────────────────────────────────────────
const genDemandHistory = (days: number) =>
  Array.from({ length: days }, (_, i) => {
    const base = 100 + i * (days === 7 ? 5 : days === 14 ? 3 : 2);
    const noise = Math.floor(Math.random() * 22) - 8;
    const d = new Date(); d.setDate(d.getDate() - (days - 1 - i));
    return {
      date: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      actual: i < days - 1 ? Math.max(70, base + noise) : null,
      predicted: base + 4,
      p10: base - 18,
      p90: base + 30,
    };
  });

const genNodes = () => [
  { node: '500001', zone: 'Gachibowli', sku: 'Tomato 1kg', stock: 820 + ~~(Math.random() * 50), reorder: 200, daily: 118 + ~~(Math.random() * 12), days_left: 7, status: 'Healthy' },
  { node: '500034', zone: 'HITEC City', sku: 'Milk 1L', stock: 305 + ~~(Math.random() * 40), reorder: 150, daily: 87 + ~~(Math.random() * 10), days_left: 3, status: 'Watch' },
  { node: '500082', zone: 'Jubilee Hills', sku: 'Onion 1kg', stock: 1185 + ~~(Math.random() * 60), reorder: 300, daily: 206 + ~~(Math.random() * 15), days_left: 5, status: 'Overstock' },
  { node: '500016', zone: 'Secunderabad', sku: 'Tomato 1kg', stock: 80 + ~~(Math.random() * 25), reorder: 200, daily: 146 + ~~(Math.random() * 10), days_left: 0, status: 'Critical' },
  { node: '500072', zone: 'Kukatpally', sku: 'Milk 1L', stock: 440 + ~~(Math.random() * 40), reorder: 100, daily: 78 + ~~(Math.random() * 10), days_left: 5, status: 'Healthy' },
  { node: '500033', zone: 'Gachibowli', sku: 'Bread 400g', stock: 220 + ~~(Math.random() * 25), reorder: 120, daily: 67 + ~~(Math.random() * 8), days_left: 3, status: 'Watch' },
  { node: '500051', zone: 'HITEC City', sku: 'Onion 1kg', stock: 530 + ~~(Math.random() * 40), reorder: 150, daily: 92 + ~~(Math.random() * 10), days_left: 5, status: 'Healthy' },
  { node: '500060', zone: 'Jubilee Hills', sku: 'Bread 400g', stock: 58 + ~~(Math.random() * 18), reorder: 100, daily: 57 + ~~(Math.random() * 8), days_left: 1, status: 'Critical' },
];

const genSku = () => [
  { sku: 'Tomato 1kg', demand: 118 + ~~(Math.random() * 16), forecast: 129 + ~~(Math.random() * 12), accuracy: 90 + ~~(Math.random() * 6), fill: '#10b981' },
  { sku: 'Onion 1kg', demand: 93 + ~~(Math.random() * 12), forecast: 97 + ~~(Math.random() * 9), accuracy: 85 + ~~(Math.random() * 7), fill: '#8b5cf6' },
  { sku: 'Milk 1L', demand: 302 + ~~(Math.random() * 22), forecast: 310 + ~~(Math.random() * 12), accuracy: 93 + ~~(Math.random() * 5), fill: '#06b6d4' },
  { sku: 'Bread 400g', demand: 71 + ~~(Math.random() * 12), forecast: 75 + ~~(Math.random() * 9), accuracy: 87 + ~~(Math.random() * 7), fill: '#f59e0b' },
];

const SIGNAL_POOL = [
  { color: 'yellow', icon: '🌧️', title: 'Rain Alert', body: 'Gachibowli & HITEC City — 72% rain probability in 48h. Rerouting 8 nodes automatically.' },
  { color: 'green', icon: '🎉', title: 'Festival Surge', body: 'Bathukamma in 6 days. +35% predicted on flowers, traditional snacks, RTEs at Hyderabad nodes.' },
  { color: 'red', icon: '⚠️', title: 'Critical Low Stock', body: 'Node 500016 (Secunderabad): Tomato stock below reorder point. Auto-PO raised.' },
  { color: 'blue', icon: '📈', title: 'Mandi Price Spike', body: 'Tomato wholesale +12% at Bowenpally APMC today. Procurement review recommended.' },
  { color: 'purple', icon: '🏪', title: 'Competitor Stockout', body: 'Zepto out-of-stock near Kukatpally. Demand overflow opportunity detected for onion.' },
  { color: 'green', icon: '🚚', title: 'SLA Beat', body: 'Node 500034 HITEC City achieved 28-min avg delivery — 4 min under SLA target!' },
  { color: 'yellow', icon: '📦', title: 'Auto-PO Raised', body: 'Node 500060 Jubilee Hills: Bread 400g at 60 units. Auto-PO placed for 300 units.' },
  { color: 'blue', icon: '🤖', title: 'AI Model Updated', body: 'Forecast model retrained with fresh 3-day data. Accuracy improved by 0.4% across all SKUs.' },
  { color: 'green', icon: '💰', title: 'Waste Avoided', body: 'Optimised order quantities at 5 nodes saved ~₹14,200 in perishable waste today.' },
  { color: 'red', icon: '🔔', title: 'Stock Threshold Hit', body: 'Milk 1L at Node 500034 crossed watch threshold (310 → ~305). Monitor closely.' },
];

const genSignals = () =>
  [...SIGNAL_POOL].sort(() => Math.random() - 0.5).slice(0, 5).map((s, i) => ({
    ...s,
    time: i === 0 ? 'Just now' : i === 1 ? `${~~(Math.random() * 4) + 1}m ago` : i === 2 ? `${~~(Math.random() * 10) + 5}m ago` : `${~~(Math.random() * 30) + 15}m ago`,
  }));

// ─── Constants ────────────────────────────────────────────────────────────────
const ALL_ZONES = ['All Zones', 'Gachibowli', 'HITEC City', 'Jubilee Hills', 'Secunderabad', 'Kukatpally'];
const ALL_SKUS = ['All SKUs', 'Tomato 1kg', 'Onion 1kg', 'Milk 1L', 'Bread 400g'];
const TIME_TABS = [{ label: '7 Days', days: 7 }, { label: '14 Days', days: 14 }, { label: '30 Days', days: 30 }];

const STATUS_STYLE: Record<string, string> = {
  Healthy: 'bg-primary-500/15 text-primary-400 border-primary-500/30',
  Watch: 'bg-yellow-500/15 text-yellow-400  border-yellow-500/30',
  Overstock: 'bg-blue-500/15   text-blue-400    border-blue-500/30',
  Critical: 'bg-red-500/15    text-red-400     border-red-500/30',
};
const SIG_BORDER: Record<string, string> = {
  yellow: 'border-yellow-500/30', green: 'border-primary-500/30',
  red: 'border-red-500/30', blue: 'border-cyan-500/30', purple: 'border-accent-500/30',
};

// ─── Child Components ─────────────────────────────────────────────────────────
const Tip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-panel p-3 rounded-xl border border-white/10 text-xs min-w-[140px]">
      <p className="text-gray-300 font-medium border-b border-white/10 pb-1.5 mb-1.5">{label}</p>
      {payload.map((e: any, i: number) => (
        <p key={i} className="flex items-center gap-1.5 py-0.5" style={{ color: e.color }}>
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: e.color }} />
          <span className="text-gray-400 flex-1">{e.name}:</span>
          <span className="font-bold text-white">{e.value ?? '—'}</span>
        </p>
      ))}
    </div>
  );
};

const Stat = ({ title, value, sub, icon: Icon, trend, cls, spark }: any) => (
  <div className="glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden group">
    <div className={`absolute -right-6 -top-6 w-28 h-28 rounded-full mix-blend-screen opacity-15 blur-2xl group-hover:opacity-30 transition-opacity duration-500 ${cls.split(' ')[0]}`} />
    <div className="flex items-start justify-between mb-2 relative z-10">
      <div>
        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-heading font-bold text-white tracking-tight mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${cls}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
    <div className="h-9 w-full relative z-10">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={spark.map((v: number) => ({ v }))}>
          <Line type="monotone" dataKey="v" stroke="#10b981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className={`flex items-center gap-1 mt-1.5 w-fit px-2 py-1 rounded-md relative z-10 ${trend === 'up' ? 'bg-primary-500/10 border border-primary-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
      {trend === 'up' ? <TrendingUp className="h-3 w-3 text-primary-400" /> : <TrendingDown className="h-3 w-3 text-red-400" />}
      <span className={`text-[11px] font-medium ${trend === 'up' ? 'text-primary-300' : 'text-red-300'}`}>{sub}</span>
    </div>
  </div>
);

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [zone, setZone] = useState('All Zones');
  const [sku, setSku] = useState('All SKUs');
  const [tab, setTab] = useState(TIME_TABS[0]);
  const [activeSig, setActiveSig] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const [demand, setDemand] = useState(() => genDemandHistory(7));
  const [nodes, setNodes] = useState(genNodes);
  const [skuPerf, setSkuPerf] = useState(genSku);
  const [signals, setSignals] = useState(genSignals);

  const tick = useCallback(() => {
    setRefreshing(true);
    setDemand(genDemandHistory(tab.days));
    setNodes(genNodes());
    setSkuPerf(genSku());
    setSignals(genSignals());
    setLastUpdated(new Date());
    setTimeout(() => setRefreshing(false), 700);
  }, [tab.days]);

  // 30-second auto refresh
  useEffect(() => {
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [tick]);

  // Refresh on tab change
  useEffect(() => { setDemand(genDemandHistory(tab.days)); }, [tab]);

  const filtered = useMemo(() =>
    nodes.filter(n => (zone === 'All Zones' || n.zone === zone) && (sku === 'All SKUs' || n.sku === sku)),
    [nodes, zone, sku]);

  const critCnt = filtered.filter(n => n.status === 'Critical').length;
  const watchCnt = filtered.filter(n => n.status === 'Watch').length;
  const overCnt = filtered.filter(n => n.status === 'Overstock').length;

  const dynamicStats = useMemo(() => {
    // Generate base metrics that degrade slightly as time horizon increases
    const dayFactor = tab.days === 7 ? 1 : tab.days === 14 ? 1.05 : 1.12;
    // Add small noise based on lastUpdated to simulate "live" data ingestion
    const seed = lastUpdated.getTime() % 1000;
    const noise = (seed / 1000) * 0.4; // 0 to 0.4% jitter

    const errorBase = tab.days === 7 ? 6.2 : tab.days === 14 ? 7.8 : 9.4;
    const errorVal = (errorBase * dayFactor + noise).toFixed(1);
    const accuracyVal = (100 - parseFloat(errorVal)).toFixed(1);

    const otifBase = tab.days === 7 ? 97.2 : tab.days === 14 ? 96.1 : 94.8;
    const otifVal = (otifBase / dayFactor + noise).toFixed(1);

    const stockoutBase = tab.days === 7 ? 98.8 : tab.days === 14 ? 97.5 : 96.2;
    const stockoutVal = (stockoutBase / dayFactor + noise).toFixed(1);

    const turnBase = tab.days === 7 ? 15.4 : tab.days === 14 ? 14.1 : 12.8;
    const turnVal = (turnBase / dayFactor + (noise / 10)).toFixed(1);

    return {
      accuracy: `${accuracyVal}%`,
      wmape: `${errorVal}% WMAPE error`,
      otif: `${otifVal}%`,
      stockout: `${stockoutVal}%`,
      turn: `${turnVal}x`,
      accuracySpark: Array.from({ length: 7 }, (_, i) => 88 + i * 0.8 + noise),
      otifSpark: Array.from({ length: 7 }, (_, i) => 92 + i * 0.7 + noise),
      stockSpark: Array.from({ length: 7 }, (_, i) => 94 + i * 0.6 + noise),
      turnSpark: Array.from({ length: 7 }, (_, i) => 12 + i * 0.4 + noise),
    };
  }, [tab.days, lastUpdated]);

  return (
    <div className="space-y-6 pb-12">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            Dashboard <Sparkles className="h-5 w-5 text-primary-400 animate-pulse" />
          </h1>
          <p className="text-gray-400 mt-1 text-sm">Real-time AI demand signals and hyper-local inventory insights — Hyderabad.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Live indicator */}
          <div className="flex items-center gap-2 glass-panel px-3 py-2 rounded-xl border border-primary-500/20 text-xs text-gray-400">
            <span className={`w-2 h-2 rounded-full ${refreshing ? 'bg-yellow-400 animate-ping' : 'bg-primary-400 animate-pulse'}`} />
            <span className="text-gray-300">Live</span>
            <span className="text-gray-500">· {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          </div>

          {/* Manual refresh */}
          <button onClick={tick} className="glass-panel p-2 rounded-xl border border-white/10 hover:border-primary-500/30 transition-colors">
            <RefreshCw className={`h-4 w-4 text-gray-400 hover:text-primary-400 transition-all ${refreshing ? 'animate-spin text-primary-400' : ''}`} />
          </button>

          {/* Zone */}
          <div className="relative">
            <select value={zone} onChange={e => setZone(e.target.value)}
              className="glass-panel appearance-none pl-3 pr-8 py-2 rounded-xl text-sm text-gray-200 border border-white/10 bg-transparent cursor-pointer focus:outline-none focus:border-primary-500/50">
              {ALL_ZONES.map(z => <option key={z} value={z} className="bg-surface">{z}</option>)}
            </select>
            <MapPin className="absolute right-2 top-2.5 h-3.5 w-3.5 text-cyan-400 pointer-events-none" />
          </div>

          {/* SKU */}
          <div className="relative">
            <select value={sku} onChange={e => setSku(e.target.value)}
              className="glass-panel appearance-none pl-3 pr-8 py-2 rounded-xl text-sm text-gray-200 border border-white/10 bg-transparent cursor-pointer focus:outline-none focus:border-primary-500/50">
              {ALL_SKUS.map(s => <option key={s} value={s} className="bg-surface">{s}</option>)}
            </select>
            <ShoppingCart className="absolute right-2 top-2.5 h-3.5 w-3.5 text-accent-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat title="Weighted Accuracy" value={dynamicStats.accuracy} sub={dynamicStats.wmape} icon={Activity} trend="up" cls="bg-primary-500/10 text-primary-400 border-primary-500/20" spark={dynamicStats.accuracySpark} />
        <Stat title="OTIF Adherence" value={dynamicStats.otif} sub="+1.2% fulfillment" icon={CheckCircle2} trend="up" cls="bg-cyan-500/10 text-cyan-400 border-cyan-500/20" spark={dynamicStats.otifSpark} />
        <Stat title="Stockout Prevention" value={dynamicStats.stockout} sub="0.5% lost sales" icon={Package} trend="up" cls="bg-accent-500/10 text-accent-400 border-accent-500/20" spark={dynamicStats.stockSpark} />
        <Stat title="Inventory Turn" value={dynamicStats.turn} sub="+0.8x velocity" icon={TrendingUp} trend="up" cls="bg-pink-500/10 text-pink-400 border-pink-500/20" spark={dynamicStats.turnSpark} />
      </div>

      {/* ── Critical Alert Banner ── */}
      {critCnt > 0 && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-3 text-red-300 text-sm">
          <AlertTriangle className="h-4 w-4 flex-shrink-0 animate-pulse" />
          <span><strong>{critCnt} node{critCnt > 1 ? 's' : ''}</strong> in your current filter are at critical stock — immediate reorder required.</span>
        </div>
      )}

      {/* ── Demand Chart + SKU Accuracy ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-heading font-semibold text-white flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-primary-400" /> Demand Trajectory & Confidence Bands
            </h3>
            {/* Time range tabs */}
            <div className="flex gap-1 p-1 bg-surface-light/50 rounded-xl border border-white/5">
              {TIME_TABS.map(t => (
                <button key={t.label} onClick={() => setTab(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tab.label === t.label ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' : 'text-gray-500 hover:text-gray-300'}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className={`h-[280px] transition-opacity duration-300 ${refreshing ? 'opacity-50' : 'opacity-100'}`}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demand} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gPred" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gBand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false}
                  interval={tab.days <= 7 ? 0 : tab.days <= 14 ? 1 : 4} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<Tip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', paddingTop: '16px' }} />
                <Area type="monotone" dataKey="p90" fill="url(#gBand)" stroke="none" name="P90 Upper" />
                <Area type="monotone" dataKey="predicted" fill="url(#gPred)" stroke="#10b981" strokeWidth={2.5} name="AI Predicted" dot={false} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="actual" stroke="#38bdf8" strokeWidth={2} strokeDasharray="5 4" name="Actual" dot={false} />
                <Area type="monotone" dataKey="p10" fill="white" fillOpacity={0.03} stroke="none" name="P10 Lower" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col">
          <h3 className="text-sm font-heading font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-400" /> SKU Forecast Accuracy
          </h3>
          <div className={`h-[120px] mb-4 transition-opacity duration-300 ${refreshing ? 'opacity-50' : 'opacity-100'}`}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="30%" outerRadius="100%" data={skuPerf} startAngle={180} endAngle={0} barSize={13}>
                <RadialBar background={{ fill: 'rgba(255,255,255,0.04)' }} dataKey="accuracy" cornerRadius={6} label={false}>
                  {skuPerf.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </RadialBar>
                <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '12px' }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 flex-1">
            {skuPerf.map(s => (
              <div key={s.sku} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.fill }} />
                <span className="text-xs text-gray-300 flex-1 truncate">{s.sku}</span>
                <div className="w-20 h-1.5 bg-surface-light rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${s.accuracy}%`, background: s.fill }} />
                </div>
                <span className="text-xs font-bold text-white w-8 text-right">{s.accuracy}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Inventory Table + Live Signals ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 glass-panel rounded-2xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-heading font-semibold text-white flex items-center gap-2">
              <Package className="h-4 w-4 text-accent-400" /> Node Inventory Status
            </h3>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="px-2 py-0.5 rounded-md bg-red-500/10 border border-red-500/20 text-red-400">{critCnt} Critical</span>
              <span className="px-2 py-0.5 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">{watchCnt} Watch</span>
              <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400">{overCnt} Over</span>
            </div>
          </div>
          <div className={`overflow-x-auto transition-opacity duration-300 ${refreshing ? 'opacity-60' : ''}`}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-[11px] text-gray-500 uppercase tracking-wider">
                  {['Node', 'Zone', 'SKU', 'Stock/Risk', 'DoS', 'Status'].map(h => (
                    <th key={h} className={`pb-3 font-medium ${h === 'Node' || h === 'Zone' || h === 'SKU' ? 'text-left pr-4' : h === 'Status' ? 'text-center' : 'text-right pr-4'}`}>
                      <div className={`flex items-center gap-1 ${h === 'Node' || h === 'Zone' || h === 'SKU' ? 'justify-start' : 'justify-end'}`}>
                        {h}
                        {(h === 'Stock/Risk' || h === 'DoS') && <Info className="h-3 w-3 text-gray-600" />}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-8 text-gray-500 text-sm">No nodes match the current filter.</td></tr>
                ) : filtered.map(n => (
                  <tr key={`${n.node}-${n.sku}`} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-3 pr-4 font-mono text-xs text-gray-300 group-hover:text-white">{n.node}</td>
                    <td className="py-3 pr-4 text-xs text-gray-400">{n.zone}</td>
                    <td className="py-3 pr-4 text-xs text-gray-300">{n.sku}</td>
                    <td className="py-3 pr-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className={`text-[10px] font-bold ${n.stock < n.reorder * 0.5 ? 'text-red-400' : n.stock < n.reorder ? 'text-yellow-400' : 'text-primary-400'}`}>
                          {~~(n.stock / n.reorder * 100)}%
                        </span>
                        <div className="w-12 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                          <div className={`h-full rounded-full ${n.stock < n.reorder * 0.5 ? 'bg-red-500' : n.stock < n.reorder ? 'bg-yellow-500' : 'bg-primary-500'}`} style={{ width: `${Math.min(100, n.stock / n.reorder * 100)}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <span className={`text-xs font-bold ${n.days_left === 0 ? 'text-red-400 animate-pulse' : n.days_left <= 2 ? 'text-yellow-400' : 'text-gray-300'}`}>
                        {n.days_left === 0 ? 'NOW' : `${n.days_left}d`}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium border ${STATUS_STYLE[n.status]}`}>{n.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Signals Feed */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-heading font-semibold text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary-400" /> Live Signals
            </h3>
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
              refreshes every 30s
            </div>
          </div>
          <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[360px]">
            {signals.map((s, i) => (
              <button key={i} onClick={() => setActiveSig(activeSig === i ? null : i)}
                className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${SIG_BORDER[s.color]} ${activeSig === i ? 'bg-surface-light/70' : 'bg-surface-light/25 hover:bg-surface-light/50'}`}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm leading-none">{s.icon}</span>
                  <span className="text-xs font-semibold text-white flex-1">{s.title}</span>
                  <span className="text-[10px] text-gray-500 flex-shrink-0">{s.time}</span>
                </div>
                <p className={`text-[11px] text-gray-400 leading-relaxed transition-all duration-200 overflow-hidden ${activeSig === i ? 'max-h-20' : 'max-h-7 line-clamp-2 overflow-ellipsis'}`}>
                  {s.body}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SKU Demand vs AI Forecast ── */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-heading font-semibold text-white flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-cyan-400" /> SKU Demand vs AI Forecast
          </h3>
          <span className="text-[11px] text-gray-500">Daily avg · units/day · live</span>
        </div>
        <div className={`h-[200px] transition-opacity duration-300 ${refreshing ? 'opacity-50' : 'opacity-100'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skuPerf} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="sku" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<Tip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }} />
              <Bar dataKey="demand" name="Actual Demand" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={28} />
              <Bar dataKey="forecast" name="AI Forecast" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
