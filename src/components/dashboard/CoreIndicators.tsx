import { useEffect, useState } from 'react';
import { CityData } from '@/lib/waterData';

interface CoreIndicatorsProps {
  city: CityData;
}

const indicators = [
  { key: 'reservoirDepletion', label: 'Reservoir Depletion', source: 'CWC Bulletin' },
  { key: 'gwOverdraft', label: 'Groundwater Overdraft', source: 'CGWB WIMS' },
  { key: 'consumptionExcess', label: 'Consumption Excess', source: 'India-WRIS' },
  { key: 'infraStrain', label: 'Infrastructure Strain', source: 'CWC' },
  { key: 'climateStress', label: 'Climate Stress', source: 'IMD/Bhuvan' },
] as const;

const CoreIndicators = ({ city }: CoreIndicatorsProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const t = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(t);
  }, [city.name]);

  return (
    <div className="panel">
      <div className="panel-header">Core Indicators</div>
      <div className="space-y-3">
        {indicators.map(ind => {
          const value = city[ind.key as keyof CityData] as number;
          const capped = Math.min(value, 100);
          const isOver = value > 100;
          return (
            <div key={ind.key}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-card-foreground">{ind.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold tabular-nums ${
                    value > 80 ? 'status-critical' : value > 50 ? 'status-warning' : 'status-live'
                  }`}>
                    {value}%{isOver && '+'}
                  </span>
                  <span className="data-label text-xs">{ind.source}</span>
                </div>
              </div>
              <div className="indicator-bar">
                <div
                  className={`indicator-fill ${
                    value > 80 ? 'bg-foreground' : value > 50 ? 'bg-warning' : 'bg-primary'
                  }`}
                  style={{ width: animate ? `${capped}%` : '0%' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoreIndicators;
