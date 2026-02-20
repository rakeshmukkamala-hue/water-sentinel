import { useEffect, useState } from 'react';
import { getSolvencyLabel, getSolvencyClass } from '@/lib/waterData';

interface SolvencyGaugeProps {
  score: number;
}

const SolvencyGauge = ({ score }: SolvencyGaugeProps) => {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(score), 100);
    return () => clearTimeout(timeout);
  }, [score]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const arc = circumference * 0.75; // 270 degree arc
  const offset = arc - (arc * animated) / 100;

  const label = getSolvencyLabel(score);
  const colorClass = getSolvencyClass(score);

  return (
    <div className="panel flex flex-col items-center py-4">
      <div className="panel-header">Water Solvency Index</div>
      <div className="relative" style={{ width: 180, height: 140 }}>
        <svg viewBox="0 0 180 140" className="w-full h-full">
          {/* Background arc */}
          <circle
            cx="90" cy="90" r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${arc} ${circumference}`}
            transform="rotate(135 90 90)"
          />
          {/* Value arc */}
          <circle
            cx="90" cy="90" r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${arc} ${circumference}`}
            strokeDashoffset={offset}
            transform="rotate(135 90 90)"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <span className="text-4xl font-extrabold tabular-nums">{animated}</span>
          <span className={`text-[10px] font-semibold tracking-wider ${colorClass}`}>{label}</span>
        </div>
      </div>
      <div className="text-[10px] text-muted-foreground mt-1 font-body text-center max-w-[200px]">
        100 - (0.25×RD + 0.3×GW + 0.2×CE + 0.15×IS + 0.1×CS)
      </div>
    </div>
  );
};

export default SolvencyGauge;
