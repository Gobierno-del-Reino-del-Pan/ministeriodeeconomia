import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  discord_id: string;
  discord_username: string;
  avatar: string | null;
  dpi: string | null;
  verified_at: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const MAX_RETRIES = 3;

  // Returns the user if authenticated, null if not authenticated, or throws on network/server error
  const fetchUser = async (): Promise<User | null> => {
    const res = await fetch('/api/me', { credentials: 'include' });
    if (!res.ok) {
      if (res.status === 401) return null;
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    return data.user || null;
  };

  const loadUser = async () => {
    setLoading(true);
    setError(null);
    let attempts = 0;
    let lastError: unknown = null;
    while (attempts < MAX_RETRIES) {
      try {
        const userData = await fetchUser();
        // null is a valid state (not logged in), not an error
        setUser(userData);
        setLoading(false);
        return;
      } catch (err) {
        lastError = err;
        attempts++;
        if (attempts < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    // Only reach here if all retries threw an actual error
    console.error('loadUser failed after retries:', lastError);
    setError('No se pudo cargar la sesión. Inténtalo de nuevo.');
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const refresh = async () => {
    await loadUser();
  };

  const login = () => {
    window.location.href = '/auth/discord';
  };

  const logout = async () => {
    await fetch('/auth/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}