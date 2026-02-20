import { CityData, getSolvencyLabel } from '@/lib/waterData';

interface ReportGeneratorProps {
  city: CityData;
  solvency: number;
  dayZeroDays: number;
}

const ReportGenerator = ({ city, solvency, dayZeroDays }: ReportGeneratorProps) => {
  const handlePrint = () => {
    const risks = [];
    if (city.gwOverdraft > 100) risks.push(`GW Overdraft: ${city.gwOverdraft}%`);
    if (city.reservoirDepletion > 60) risks.push(`Reservoir Depletion: ${city.reservoirDepletion}%`);
    if (city.infraStrain > 60) risks.push(`Infra Strain: ${city.infraStrain}%`);
    if (city.climateStress > 40) risks.push(`Climate Stress: ${city.climateStress}%`);
    if (city.imdRainfall < -15) risks.push(`Rainfall Deficit: ${city.imdRainfall}%`);

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
      w.document.write(`<pre style="font-family:monospace;font-size:13px;padding:40px;background:#00171f;color:#fff;">${report}</pre>`);
      w.document.title = `HydraShield Report — ${city.name}`;
      w.print();
    }
  };

  return (
    <button
      onClick={handlePrint}
      className="w-full py-2 px-4 border border-border rounded-sm text-xs font-semibold uppercase tracking-wider
        hover:bg-accent/10 transition-colors text-primary"
    >
      Generate Report
    </button>
  );
};

export default ReportGenerator;
