import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// ─── Demo credentials ────────────────────────────────────────────────────────
const DEMO_EMAIL = 'demo@quickstock.ai';
const DEMO_PASSWORD = 'demo';
const SESSION_KEY = 'qs_session';

interface AuthUser {
    email: string;
    name: string;
    role: string;
}

interface AuthCtx {
    user: AuthUser | null;
    login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
    logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(() => {
        try {
            const raw = sessionStorage.getItem(SESSION_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch { return null; }
    });

    const login = useCallback(async (email: string, password: string) => {
        // Simulate a tiny network delay for realism
        await new Promise(r => setTimeout(r, 800));

        if (email.toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
            const u: AuthUser = { email: DEMO_EMAIL, name: 'Demo User', role: 'Demo User' };
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(u));
            setUser(u);
            return { ok: true };
        }
        return { ok: false, error: 'Invalid email or password.' };
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem(SESSION_KEY);
        setUser(null);
    }, []);

    return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error('useAuth must be inside AuthProvider');
    return ctx;
};
