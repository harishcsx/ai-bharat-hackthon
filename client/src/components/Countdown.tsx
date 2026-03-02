import React, { useState, useEffect } from 'react';

interface CountdownProps {
    targetDate: string;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const difference = new Date(targetDate).getTime() - new Date().getTime();

            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="countdown-container">
            <div className="countdown-box">
                <span className="countdown-value">{timeLeft.days}</span>
                <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-box">
                <span className="countdown-value">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-box">
                <span className="countdown-value">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-box highlight-box">
                <span className="countdown-value">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="countdown-label">Seconds</span>
            </div>
        </div>
    );
};
