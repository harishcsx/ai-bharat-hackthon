import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, Role } from '../context/AuthContext';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import axios from 'axios';

export const Login: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`, {
                credential: credentialResponse.credential,
            });

            const { token, user } = response.data;
            login(token, user);

            // Redirect based on role
            if (user.role === 'ADMIN') navigate('/admin');
            else if (user.role === 'EVALUATOR') navigate('/evaluator');
            else if (user.role === 'CLUB_MENTOR') navigate('/mentor');
            else navigate('/dashboard');

        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Failed to login with Google.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleError = () => {
        setError('Google Sign-In failed. Please try again.');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Welcome Back</h2>
                    <p>Login to your portal dashboard.</p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <div className="auth-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px 0' }}>
                    {isLoading ? (
                        <p>Authenticating...</p>
                    ) : (
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            useOneTap
                        />
                    )}
                </div>

                <div className="auth-footer">
                    <p>Don't have a team yet? <a href="/register" className="auth-link">Register Team</a></p>
                </div>
            </div>
        </div>
    );
};
