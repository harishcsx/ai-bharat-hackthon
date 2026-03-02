import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
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
                        <Route path="/" element={
                            <div className="hero">
                                <h1>Build Bharat Hackathon <span className="highlight">2026</span></h1>
                                <p>Innovate. Build. Transform.</p>
                                <div className="hero-cta">
                                    <a href="/register" className="btn btn-primary btn-large">Join the Hackathon</a>
                                </div>
                            </div>
                        } />
                        <Route path="/login" element={<div className="container"><h2>Login</h2></div>} />
                        <Route path="/register" element={<div className="container"><h2>Register Team</h2></div>} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
