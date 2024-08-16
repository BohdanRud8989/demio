import { useState, useEffect } from 'react';

export function useEngagementTracker() {
    const [isFocused, setIsFocused] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    const [focusedTime, setFocusedTime] = useState(0);
    const engagementPercentage = ((focusedTime / totalTime) * 100).toFixed(2);
    let intervalId: any = 0; // TODO

    useEffect(() => {
        const handleFocus = () => {
            setIsFocused(true);
        };
        const handleBlur = () => {
            setIsFocused(false);
        };

        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);

        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
        };
    }, []);

    useEffect(() => {
        intervalId = setInterval(() => {
            if (isFocused) {
                setFocusedTime((prevFocusedTime) => prevFocusedTime + 1000);
            }
            setTotalTime((prevTotalTime) => prevTotalTime + 1000);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isFocused]);

    const resetTracker = () => {
        clearInterval(intervalId);
        setIsFocused(false);
        setTotalTime(0);
        setFocusedTime(0);
    };

    return {
        isFocused,
        focusedTime: focusedTime / 1000,
        totalTime: totalTime / 1000,
        engagementPercentage,
        resetTracker,
    };
}
