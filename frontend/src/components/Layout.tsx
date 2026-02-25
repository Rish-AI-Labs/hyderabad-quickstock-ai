import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  MessageSquare,
  BarChart3,
  Menu,
  X,
  Zap,
  LogOut,
  User as UserIcon,
  BookOpen,
  Code
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Forecasting', href: '/forecasting', icon: TrendingUp },
    { name: 'AI Intelligence', href: '/Intelligence', icon: MessageSquare },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  const docNavigation = [
    { name: 'Business Docs', href: '/docs/business', icon: BookOpen },
    { name: 'Developer Docs', href: '/docs/dev', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-sans text-gray-100 flex flex-col lg:flex-row">
      {/* Background Glow Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-500/10 blur-[120px] mix-blend-screen pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-accent-500/10 blur-[120px] mix-blend-screen pointer-events-none z-0" />

      {/* Mobile sidebar overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col glass-panel border-l-0 border-y-0 shadow-2xl transition-transform transform">
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <h1 className="text-xl font-heading font-bold text-gradient flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary-400" />
              QuickStock<span className="text-white">AI</span>
            </h1>
            <button className="text-gray-400 hover:text-white transition-colors" onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${isActive
                    ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-surface-light/50 border border-transparent hover:border-white/5'
                    }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : ''}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 py-2 border-t border-white/5">
            <p className="px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Knowledge Base</p>
            {docNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2.5 text-xs font-medium rounded-lg transition-all ${isActive
                    ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-400 rounded-xl transition-all duration-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-72 lg:h-screen lg:fixed lg:inset-y-0 p-4 z-50">
        <div className="flex flex-col flex-grow glass-panel rounded-2xl relative overflow-hidden">
          {/* Subtle gradient border line at top */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

          <div className="flex items-center h-20 px-6 border-b border-white/5">
            <h1 className="text-2xl font-heading font-bold text-gradient flex items-center gap-2 tracking-tight">
              <Zap className="h-6 w-6 text-primary-400" />
              QuickStock<span className="text-white">AI</span>
            </h1>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${isActive
                    ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)] scale-[1.02]'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-surface-light/40 border border-transparent hover:border-white/5'
                    }`}
                >
                  <Icon className={`mr-3 h-5 w-5 transition-all duration-300 ${isActive ? 'text-primary-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : ''}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/5 space-y-4">
            <div>
              <p className="px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">Knowledge Base</p>
              <div className="space-y-1">
                {docNavigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-4 py-2.5 text-xs font-medium rounded-xl transition-all ${isActive
                        ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20 shadow-[0_0_12px_-3px_rgba(139,92,246,0.15)]'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-surface-light/30'
                        }`}
                    >
                      <Icon className={`mr-3 h-4 w-4 ${isActive ? 'text-accent-400' : ''}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center p-3 rounded-xl bg-surface-light/10 border border-white/5">
              <div className="h-10 w-10 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
                <UserIcon className="h-5 w-5 text-primary-400" />
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-gray-200 truncate">{user?.name}</p>
                <p className="text-[11px] text-gray-500 truncate">{user?.role}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-400 rounded-xl transition-all duration-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:pl-72 z-10 min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8 bg-background/50 backdrop-blur-xl border-b border-white/5 lg:border-none lg:bg-transparent lg:backdrop-blur-none lg:mt-4 lg:mb-2 lg:mx-4">
          <div className="flex items-center gap-4 lg:hidden">
            <button
              type="button"
              className="p-2 -m-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-heading font-bold text-gradient flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary-400" /> QuickStock<span className="text-white">AI</span>
            </h1>
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-between glass-panel px-6 pl-8 h-16 rounded-2xl w-full cursor-pointer relative z-50 pointer-events-auto">
            <h2 className="text-sm font-medium text-gray-300 tracking-wide uppercase letter-spacing-[0.05em] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              Hyper-Local Demand Forecaster
            </h2>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-primary-500/30 bg-primary-500/10 text-primary-300 shadow-[inset_0_0_10px_rgba(16,185,129,0.1)]">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
                System Healthy
              </span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 py-4 lg:py-0 w-full relative z-30 pointer-events-auto">
          <div className="mx-auto h-full px-4 sm:px-6 lg:px-8 lg:pr-8 animate-fade-in relative z-40">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
