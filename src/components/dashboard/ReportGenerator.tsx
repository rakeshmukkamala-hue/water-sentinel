import { useState } from 'react';
import { CityData, getSolvencyLabel } from '@/lib/waterData';

interface ReportGeneratorProps {
  city: CityData;
  solvency: number;
  dayZeroDays: number;
}

const ReportGenerator = ({ city, solvency, dayZeroDays }: ReportGeneratorProps) => {
  const [showReport, setShowReport] = useState(false);

  const risks = [];
  if (city.gwOverdraft > 100) risks.push(`GW Overdraft: ${city.gwOverdraft}%`);
  if (city.reservoirDepletion > 60) risks.push(`Reservoir Depletion: ${city.reservoirDepletion}%`);
  if (city.infraStrain > 60) risks.push(`Infra Strain: ${city.infraStrain}%`);
  if (city.climateStress > 40) risks.push(`Climate Stress: ${city.climateStress}%`);
  if (city.imdRainfall < -15) risks.push(`Rainfall Deficit: ${city.imdRainfall}%`);

  const handlePrint = () => {
    const report = `
═══════════════════════════════════════
  HYDRASHIELD — WATER SOLVENCY REPORT
  ${city.name}, ${city.state}
  Generated: ${new Date().toISOString().slice(0, 16)}
═══════════════════════════════════════

  SOLVENCY SCORE:  ${solvency} / 100  [${getSolvencyLabel(solvency)}]
  DAY ZERO:        ${dayZeroDays} days  (${city.dayZeroDate})
  BOREWELL LIMIT:  ${city.borewellLimit}m

  TOP RISKS:
  ${risks.slice(0, 3).map((r, i) => `  ${i + 1}. ${r}`).join('\n')}

  PRIORITY INTERVENTIONS:
  1. Emergency aquifer recharge
  2. Mandatory rainwater harvesting
  3. Smart metering deployment

  DATA SOURCES:
  CGWB: ${city.cgwbDepth}m bgl | CWC: ${city.cwcStorage}%
  IMD: ${city.imdRainfall}% dep | WRIS: ${city.wrisUsage} BCM
═══════════════════════════════════════`;

    const w = window.open('', '_blank');
    if (w) {
      w.document.write(`<pre style="font-family:monospace;font-size:13px;padding:40px;background:#050505;color:#f5f1e3;">${report}</pre>`);
      w.document.title = `HydraShield Report — ${city.name}`;
      w.print();
    }
  };

  return (
    <>
      <button
        onClick={() => setShowReport(true)}
        className="w-full py-5 bg-primary text-primary-foreground font-bold text-2xl uppercase tracking-wider hover:opacity-90 transition-opacity"
        style={{ height: 80 }}
      >
        Generate Report
      </button>

      {showReport && (
        <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4" onClick={() => setShowReport(false)}>
          <div className="bg-card text-card-foreground max-w-lg w-full p-8 rounded-sm border border-border" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-extrabold mb-4 tracking-tight">Water Solvency Report</h2>
            <div className="space-y-3 text-base font-body">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">City</span>
                <span className="font-semibold">{city.name}, {city.state}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Solvency Score</span>
                <span className="font-bold text-primary">{solvency} / 100 [{getSolvencyLabel(solvency)}]</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Day Zero</span>
                <span className="font-semibold">{dayZeroDays} days ({city.dayZeroDate})</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Borewell Limit</span>
                <span className="font-semibold">{city.borewellLimit}m</span>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Top Risks</div>
                {risks.slice(0, 3).map((r, i) => (
                  <div key={i} className="text-sm">{i + 1}. {r}</div>
                ))}
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Priority Interventions</div>
                <div className="text-sm">1. Emergency aquifer recharge</div>
                <div className="text-sm">2. Mandatory rainwater harvesting</div>
                <div className="text-sm">3. Smart metering deployment</div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handlePrint}
                className="flex-1 py-3 bg-primary text-primary-foreground font-semibold uppercase tracking-wider rounded-sm hover:opacity-90"
              >
                Print Report
              </button>
              <button
                onClick={() => setShowReport(false)}
                className="flex-1 py-3 border border-border text-muted-foreground font-semibold uppercase tracking-wider rounded-sm hover:text-card-foreground"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportGenerator;
