import { CityData } from '@/lib/waterData';

interface DataSourcesProps {
  city: CityData;
}

const DataSources = ({ city }: DataSourcesProps) => {
  const sources = [
    { name: 'CGWB', value: `${city.cgwbDepth}m bgl`, status: 'Live' as const, trend: [12, 14, 13, 16, 18, city.cgwbDepth, city.cgwbDepth + 1] },
    { name: 'India-WRIS', value: `${city.wrisUsage} BCM`, status: 'Live' as const, trend: [10, 11, 12, 11.5, 12, city.wrisUsage - 1, city.wrisUsage] },
    { name: 'IMD', value: `${city.imdRainfall}% dep`, status: 'Live' as const, trend: [-5, -8, -12, -15, -18, city.imdRainfall + 5, city.imdRainfall] },
    { name: 'ISRO Bhuvan', value: city.isroZone, status: 'Delayed' as const, trend: [3, 3, 2, 2, 2, city.isroZone === 'Poor' ? 1 : 2, city.isroZone === 'Poor' ? 1 : 2] },
    { name: 'CWC', value: `${city.cwcStorage}%`, status: 'Live' as const, trend: [55, 48, 42, 38, 35, city.cwcStorage + 5, city.cwcStorage] },
  ];

  const Sparkline = ({ data }: { data: number[] }) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const h = 20;
    const w = 48;
    const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
    return (
      <svg width={w} height={h} className="inline-block">
        <polyline points={points} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      </svg>
    );
  };

  return (
    <div className="panel">
      <div className="panel-header">Live Data Sources</div>
      <div className="space-y-2">
        {sources.map(src => (
          <div key={src.name} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-card-foreground">{src.name}</span>
              <span className="data-label text-xs">{src.value}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkline data={src.trend} />
              <span className={`text-xs px-1.5 py-0.5 rounded-sm border ${
                src.status === 'Live' ? 'border-primary/30 status-live' : 'border-warning/30 status-warning'
              }`}>
                {src.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataSources;
