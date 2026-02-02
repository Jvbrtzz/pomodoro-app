import { useState, useEffect } from 'react';

export function PomodoroScript() {
    const [timeLeft, setTimeLeft] = useState(25 * 60); 
    const [isActive, setIsActive] = useState(false);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);
    const [isWorkSession, setIsWorkSession] = useState(true);

    const WORK_TIME = 25 * 60;
    const BREAK_TIME = 5 * 60;
    const LONG_BREAK_TIME = 15 * 60;

    useEffect(() => {
        let interval = null;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            handleSessionComplete();
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const handleSessionComplete = () => {
        if (isWorkSession) {
            setSessionsCompleted(sessionsCompleted + 1);
            const isLongBreak = (sessionsCompleted + 1) % 4 === 0;
            setTimeLeft(isLongBreak ? LONG_BREAK_TIME : BREAK_TIME);
        } else {
            setTimeLeft(WORK_TIME);
        }
        setIsWorkSession(!isWorkSession);
        setIsActive(false);
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(WORK_TIME);
        setIsWorkSession(true);
        setSessionsCompleted(0);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return {
        timeLeft,
        isActive,
        sessionsCompleted,
        isWorkSession,
        toggleTimer,
        resetTimer,
        formatTime,
        timeFormatted: formatTime(timeLeft),
    };
}