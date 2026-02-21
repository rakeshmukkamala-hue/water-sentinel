import { CityData } from '@/lib/waterData';

interface AlertsEngineProps {
  city: CityData;
  dayZeroDays: number;
}

const AlertsEngine = ({ city, dayZeroDays }: AlertsEngineProps) => {
  const alerts: { level: 'CRITICAL' | 'WARNING' | 'INFO'; msg: string }[] = [];

  if (city.gwOverdraft > 100) alerts.push({ level: 'CRITICAL', msg: `GW overdraft ${city.gwOverdraft}% exceeds recharge capacity (CGWB)` });
  if (city.cwcStorage < 20) alerts.push({ level: 'CRITICAL', msg: `Reservoir storage at ${city.cwcStorage}% — below emergency threshold (CWC)` });
  if (dayZeroDays < 365) alerts.push({ level: 'CRITICAL', msg: `Day Zero projected within ${dayZeroDays} days` });
  if (city.infraStrain > 75) alerts.push({ level: 'WARNING', msg: `Infrastructure strain at ${city.infraStrain}% — system degradation risk` });
  if (city.imdRainfall < -20) alerts.push({ level: 'WARNING', msg: `Rainfall deficit ${city.imdRainfall}% from normal (IMD)` });
  if (city.reservoirDepletion > 60) alerts.push({ level: 'WARNING', msg: `Reservoir depletion ${city.reservoirDepletion}% — approaching critical` });
  alerts.push({ level: 'INFO', msg: `Live telemetry active: CGWB ${city.cgwbDepth}m bgl | CWC ${city.cwcStorage}% storage` });
  alerts.push({ level: 'INFO', msg: `ISRO Bhuvan GW prospect zone: ${city.isroZone}` });

  const levelClass = (l: string) =>
    l === 'CRITICAL' ? 'status-critical' : l === 'WARNING' ? 'status-warning' : 'text-muted-foreground';

  return (
    <div className="panel">
      <div className="panel-header">Alerts & Recommendations</div>
      <div className="space-y-1.5 max-h-40 overflow-y-auto terminal-text">
        {alerts.map((a, i) => (
          <div key={i} className="flex gap-2">
            <span className={`${levelClass(a.level)} font-semibold shrink-0`}>[{a.level}]</span>
            <span className="text-card-foreground/80">{a.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsEngine;
