import React from 'react';
import { Lock, FileText } from 'lucide-react';

interface Problem {
    id: string;
    title: string;
    description: string;
}

interface ProblemStatementsProps {
    isRevealed: boolean;
    problems: Problem[];
}

export const ProblemStatements: React.FC<ProblemStatementsProps> = ({ isRevealed, problems }) => {
    return (
        <section className="problem-section">
            <div className="section-header">
                <h2>Hackathon <span className="highlight">Problem Statements</span></h2>
                <p>The challenges await. Get ready to innovate.</p>
            </div>

            <div className="problems-grid">
                {problems.map((problem, index) => (
                    <div key={problem.id || index} className="problem-card">
                        {!isRevealed ? (
                            <div className="problem-locked-overlay">
                                <Lock size={48} className="lock-icon" />
                                <h3>Classified</h3>
                                <p>Reveals during inauguration</p>
                            </div>
                        ) : null}

                        <div className={`problem-content ${!isRevealed ? 'blur-md' : ''}`}>
                            <div className="problem-icon-wrapper">
                                <FileText size={24} />
                            </div>
                            <h3>{problem.title}</h3>
                            <p>{problem.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
