import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  id: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('hydrashield_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('hydrashield_users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      const u = { email: found.email, name: found.name, id: found.id };
      setUser(u);
      localStorage.setItem('hydrashield_user', JSON.stringify(u));
      return true;
    }
    return false;
  };

  const signup = (email: string, password: string, name: string): boolean => {
    const users = JSON.parse(localStorage.getItem('hydrashield_users') || '[]');
    if (users.find((u: any) => u.email === email)) return false;
    const newUser = { email, password, name, id: crypto.randomUUID() };
    users.push(newUser);
    localStorage.setItem('hydrashield_users', JSON.stringify(users));
    const u = { email, name, id: newUser.id };
    setUser(u);
    localStorage.setItem('hydrashield_user', JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hydrashield_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
