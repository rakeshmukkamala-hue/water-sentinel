interface DayZeroProjectionProps {
  solvency: number;
  dayZeroDays: number;
}

const DayZeroProjection = ({ solvency, dayZeroDays }: DayZeroProjectionProps) => {
  const warningDay = Math.round(dayZeroDays * 0.4);
  const criticalDay = Math.round(dayZeroDays * 0.75);

  const stages = [
    { label: 'Today', day: 0, threshold: `Score: ${solvency}` },
    { label: 'Warning', day: warningDay, threshold: 'Solvency < 50' },
    { label: 'Critical', day: criticalDay, threshold: 'Solvency < 25' },
    { label: 'Day Zero', day: dayZeroDays, threshold: 'Supply Collapse' },
  ];

  return (
    <div className="panel">
      <div className="panel-header">Day Zero Projection Timeline</div>
      <div className="flex items-center gap-1 w-full">
        {stages.map((s, i) => {
          const isLast = i === stages.length - 1;
          return (
            <div key={s.label} className="flex-1 flex flex-col items-center relative">
              <div className={`w-3 h-3 rounded-full ${
                i === 0 ? 'bg-primary' : i === 3 ? 'bg-foreground' : 'bg-warning'
              }`} />
              {!isLast && (
                <div className="absolute top-1.5 left-1/2 w-full h-px bg-border" />
              )}
              <div className="mt-2 text-center">
                <div className="text-xs font-semibold text-card-foreground">{s.label}</div>
                <div className="text-xs text-muted-foreground tabular-nums">+{s.day}d</div>
                <div className="text-[10px] text-muted-foreground">{s.threshold}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayZeroProjection;
