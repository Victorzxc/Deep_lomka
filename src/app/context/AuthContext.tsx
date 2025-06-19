'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextProps {
    token: string | null;
    email: string;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            const payload = JSON.parse(atob(savedToken.split('.')[1]));
            setEmail(payload.email);
        }
    }, []);


    const login = (token: string) => {
        localStorage.setItem('token', token);
        const payload = JSON.parse(atob(token.split('.')[1]));
        setEmail(payload.email);
        setToken(token);
        router.push('/');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        router.push('/login');
    };

    const isAuthenticated = !!token;

    const value: AuthContextProps = {
        token,
        email,
        isAuthenticated,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth должен использоваться внутри AuthProvider');
    }
    return context;
};
