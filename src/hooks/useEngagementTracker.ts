import { useState, useEffect, useRef } from "react";

/**
 * This hook calculates user engagement on component where it's used
 * @example
 * // returns {isFocused: true, focusedTime: 60, totalTime: 80, engagementPercentage: '75', function(){...}}
 * useEngagementTracker();
 * @returns {{
        isFocused: boolean,
        focusedTime: number,
        totalTime: number,
        engagementPercentage: string,
        resetTracker: () => void,
    }}
 */
export function useEngagementTracker() {
  const [isFocused, setIsFocused] = useState(true);
  const [totalTime, setTotalTime] = useState(0);
  const [focusedTime, setFocusedTime] = useState(0);
  const engagementPercentage = ((focusedTime / totalTime) * 100).toFixed(2);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const intervalIdRef = useRef<any>();

  // tracks if page is on focus now
  useEffect(() => {
    const handleFocus = () => {
      setIsFocused(true);
    };
    const handleBlur = () => {
      setIsFocused(false);
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  // counts the total user session time and time page is on focus(each time focus status is changed)
  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      if (isFocused) {
        setFocusedTime((prevFocusedTime) => prevFocusedTime + 1);
      }
      setTotalTime((prevTotalTime) => prevTotalTime + 1);
    }, 1000);

    return () => clearInterval(intervalIdRef.current);
  }, [isFocused]);

  const resetTracker = () => {
    clearInterval(intervalIdRef.current);
    setIsFocused(true);
    setTotalTime(0);
    setFocusedTime(0);
  };

  return {
    isFocused,
    focusedTime: focusedTime,
    totalTime: totalTime,
    engagementPercentage,
    resetTracker,
  };
}
