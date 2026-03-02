import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="app-container">
                    <header className="navbar">
                        <div className="logo-section">
                            <span className="logo-primary">INNOTECH</span>
                            <span className="logo-secondary">x</span>
                            <span className="logo-sponsor">AspireAge</span>
                        </div>
                        <nav className="nav-links">
                            <a href="/">Home</a>
                            <a href="/login" className="btn btn-outline">Login</a>
                            <a href="/register" className="btn btn-primary">Register Team</a>
                        </nav>
                    </header>

                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<div className="container"><h2>Register Team</h2></div>} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
