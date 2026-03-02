import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, Role } from '../context/AuthContext';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // TODO: Actual API call here
            // const response = await api.post('/auth/login', { email, password });

            // Mocking successful login for now
            setTimeout(() => {
                // Mock user from response
                const mockUser = {
                    id: '1',
                    name: 'Demo User',
                    email: email,
                    role: 'STUDENT' as Role, // default mock role
                };

                login('mock-jwt-token-123', mockUser);

                // Redirect based on role
                if (mockUser.role === 'ADMIN') navigate('/admin');
                else if (mockUser.role === 'EVALUATOR') navigate('/evaluator');
                else if (mockUser.role === 'CLUB_MENTOR') navigate('/mentor');
                else navigate('/dashboard');

            }, 800);

        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to login. Please check credentials.');
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Welcome Back</h2>
                    <p>Login to your portal dashboard.</p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleLogin} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="teamleader@college.edu"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                        {isLoading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have a team yet? <a href="/register" className="auth-link">Register Team</a></p>
                </div>
            </div>
        </div>
    );
};
