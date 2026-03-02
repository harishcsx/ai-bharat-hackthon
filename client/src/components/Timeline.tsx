import React from 'react';

const schedule = [
    { time: 'Day 1 - 09:00 AM', event: 'Inauguration & Registration', isMilestone: true },
    { time: 'Day 1 - 10:30 AM', event: 'Problem Statement Reveal', isMilestone: false },
    { time: 'Day 1 - 11:00 AM', event: 'Coding Phase 1 Begins', isMilestone: true },
    { time: 'Day 1 - 01:00 PM', event: 'Lunch Break', isMilestone: false },
    { time: 'Day 1 - 02:00 PM', event: 'Coding Phase 2', isMilestone: false },
    { time: 'Day 1 - 06:00 PM', event: 'Day 1 Wrap Up / Mentor Review', isMilestone: true },
    { time: 'Day 2 - 09:00 AM', event: 'Coding Phase 3', isMilestone: true },
    { time: 'Day 2 - 12:30 PM', event: 'Lunch Break', isMilestone: false },
    { time: 'Day 2 - 02:00 PM', event: 'Final Submissions', isMilestone: true },
    { time: 'Day 2 - 03:00 PM', event: 'Evaluator Presentations', isMilestone: false },
    { time: 'Day 2 - 06:00 PM', event: 'Valedictory & Prize Distribution', isMilestone: true },
];

export const Timeline: React.FC = () => {
    return (
        <section className="timeline-section" id="timeline">
            <div className="section-header">
                <h2>Event <span className="highlight">Timeline</span></h2>
                <p>Two days of continuous innovation and building.</p>
            </div>

            <div className="timeline-container">
                {schedule.map((item, index) => (
                    <div key={index} className={`timeline-item ${item.isMilestone ? 'milestone' : ''}`}>
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <span className="timeline-time">{item.time}</span>
                            <h4 className="timeline-event">{item.event}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
