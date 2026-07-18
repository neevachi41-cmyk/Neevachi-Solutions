// ============================================
// API CONNECTION: Authentication
// Backend: /auth/login, /auth/register, /auth/me
// ============================================
import { authAPI } from '@/lib/api/admin';
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  name?: string;
  phone?: string;
  address?: string;
  company?: string;
  gstin?: string;
  createdAt?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, verify token with backend
      const userData = JSON.parse(localStorage.getItem('userData') || 'null');
      if (userData) {
        setUser(userData);
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const data = await authAPI.login(email, password);

      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      setUser(data.user);

      navigate('/');
      toast.success('Login successful');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    }
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/login');
    toast.success('Logged out successfully');
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
