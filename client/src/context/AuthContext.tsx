import React, { createContext, useContext, useState, useEffect } from 'react';

export type Role = 'STUDENT' | 'CLUB_MENTOR' | 'EVALUATOR' | 'ADMIN';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    teamId?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface AuthContextType extends AuthState {
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: true,
    });

    useEffect(() => {
        // Check local storage for token on mount
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            try {
                setAuthState({
                    user: JSON.parse(storedUser),
                    token: storedToken,
                    isAuthenticated: true,
                    isLoading: false,
                });
            } catch (e) {
                // Invalid stored data, clear it
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setAuthState(prev => ({ ...prev, isLoading: false }));
            }
        } else {
            setAuthState(prev => ({ ...prev, isLoading: false }));
        }
    }, []);

    const login = (token: string, user: User) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        setAuthState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
        });
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
