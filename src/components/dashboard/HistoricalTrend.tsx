import { CityData } from '@/lib/waterData';

interface HistoricalTrendProps {
  city: CityData;
}

const HistoricalTrend = ({ city }: HistoricalTrendProps) => {
  const base = city.solvency;
  const data = Array.from({ length: 12 }, (_, i) => {
    const seasonal = Math.sin((i / 12) * Math.PI * 2) * 8;
    const trend = -((12 - i) * 0.8);
    return Math.round(Math.max(5, Math.min(95, base + seasonal + trend + (12 - i) * 1.2)));
  });
  data[11] = base;

  const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
  const min = Math.min(...data) - 5;
  const max = Math.max(...data) + 5;
  const range = max - min;
  const w = 280;
  const h = 80;
  const pad = 24;

  const points = data.map((v, i) => {
    const x = pad + (i / 11) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="panel">
      <div className="panel-header">12-Month Solvency Trend — {city.name}</div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 100 }}>
        {[25, 50, 75].map(v => {
          const y = h - pad - ((v - min) / range) * (h - pad * 2);
          return (
            <g key={v}>
              <line x1={pad} y1={y} x2={w - pad} y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2" />
              <text x={pad - 4} y={y + 3} textAnchor="end" fill="hsl(var(--muted-foreground))" fontSize="5" fontFamily="JetBrains Mono">{v}</text>
            </g>
          );
        })}
        {months.map((m, i) => {
          const x = pad + (i / 11) * (w - pad * 2);
          return (
            <text key={m} x={x} y={h - 4} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="5" fontFamily="JetBrains Mono">{m}</text>
          );
        })}
        <polyline
          points={points}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {(() => {
          const x = pad + (11 / 11) * (w - pad * 2);
          const y = h - pad - ((base - min) / range) * (h - pad * 2);
          return <circle cx={x} cy={y} r={3} fill="hsl(var(--primary))" />;
        })()}
      </svg>
    </div>
  );
};

export default HistoricalTrend;
