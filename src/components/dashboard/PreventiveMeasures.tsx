import { CityData, PREVENTIVE_MEASURES } from '@/lib/waterData';

interface PreventiveMeasuresProps {
  city: CityData;
}

const PreventiveMeasures = ({ city }: PreventiveMeasuresProps) => {
  return (
    <div className="panel">
      <div className="panel-header">Preventive Measures — {city.name}</div>
      
      <div className="mb-3 p-2 border border-border/50 rounded-sm">
        <div className="data-label mb-1">Maximum Permitted Borewell Depth</div>
        <div className="text-lg font-bold tabular-nums">{city.borewellLimit}m</div>
        {city.gwOverdraft > 100 && (
          <div className="status-critical text-[11px] font-semibold mt-1">
            ⚠ CRITICAL: Immediate moratorium on new borewells
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        {PREVENTIVE_MEASURES.map((m, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            <span className="text-primary mt-0.5 shrink-0">▸</span>
            <span className="text-foreground/80 font-body">{m}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreventiveMeasures;
