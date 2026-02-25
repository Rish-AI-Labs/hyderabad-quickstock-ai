import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, Mail, Lock, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fillDemo = (e: React.MouseEvent) => {
        e.preventDefault();
        setEmail('demo@quickstock.ai');
        setPassword('demo');
        setError('');
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        setLoading(true);
        setError('');
        const { ok, error: err } = await login(email, password);
        setLoading(false);
        if (ok) {
            toast.success('Welcome back!', {
                style: {
                    background: 'rgba(12,74,110,0.9)',
                    color: '#fff',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(16,185,129,0.3)'
                }
            });
            navigate('/');
        } else {
            setError(err ?? 'Login failed.');
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">

            {/* Animated background blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary-500/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
            <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-accent-500/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

            <div className="w-full max-w-md relative z-10">

                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/30 shadow-lg shadow-primary-500/10 mb-4 relative">
                        <div className="absolute inset-0 bg-primary-500/20 rounded-2xl blur-xl animate-pulse" />
                        <Zap className="h-8 w-8 text-primary-400 relative z-10" />
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-white tracking-tight flex items-center justify-center gap-2">
                        QuickStock AI <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">Hyper-local demand intelligence platform</p>
                </div>

                {/* Card */}
                <div className="relative group">
                    {/* Animated border for card - shows on hover/interaction */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 rounded-2xl opacity-0 group-hover:opacity-75 blur-md transition-opacity duration-700 animate-gradient-x pointer-events-none"></div>
                    
                    <div className="glass-panel rounded-2xl p-8 border border-white/10 shadow-2xl relative">
                        <h2 className="text-lg font-heading font-semibold text-white mb-1">Sign in to your account</h2>
                        <p className="text-gray-400 text-sm mb-6">Enter your credentials to access the dashboard.</p>

                    {/* Demo credentials hint */}
                    <button
                        type="button"
                        onClick={fillDemo}
                        className="w-full mb-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-500/8 border border-primary-500/25 hover:bg-primary-500/15 hover:border-primary-500/40 transition-all group text-left"
                    >
                        <div className="w-8 h-8 rounded-lg bg-primary-500/20 border border-primary-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Zap className="h-4 w-4 text-primary-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white">Use Demo Credentials</p>
                            <p className="text-[11px] text-gray-300 truncate">
                                demo@quickstock.ai · password: demo
                            </p>
                        </div>
                        <span className="text-[11px] text-primary-400 font-medium flex-shrink-0">Click to fill →</span>
                    </button>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-medium text-white mb-1.5 uppercase tracking-wider">Email</label>
                            <div className="relative group">
                                {/* Moving border - only visible on focus */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-500 animate-gradient-x pointer-events-none"></div>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400 z-10" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => { setEmail(e.target.value); setError(''); }}
                                        placeholder="demo@quickstock.ai"
                                        className="relative w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-white/20 
                   text-white text-sm placeholder-gray-500 
                   focus:outline-none focus:border-primary-400/80 focus:bg-slate-900 transition-all
                   [&:-webkit-autofill]:[-webkit-text-fill-color:white]
                   [&:-webkit-autofill]:shadow-[0_0_0_100px_rgb(15,23,42)_inset]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-medium text-white mb-1.5 uppercase tracking-wider">Password</label>
                            <div className="relative group">
                                {/* Moving border - only visible on focus */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-500 animate-gradient-x pointer-events-none"></div>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400 z-10" />
                                    <input
                                        type={showPw ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => { setPassword(e.target.value); setError(''); }}
                                        placeholder="••••••••"
                                        className="relative w-full pl-10 pr-11 py-3 rounded-xl bg-slate-900/90 border border-white/20 
                   text-white text-sm placeholder-gray-500 
                   focus:outline-none focus:border-primary-400/80 focus:bg-slate-900 transition-all
                   [&:-webkit-autofill]:[-webkit-text-fill-color:white]
                   [&:-webkit-autofill]:shadow-[0_0_0_100px_rgb(15,23,42)_inset]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPw(v => !v)}
                                        className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white transition-colors z-10"
                                    >
                                        {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
                                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold text-sm transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                    Authenticating…
                                </>
                            ) : (
                                'Sign In →'
                            )}
                        </button>
                    </form>
                </div>
            </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-400 mt-6">
                    QuickStock AI · Demo Environment 
                </p>
            </div>
        </div>
    );
}