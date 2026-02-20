export interface CityData {
  name: string;
  state: string;
  solvency: number;
  dayZeroDays: number;
  dayZeroDate: string;
  reservoirDepletion: number;
  gwOverdraft: number;
  consumptionExcess: number;
  infraStrain: number;
  climateStress: number;
  borewellLimit: number;
  lat: number;
  lng: number;
  cgwbDepth: number;
  wrisUsage: number;
  imdRainfall: number;
  cwcStorage: number;
  isroZone: 'Good' | 'Moderate' | 'Poor';
}

export const CITIES: CityData[] = [
  { name: 'Jaipur', state: 'Rajasthan', solvency: 24, dayZeroDays: 412, dayZeroDate: '2027-04-08', reservoirDepletion: 82, gwOverdraft: 137, consumptionExcess: 45, infraStrain: 78, climateStress: 72, borewellLimit: 90, lat: 26.9, lng: 75.8, cgwbDepth: 32.4, wrisUsage: 18.2, imdRainfall: -34, cwcStorage: 18, isroZone: 'Poor' },
  { name: 'Chennai', state: 'Tamil Nadu', solvency: 35, dayZeroDays: 800, dayZeroDate: '2028-04-30', reservoirDepletion: 74, gwOverdraft: 112, consumptionExcess: 38, infraStrain: 65, climateStress: 58, borewellLimit: 150, lat: 13.1, lng: 80.3, cgwbDepth: 18.6, wrisUsage: 14.8, imdRainfall: -22, cwcStorage: 24, isroZone: 'Poor' },
  { name: 'Delhi', state: 'NCR', solvency: 42, dayZeroDays: 720, dayZeroDate: '2028-02-10', reservoirDepletion: 68, gwOverdraft: 108, consumptionExcess: 52, infraStrain: 72, climateStress: 48, borewellLimit: 120, lat: 28.7, lng: 77.1, cgwbDepth: 28.1, wrisUsage: 22.4, imdRainfall: -18, cwcStorage: 32, isroZone: 'Moderate' },
  { name: 'Hyderabad', state: 'Telangana', solvency: 48, dayZeroDays: 847, dayZeroDate: '2028-06-17', reservoirDepletion: 62, gwOverdraft: 88, consumptionExcess: 35, infraStrain: 58, climateStress: 42, borewellLimit: 180, lat: 17.4, lng: 78.5, cgwbDepth: 14.2, wrisUsage: 12.6, imdRainfall: -12, cwcStorage: 38, isroZone: 'Moderate' },
  { name: 'Mumbai', state: 'Maharashtra', solvency: 52, dayZeroDays: 1095, dayZeroDate: '2029-02-20', reservoirDepletion: 55, gwOverdraft: 62, consumptionExcess: 42, infraStrain: 68, climateStress: 35, borewellLimit: 100, lat: 19.1, lng: 72.9, cgwbDepth: 8.4, wrisUsage: 24.2, imdRainfall: -8, cwcStorage: 45, isroZone: 'Moderate' },
  { name: 'Bengaluru', state: 'Karnataka', solvency: 58, dayZeroDays: 1200, dayZeroDate: '2029-06-05', reservoirDepletion: 48, gwOverdraft: 72, consumptionExcess: 28, infraStrain: 52, climateStress: 32, borewellLimit: 200, lat: 13.0, lng: 77.6, cgwbDepth: 22.8, wrisUsage: 10.4, imdRainfall: -14, cwcStorage: 42, isroZone: 'Moderate' },
  { name: 'Ahmedabad', state: 'Gujarat', solvency: 60, dayZeroDays: 1350, dayZeroDate: '2029-11-02', reservoirDepletion: 45, gwOverdraft: 65, consumptionExcess: 30, infraStrain: 48, climateStress: 38, borewellLimit: 140, lat: 23.0, lng: 72.6, cgwbDepth: 18.6, wrisUsage: 15.8, imdRainfall: -10, cwcStorage: 48, isroZone: 'Moderate' },
  { name: 'Pune', state: 'Maharashtra', solvency: 61, dayZeroDays: 1460, dayZeroDate: '2030-02-14', reservoirDepletion: 42, gwOverdraft: 55, consumptionExcess: 22, infraStrain: 42, climateStress: 28, borewellLimit: 220, lat: 18.5, lng: 73.9, cgwbDepth: 10.2, wrisUsage: 8.6, imdRainfall: -6, cwcStorage: 52, isroZone: 'Good' },
];

export function computeSolvency(city: CityData, interventions: Record<string, number> = {}): number {
  const rd = Math.max(0, city.reservoirDepletion - (interventions.reservoir || 0));
  const gw = Math.max(0, city.gwOverdraft - (interventions.gwCap || 0));
  const ce = Math.max(0, city.consumptionExcess - (interventions.conservation || 0));
  const is = Math.max(0, city.infraStrain - (interventions.infra || 0));
  const cs = Math.max(0, city.climateStress - (interventions.climate || 0));
  return Math.round(100 - (0.25 * rd + 0.3 * gw + 0.2 * ce + 0.15 * is + 0.1 * cs));
}

export function computeDayZeroDays(solvency: number, baseDays: number): number {
  const factor = solvency / 48;
  return Math.round(baseDays * factor);
}

export function getSolvencyLabel(score: number): string {
  if (score > 75) return 'SAFE';
  if (score > 50) return 'STRESSED';
  if (score > 25) return 'CRITICAL';
  return 'COLLAPSE IMMINENT';
}

export function getSolvencyClass(score: number): string {
  if (score > 75) return 'status-live';
  if (score > 50) return 'status-warning';
  return 'status-critical';
}

export interface Intervention {
  id: string;
  label: string;
  key: string;
  max: number;
  daysGain: number;
}

export const INTERVENTIONS: Intervention[] = [
  { id: 'conservation', label: 'Conservation Policies', key: 'conservation', max: 30, daysGain: 120 },
  { id: 'gwCap', label: 'Groundwater Cap', key: 'gwCap', max: 40, daysGain: 200 },
  { id: 'rwh', label: 'Rainwater Harvesting', key: 'climate', max: 25, daysGain: 90 },
  { id: 'infra', label: 'Infrastructure Upgrades', key: 'infra', max: 35, daysGain: 150 },
  { id: 'desal', label: 'Desalination', key: 'reservoir', max: 20, daysGain: 80 },
  { id: 'reuse', label: 'Wastewater Recycling', key: 'conservation', max: 20, daysGain: 100 },
  { id: 'meters', label: 'Smart Metering', key: 'conservation', max: 15, daysGain: 60 },
];

export const PREVENTIVE_MEASURES = [
  'Mandatory RWH for buildings >100 sqm',
  'Tiered volumetric water pricing',
  'Industrial water audit compliance',
  'Leakage reduction target <15% NRW',
  'Reservoir capacity restoration program',
  'Smart meter deployment (100% coverage)',
  'Wastewater reuse target: 30% minimum',
];
