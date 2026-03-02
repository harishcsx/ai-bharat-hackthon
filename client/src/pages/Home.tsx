import React from 'react';
import { Countdown } from '../components/Countdown';
import { Timeline } from '../components/Timeline';
import { ProblemStatements } from '../components/ProblemStatements';

export const Home: React.FC = () => {
    // Hackathon starts in exactly 14 days for demo purposes
    const countdownTarget = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

    // Simulated initial problem statements (would be fetched from API later)
    const dummyProblems = [
        { id: '1', title: 'Fintech Inclusion', description: 'Build a decentralized micro-lending platform spanning across rural areas.' },
        { id: '2', title: 'Healthcare AI', description: 'An automated diagnostic tool using CV to detect early signs of retinography.' },
        { id: '3', title: 'Smart Mobility', description: 'Real-time traffic aggregation and emergency vehicle routing system.' }
    ];

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero animated-reveal">
                <div className="hero-content">
                    <h1>Build Bharat Hackathon <span className="highlight">2026</span></h1>
                    <p>Innovate. Build. Transform. 48 hours to change the nation.</p>

                    <div className="hero-cta">
                        <a href="/register" className="btn btn-primary btn-large">Register Your Team</a>
                        <a href="#timeline" className="btn btn-outline btn-large">View Schedule</a>
                    </div>
                </div>

                <div className="hero-countdown-wrapper fadeIn delay-2">
                    <h3>Event Starts In:</h3>
                    <Countdown targetDate={countdownTarget} />
                </div>
            </section>

            {/* Problem Statements Section */}
            <ProblemStatements isRevealed={false} problems={dummyProblems} />

            {/* Timeline Section */}
            <Timeline />

            {/* Footer Element purely for aesthetics */}
            <footer className="footer">
                <div className="footer-content">
                    <p>Organized by <strong>INNOTECH</strong> • Sponsored by <strong className="logo-sponsor">AspireAge</strong></p>
                    <p className="copyright">© 2026 Build Bharat Hackathon. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};
