import { useState, useEffect } from "react";

export default function ProgressBar({ timer_ms }) {
  const [remainingTime, setRemainingTime] = useState(timer_ms);

  // !
  // * jak stworze funkcjonalnosc dismountowania componentu to nie bede musial miec tego ifa z timer_ms < 10
  // * oraz bede mogl miec puste dependencies
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("INTERVAL - 1OMS");
      setRemainingTime((prevTime) => {
        if (prevTime <= 10) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 10
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [timer_ms]);

  return <progress value={remainingTime} max={timer_ms} />;
}
