import { useState, useEffect } from "react";

const INTERVAL_MS = 10;

export default function ProgressBar({ timer_ms, isLastTry }) {
  const [remainingTime, setRemainingTime] = useState(timer_ms);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("ProgressBar INTERVAL - 1OMS");
      setRemainingTime((prevTime) => {
        return prevTime - INTERVAL_MS;
      });
    }, INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [timer_ms]);

  return <progress className={`${isLastTry ? "last-try" : null}`} value={remainingTime} max={timer_ms} />;
}
