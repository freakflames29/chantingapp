import {useState, useEffect} from "react";

const useTimer = () => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId;

        if (isRunning) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => {
                    const newSeconds = prevSeconds + 1;
                    if (newSeconds === 60) {
                        setMinutes((prevMinutes) => {
                            const newMinutes = prevMinutes + 1;
                            if (newMinutes === 60) {
                                setHours((prevHours) => prevHours + 1);
                                return 0;
                            }
                            return newMinutes;
                        });
                        return 0;
                    }
                    return newSeconds;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId); // Cleanup on unmount or re-render
    }, [isRunning]);

    const startStop = () => {
        setIsRunning(!isRunning);
    };

    const reset = () => {
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        setIsRunning(false);
    };

    const formatTime = () => {
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    const getTotalMinutes = () => {
        return hours * 60 + minutes;
    };

    const getTotalSeconds = () => {
        return hours * 3600 + minutes * 60 + seconds;
    };

    return {startStop, reset, isRunning, formatTime,getTotalMinutes,getTotalSeconds}
}
export default useTimer;