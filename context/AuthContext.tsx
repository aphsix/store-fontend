'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Demo login - ไม่ได้เชื่อมกับ backend จริง
  const login = async (email: string, _password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Demo user data
    const demoUser: User = {
      id: '1',
      email,
      name: 'ผู้ใช้ทดสอบ',
      avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent('ผู้ใช้ทดสอบ'),
    };
    setUser(demoUser);
  };

  // Demo register - ไม่ได้เชื่อมกับ backend จริง
  const register = async (email: string, _password: string, name: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Demo user data
    const demoUser: User = {
      id: '1',
      email,
      name,
      avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name),
    };
    setUser(demoUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
