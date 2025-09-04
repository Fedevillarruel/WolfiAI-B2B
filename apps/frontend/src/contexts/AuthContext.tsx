'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { User, AuthResponse, RegisterData, LoginData } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = Cookies.get('auth-token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await api.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      // Token is invalid, remove it
      Cookies.remove('auth-token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/login', data);
      const { token, user } = response.data;
      
      // Guardar token
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      Cookies.set('auth-token', token, { expires: 7 });
      
      setUser(user);
      toast.success('¡Bienvenido!');
    } catch (error: unknown) {
      console.error('Login error:', error);
      toast.error('Error al iniciar sesión');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/register', data);
      const { token, user } = response.data;
      
      // Guardar token
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      Cookies.set('auth-token', token, { expires: 7 });
      
      setUser(user);
      toast.success('¡Cuenta creada exitosamente!');
    } catch (error: unknown) {
      console.error('Register error:', error);
      toast.error('Error al crear la cuenta');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('auth-token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
