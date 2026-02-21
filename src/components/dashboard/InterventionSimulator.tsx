import { useState } from 'react';
import { INTERVENTIONS, computeSolvency, computeDayZeroDays, CityData } from '@/lib/waterData';

interface InterventionSimulatorProps {
  city: CityData;
  onInterventionChange: (interventions: Record<string, number>) => void;
}

const InterventionSimulator = ({ city, onInterventionChange }: InterventionSimulatorProps) => {
  const [values, setValues] = useState<Record<string, number>>({});

  const handleChange = (key: string, val: number) => {
    const next = { ...values, [key]: val };
    setValues(next);
    onInterventionChange(next);
  };

  const interventionMap: Record<string, number> = {};
  INTERVENTIONS.forEach(int => {
    interventionMap[int.key] = (interventionMap[int.key] || 0) + (values[int.id] || 0);
  });

  const newScore = computeSolvency(city, interventionMap);
  const scoreDelta = newScore - city.solvency;
  const newDays = computeDayZeroDays(newScore, city.dayZeroDays);
  const daysDelta = newDays - city.dayZeroDays;

  return (
    <div className="panel">
      <div className="panel-header">Intervention Simulator</div>
      
      <div className="flex items-center gap-4 mb-3 pb-3 border-b border-border/50">
        <div>
          <div className="data-label">Score Δ</div>
          <div className={`text-xl font-bold tabular-nums ${scoreDelta > 0 ? 'status-live' : 'text-card-foreground'}`}>
            {scoreDelta > 0 ? '+' : ''}{scoreDelta}
          </div>
        </div>
        <div>
          <div className="data-label">Days Gained</div>
          <div className={`text-xl font-bold tabular-nums ${daysDelta > 0 ? 'status-live' : 'text-card-foreground'}`}>
            {daysDelta > 0 ? '+' : ''}{daysDelta}
          </div>
        </div>
        <div>
          <div className="data-label">Projected</div>
          <div className="text-xl font-bold tabular-nums text-card-foreground">{newScore}</div>
        </div>
      </div>

      <div className="space-y-2.5">
        {INTERVENTIONS.map(int => (
          <div key={int.id}>
            <div className="flex justify-between mb-0.5">
              <span className="text-sm text-card-foreground">{int.label}</span>
              <span className="text-sm tabular-nums text-primary">{values[int.id] || 0}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={int.max}
              value={values[int.id] || 0}
              onChange={e => handleChange(int.id, Number(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterventionSimulator;
