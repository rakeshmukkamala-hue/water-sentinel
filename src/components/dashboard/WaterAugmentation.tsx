import { useState } from 'react';
import { CityData } from '@/lib/waterData';

interface WaterAugmentationProps {
  city: CityData;
}

const WaterAugmentation = ({ city }: WaterAugmentationProps) => {
  const [recharge, setRecharge] = useState(0);
  const [reservoir, setReservoir] = useState(0);
  const [reuse, setReuse] = useState(0);
  const [desal, setDesal] = useState(0);

  const isCoastal = ['Chennai', 'Mumbai'].includes(city.name);
  const netGain = recharge * 12 + reservoir * 8 + reuse * 6 + desal * (isCoastal ? 10 : 3);
  const stressReduction = Math.round((recharge * 0.3 + reservoir * 0.25 + reuse * 0.2 + desal * 0.15));

  const strategies = [
    { title: 'Groundwater Recharge', items: ['Artificial recharge wells', 'Check dams', 'Percolation tanks', 'Traditional water bodies revival', 'Flood channel recharge'] },
    { title: 'Surface Water Expansion', items: ['New micro-reservoirs', 'Desilting existing reservoirs', 'Inter-basin transfer', 'Urban lake revival', 'Storm water harvesting'] },
    { title: 'Alternative Sources', items: ['Wastewater reuse (50% target)', 'Zero liquid discharge (industry)', 'Greywater recycling', `Desalination: ${isCoastal ? 'Viable' : 'Limited — High Cost'}`, 'Agricultural water substitution'] },
  ];

  return (
    <div className="panel">
      <div className="panel-header">Water Resource Augmentation</div>

      <div className="space-y-3 mb-4">
        {strategies.map(s => (
          <div key={s.title}>
            <div className="text-sm font-semibold text-card-foreground mb-1">{s.title}</div>
            <div className="space-y-0.5">
              {s.items.map((item, i) => (
                <div key={i} className="text-sm text-card-foreground/70 font-body flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">›</span>{item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {city.gwOverdraft > 100 && (
        <div className="p-2 border border-destructive/30 rounded-sm mb-3">
          <div className="status-critical text-sm font-semibold">⚠ Priority: Emergency Aquifer Recharge Required</div>
        </div>
      )}

      <div className="space-y-2 mb-3">
        {[
          { label: 'Recharge %', val: recharge, set: setRecharge },
          { label: 'Reservoir %', val: reservoir, set: setReservoir },
          { label: 'Reuse %', val: reuse, set: setReuse },
          { label: 'Desal %', val: desal, set: setDesal },
        ].map(s => (
          <div key={s.label}>
            <div className="flex justify-between mb-0.5">
              <span className="text-sm text-card-foreground">{s.label}</span>
              <span className="text-sm tabular-nums text-primary">{s.val}%</span>
            </div>
            <input
              type="range" min={0} max={100} value={s.val}
              onChange={e => s.set(Number(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4 text-sm p-2 border-t border-border/50 pt-3">
        <div>
          <div className="data-label">Net Gain</div>
          <div className="font-bold tabular-nums status-live">+{netGain} ML/yr</div>
        </div>
        <div>
          <div className="data-label">Stress Δ</div>
          <div className="font-bold tabular-nums status-live">-{stressReduction}%</div>
        </div>
      </div>
    </div>
  );
};

export default WaterAugmentation;
