import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  dayZeroDays: number;
  dayZeroDate: string;
  isCritical: boolean;
}

const CountdownTimer = ({ dayZeroDays, dayZeroDate, isCritical }: CountdownTimerProps) => {
  const [seconds, setSeconds] = useState(dayZeroDays * 86400);

  useEffect(() => {
    setSeconds(dayZeroDays * 86400);
  }, [dayZeroDays]);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(seconds / 86400);
  const hrs = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className={`flex flex-col items-center justify-center min-h-[50vh] py-10 ${isCritical ? 'animate-pulse-critical' : ''}`}>
      <div className="data-label mb-3 text-sm tracking-[0.25em]">Day Zero Countdown</div>
      <div className="flex items-baseline gap-1 tabular-nums">
        <span className="text-[72px] md:text-[90px] lg:text-[108px] font-extrabold tracking-tight text-foreground leading-none">
          {days.toLocaleString()}
        </span>
        <span className="text-2xl md:text-3xl font-light text-muted-foreground ml-3">D</span>
        <span className="text-4xl md:text-5xl font-bold text-foreground">{pad(hrs)}</span>
        <span className="text-xl text-muted-foreground">:</span>
        <span className="text-4xl md:text-5xl font-bold text-foreground">{pad(mins)}</span>
        <span className="text-xl text-muted-foreground">:</span>
        <span className="text-4xl md:text-5xl font-bold text-foreground">{pad(secs)}</span>
      </div>
      <div className="mt-3 text-base text-muted-foreground font-body">
        Projected: <span className="text-foreground font-semibold">{dayZeroDate}</span>
      </div>
      <div className="mt-2 text-xs text-muted-foreground max-w-lg text-center font-body">
        Day Zero = Extrapolated depletion of utilizable GW/surface water.
        Consequences: 70% supply cut, industrial halt, migration waves.
      </div>
    </div>
  );
};

export default CountdownTimer;
