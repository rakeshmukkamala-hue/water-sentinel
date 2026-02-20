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

export interface StateData {
  name: string;
  code: string;
  lat: number;
  lng: number;
  cities: CityData[];
}

// All 36 States/UTs with representative cities
export const STATES: StateData[] = [
  { name: 'Andhra Pradesh', code: 'AP', lat: 15.9, lng: 79.7, cities: [
    { name: 'Visakhapatnam', state: 'Andhra Pradesh', solvency: 55, dayZeroDays: 1100, dayZeroDate: '2029-03-01', reservoirDepletion: 50, gwOverdraft: 72, consumptionExcess: 30, infraStrain: 55, climateStress: 38, borewellLimit: 180, lat: 17.7, lng: 83.3, cgwbDepth: 12.4, wrisUsage: 11.2, imdRainfall: -10, cwcStorage: 40, isroZone: 'Moderate' },
    { name: 'Vijayawada', state: 'Andhra Pradesh', solvency: 50, dayZeroDays: 950, dayZeroDate: '2028-09-15', reservoirDepletion: 55, gwOverdraft: 80, consumptionExcess: 35, infraStrain: 58, climateStress: 40, borewellLimit: 160, lat: 16.5, lng: 80.6, cgwbDepth: 14.8, wrisUsage: 13.6, imdRainfall: -14, cwcStorage: 35, isroZone: 'Moderate' },
    { name: 'Tirupati', state: 'Andhra Pradesh', solvency: 45, dayZeroDays: 880, dayZeroDate: '2028-07-10', reservoirDepletion: 60, gwOverdraft: 88, consumptionExcess: 38, infraStrain: 60, climateStress: 45, borewellLimit: 150, lat: 13.6, lng: 79.4, cgwbDepth: 18.2, wrisUsage: 9.8, imdRainfall: -18, cwcStorage: 30, isroZone: 'Poor' },
  ]},
  { name: 'Arunachal Pradesh', code: 'AR', lat: 28.2, lng: 94.7, cities: [
    { name: 'Itanagar', state: 'Arunachal Pradesh', solvency: 78, dayZeroDays: 2500, dayZeroDate: '2033-01-01', reservoirDepletion: 15, gwOverdraft: 20, consumptionExcess: 12, infraStrain: 45, climateStress: 18, borewellLimit: 300, lat: 27.1, lng: 93.6, cgwbDepth: 4.2, wrisUsage: 2.1, imdRainfall: 5, cwcStorage: 72, isroZone: 'Good' },
  ]},
  { name: 'Assam', code: 'AS', lat: 26.2, lng: 92.9, cities: [
    { name: 'Guwahati', state: 'Assam', solvency: 68, dayZeroDays: 1800, dayZeroDate: '2031-02-15', reservoirDepletion: 28, gwOverdraft: 42, consumptionExcess: 22, infraStrain: 50, climateStress: 25, borewellLimit: 250, lat: 26.1, lng: 91.7, cgwbDepth: 6.8, wrisUsage: 5.4, imdRainfall: -2, cwcStorage: 58, isroZone: 'Good' },
    { name: 'Dibrugarh', state: 'Assam', solvency: 72, dayZeroDays: 2000, dayZeroDate: '2031-09-01', reservoirDepletion: 22, gwOverdraft: 35, consumptionExcess: 18, infraStrain: 48, climateStress: 20, borewellLimit: 260, lat: 27.5, lng: 95.0, cgwbDepth: 5.2, wrisUsage: 3.8, imdRainfall: 2, cwcStorage: 62, isroZone: 'Good' },
  ]},
  { name: 'Bihar', code: 'BR', lat: 25.1, lng: 85.3, cities: [
    { name: 'Patna', state: 'Bihar', solvency: 44, dayZeroDays: 820, dayZeroDate: '2028-05-20', reservoirDepletion: 58, gwOverdraft: 92, consumptionExcess: 40, infraStrain: 68, climateStress: 42, borewellLimit: 130, lat: 25.6, lng: 85.1, cgwbDepth: 16.4, wrisUsage: 18.2, imdRainfall: -16, cwcStorage: 32, isroZone: 'Moderate' },
    { name: 'Gaya', state: 'Bihar', solvency: 38, dayZeroDays: 700, dayZeroDate: '2028-01-15', reservoirDepletion: 65, gwOverdraft: 98, consumptionExcess: 42, infraStrain: 72, climateStress: 48, borewellLimit: 110, lat: 24.8, lng: 85.0, cgwbDepth: 20.6, wrisUsage: 14.6, imdRainfall: -22, cwcStorage: 26, isroZone: 'Poor' },
  ]},
  { name: 'Chhattisgarh', code: 'CT', lat: 21.3, lng: 81.6, cities: [
    { name: 'Raipur', state: 'Chhattisgarh', solvency: 56, dayZeroDays: 1150, dayZeroDate: '2029-05-10', reservoirDepletion: 45, gwOverdraft: 65, consumptionExcess: 28, infraStrain: 52, climateStress: 35, borewellLimit: 180, lat: 21.3, lng: 81.6, cgwbDepth: 10.8, wrisUsage: 8.4, imdRainfall: -8, cwcStorage: 42, isroZone: 'Moderate' },
  ]},
  { name: 'Goa', code: 'GA', lat: 15.3, lng: 74.0, cities: [
    { name: 'Panaji', state: 'Goa', solvency: 65, dayZeroDays: 1600, dayZeroDate: '2030-07-01', reservoirDepletion: 32, gwOverdraft: 45, consumptionExcess: 25, infraStrain: 42, climateStress: 28, borewellLimit: 200, lat: 15.5, lng: 73.8, cgwbDepth: 6.2, wrisUsage: 3.2, imdRainfall: -4, cwcStorage: 52, isroZone: 'Good' },
  ]},
  { name: 'Gujarat', code: 'GJ', lat: 22.3, lng: 71.2, cities: [
    { name: 'Ahmedabad', state: 'Gujarat', solvency: 60, dayZeroDays: 1350, dayZeroDate: '2029-11-02', reservoirDepletion: 45, gwOverdraft: 65, consumptionExcess: 30, infraStrain: 48, climateStress: 38, borewellLimit: 140, lat: 23.0, lng: 72.6, cgwbDepth: 18.6, wrisUsage: 15.8, imdRainfall: -10, cwcStorage: 48, isroZone: 'Moderate' },
    { name: 'Surat', state: 'Gujarat', solvency: 58, dayZeroDays: 1250, dayZeroDate: '2029-07-20', reservoirDepletion: 48, gwOverdraft: 68, consumptionExcess: 32, infraStrain: 50, climateStress: 36, borewellLimit: 150, lat: 21.2, lng: 72.8, cgwbDepth: 14.2, wrisUsage: 12.4, imdRainfall: -8, cwcStorage: 44, isroZone: 'Moderate' },
    { name: 'Rajkot', state: 'Gujarat', solvency: 42, dayZeroDays: 780, dayZeroDate: '2028-04-05', reservoirDepletion: 62, gwOverdraft: 95, consumptionExcess: 38, infraStrain: 58, climateStress: 52, borewellLimit: 120, lat: 22.3, lng: 70.8, cgwbDepth: 24.8, wrisUsage: 10.6, imdRainfall: -28, cwcStorage: 22, isroZone: 'Poor' },
  ]},
  { name: 'Haryana', code: 'HR', lat: 29.1, lng: 76.1, cities: [
    { name: 'Gurugram', state: 'Haryana', solvency: 36, dayZeroDays: 650, dayZeroDate: '2027-12-01', reservoirDepletion: 68, gwOverdraft: 108, consumptionExcess: 48, infraStrain: 65, climateStress: 50, borewellLimit: 100, lat: 28.5, lng: 77.0, cgwbDepth: 32.4, wrisUsage: 20.2, imdRainfall: -20, cwcStorage: 28, isroZone: 'Poor' },
    { name: 'Faridabad', state: 'Haryana', solvency: 40, dayZeroDays: 720, dayZeroDate: '2028-02-10', reservoirDepletion: 62, gwOverdraft: 102, consumptionExcess: 44, infraStrain: 62, climateStress: 46, borewellLimit: 110, lat: 28.4, lng: 77.3, cgwbDepth: 28.6, wrisUsage: 16.8, imdRainfall: -18, cwcStorage: 30, isroZone: 'Poor' },
  ]},
  { name: 'Himachal Pradesh', code: 'HP', lat: 31.1, lng: 77.2, cities: [
    { name: 'Shimla', state: 'Himachal Pradesh', solvency: 62, dayZeroDays: 1400, dayZeroDate: '2029-12-01', reservoirDepletion: 38, gwOverdraft: 48, consumptionExcess: 28, infraStrain: 52, climateStress: 32, borewellLimit: 200, lat: 31.1, lng: 77.2, cgwbDepth: 8.6, wrisUsage: 4.2, imdRainfall: -10, cwcStorage: 48, isroZone: 'Good' },
  ]},
  { name: 'Jharkhand', code: 'JH', lat: 23.6, lng: 85.3, cities: [
    { name: 'Ranchi', state: 'Jharkhand', solvency: 50, dayZeroDays: 960, dayZeroDate: '2028-10-01', reservoirDepletion: 52, gwOverdraft: 78, consumptionExcess: 32, infraStrain: 58, climateStress: 38, borewellLimit: 160, lat: 23.3, lng: 85.3, cgwbDepth: 12.8, wrisUsage: 8.2, imdRainfall: -12, cwcStorage: 36, isroZone: 'Moderate' },
    { name: 'Jamshedpur', state: 'Jharkhand', solvency: 48, dayZeroDays: 900, dayZeroDate: '2028-08-15', reservoirDepletion: 55, gwOverdraft: 82, consumptionExcess: 35, infraStrain: 60, climateStress: 40, borewellLimit: 150, lat: 22.8, lng: 86.2, cgwbDepth: 14.4, wrisUsage: 10.6, imdRainfall: -14, cwcStorage: 34, isroZone: 'Moderate' },
  ]},
  { name: 'Karnataka', code: 'KA', lat: 15.3, lng: 75.7, cities: [
    { name: 'Bengaluru', state: 'Karnataka', solvency: 58, dayZeroDays: 1200, dayZeroDate: '2029-06-05', reservoirDepletion: 48, gwOverdraft: 72, consumptionExcess: 28, infraStrain: 52, climateStress: 32, borewellLimit: 200, lat: 13.0, lng: 77.6, cgwbDepth: 22.8, wrisUsage: 10.4, imdRainfall: -14, cwcStorage: 42, isroZone: 'Moderate' },
    { name: 'Mysuru', state: 'Karnataka', solvency: 62, dayZeroDays: 1400, dayZeroDate: '2029-12-15', reservoirDepletion: 42, gwOverdraft: 58, consumptionExcess: 24, infraStrain: 48, climateStress: 30, borewellLimit: 210, lat: 12.3, lng: 76.7, cgwbDepth: 16.4, wrisUsage: 6.8, imdRainfall: -10, cwcStorage: 46, isroZone: 'Moderate' },
    { name: 'Hubli', state: 'Karnataka', solvency: 52, dayZeroDays: 1050, dayZeroDate: '2029-01-20', reservoirDepletion: 55, gwOverdraft: 78, consumptionExcess: 32, infraStrain: 55, climateStress: 38, borewellLimit: 180, lat: 15.4, lng: 75.1, cgwbDepth: 18.6, wrisUsage: 8.2, imdRainfall: -16, cwcStorage: 38, isroZone: 'Moderate' },
  ]},
  { name: 'Kerala', code: 'KL', lat: 10.9, lng: 76.3, cities: [
    { name: 'Thiruvananthapuram', state: 'Kerala', solvency: 64, dayZeroDays: 1500, dayZeroDate: '2030-03-01', reservoirDepletion: 35, gwOverdraft: 48, consumptionExcess: 22, infraStrain: 45, climateStress: 32, borewellLimit: 200, lat: 8.5, lng: 76.9, cgwbDepth: 8.4, wrisUsage: 6.8, imdRainfall: -6, cwcStorage: 50, isroZone: 'Good' },
    { name: 'Kochi', state: 'Kerala', solvency: 62, dayZeroDays: 1420, dayZeroDate: '2030-01-10', reservoirDepletion: 38, gwOverdraft: 52, consumptionExcess: 25, infraStrain: 48, climateStress: 30, borewellLimit: 190, lat: 10.0, lng: 76.3, cgwbDepth: 6.2, wrisUsage: 8.4, imdRainfall: -4, cwcStorage: 48, isroZone: 'Good' },
  ]},
  { name: 'Madhya Pradesh', code: 'MP', lat: 22.7, lng: 75.9, cities: [
    { name: 'Bhopal', state: 'Madhya Pradesh', solvency: 52, dayZeroDays: 1050, dayZeroDate: '2029-01-15', reservoirDepletion: 50, gwOverdraft: 75, consumptionExcess: 32, infraStrain: 55, climateStress: 38, borewellLimit: 170, lat: 23.3, lng: 77.4, cgwbDepth: 16.2, wrisUsage: 12.8, imdRainfall: -12, cwcStorage: 38, isroZone: 'Moderate' },
    { name: 'Indore', state: 'Madhya Pradesh', solvency: 54, dayZeroDays: 1100, dayZeroDate: '2029-03-20', reservoirDepletion: 48, gwOverdraft: 72, consumptionExcess: 30, infraStrain: 52, climateStress: 36, borewellLimit: 180, lat: 22.7, lng: 75.9, cgwbDepth: 14.8, wrisUsage: 10.4, imdRainfall: -10, cwcStorage: 40, isroZone: 'Moderate' },
  ]},
  { name: 'Maharashtra', code: 'MH', lat: 19.7, lng: 75.7, cities: [
    { name: 'Mumbai', state: 'Maharashtra', solvency: 52, dayZeroDays: 1095, dayZeroDate: '2029-02-20', reservoirDepletion: 55, gwOverdraft: 62, consumptionExcess: 42, infraStrain: 68, climateStress: 35, borewellLimit: 100, lat: 19.1, lng: 72.9, cgwbDepth: 8.4, wrisUsage: 24.2, imdRainfall: -8, cwcStorage: 45, isroZone: 'Moderate' },
    { name: 'Pune', state: 'Maharashtra', solvency: 61, dayZeroDays: 1460, dayZeroDate: '2030-02-14', reservoirDepletion: 42, gwOverdraft: 55, consumptionExcess: 22, infraStrain: 42, climateStress: 28, borewellLimit: 220, lat: 18.5, lng: 73.9, cgwbDepth: 10.2, wrisUsage: 8.6, imdRainfall: -6, cwcStorage: 52, isroZone: 'Good' },
    { name: 'Nagpur', state: 'Maharashtra', solvency: 48, dayZeroDays: 900, dayZeroDate: '2028-08-10', reservoirDepletion: 58, gwOverdraft: 82, consumptionExcess: 35, infraStrain: 58, climateStress: 42, borewellLimit: 160, lat: 21.1, lng: 79.1, cgwbDepth: 18.4, wrisUsage: 12.6, imdRainfall: -16, cwcStorage: 34, isroZone: 'Moderate' },
    { name: 'Nashik', state: 'Maharashtra', solvency: 46, dayZeroDays: 850, dayZeroDate: '2028-06-25', reservoirDepletion: 60, gwOverdraft: 85, consumptionExcess: 38, infraStrain: 60, climateStress: 44, borewellLimit: 150, lat: 20.0, lng: 73.8, cgwbDepth: 20.2, wrisUsage: 10.8, imdRainfall: -18, cwcStorage: 30, isroZone: 'Poor' },
  ]},
  { name: 'Manipur', code: 'MN', lat: 24.8, lng: 93.9, cities: [
    { name: 'Imphal', state: 'Manipur', solvency: 70, dayZeroDays: 1900, dayZeroDate: '2031-05-01', reservoirDepletion: 25, gwOverdraft: 35, consumptionExcess: 18, infraStrain: 52, climateStress: 22, borewellLimit: 240, lat: 24.8, lng: 94.0, cgwbDepth: 5.8, wrisUsage: 2.4, imdRainfall: 0, cwcStorage: 60, isroZone: 'Good' },
  ]},
  { name: 'Meghalaya', code: 'ML', lat: 25.5, lng: 91.4, cities: [
    { name: 'Shillong', state: 'Meghalaya', solvency: 74, dayZeroDays: 2200, dayZeroDate: '2032-03-01', reservoirDepletion: 18, gwOverdraft: 28, consumptionExcess: 15, infraStrain: 48, climateStress: 18, borewellLimit: 280, lat: 25.6, lng: 91.9, cgwbDepth: 4.6, wrisUsage: 2.8, imdRainfall: 8, cwcStorage: 68, isroZone: 'Good' },
  ]},
  { name: 'Mizoram', code: 'MZ', lat: 23.2, lng: 92.9, cities: [
    { name: 'Aizawl', state: 'Mizoram', solvency: 72, dayZeroDays: 2100, dayZeroDate: '2031-11-01', reservoirDepletion: 20, gwOverdraft: 30, consumptionExcess: 16, infraStrain: 50, climateStress: 20, borewellLimit: 260, lat: 23.7, lng: 92.7, cgwbDepth: 5.2, wrisUsage: 1.8, imdRainfall: 4, cwcStorage: 64, isroZone: 'Good' },
  ]},
  { name: 'Nagaland', code: 'NL', lat: 26.2, lng: 94.6, cities: [
    { name: 'Kohima', state: 'Nagaland', solvency: 70, dayZeroDays: 1950, dayZeroDate: '2031-06-15', reservoirDepletion: 22, gwOverdraft: 32, consumptionExcess: 18, infraStrain: 55, climateStress: 22, borewellLimit: 250, lat: 25.7, lng: 94.1, cgwbDepth: 6.0, wrisUsage: 2.0, imdRainfall: 2, cwcStorage: 62, isroZone: 'Good' },
  ]},
  { name: 'Odisha', code: 'OD', lat: 20.9, lng: 84.0, cities: [
    { name: 'Bhubaneswar', state: 'Odisha', solvency: 55, dayZeroDays: 1120, dayZeroDate: '2029-04-01', reservoirDepletion: 48, gwOverdraft: 68, consumptionExcess: 28, infraStrain: 55, climateStress: 38, borewellLimit: 180, lat: 20.3, lng: 85.8, cgwbDepth: 10.4, wrisUsage: 8.6, imdRainfall: -8, cwcStorage: 42, isroZone: 'Moderate' },
    { name: 'Cuttack', state: 'Odisha', solvency: 52, dayZeroDays: 1050, dayZeroDate: '2029-01-20', reservoirDepletion: 52, gwOverdraft: 72, consumptionExcess: 30, infraStrain: 58, climateStress: 40, borewellLimit: 170, lat: 20.5, lng: 85.9, cgwbDepth: 12.2, wrisUsage: 7.8, imdRainfall: -10, cwcStorage: 40, isroZone: 'Moderate' },
  ]},
  { name: 'Punjab', code: 'PB', lat: 31.1, lng: 75.3, cities: [
    { name: 'Ludhiana', state: 'Punjab', solvency: 32, dayZeroDays: 580, dayZeroDate: '2027-10-01', reservoirDepletion: 70, gwOverdraft: 118, consumptionExcess: 50, infraStrain: 62, climateStress: 45, borewellLimit: 90, lat: 30.9, lng: 75.9, cgwbDepth: 36.8, wrisUsage: 22.4, imdRainfall: -18, cwcStorage: 26, isroZone: 'Poor' },
    { name: 'Amritsar', state: 'Punjab', solvency: 30, dayZeroDays: 540, dayZeroDate: '2027-08-15', reservoirDepletion: 72, gwOverdraft: 125, consumptionExcess: 52, infraStrain: 65, climateStress: 48, borewellLimit: 85, lat: 31.6, lng: 74.9, cgwbDepth: 40.2, wrisUsage: 18.6, imdRainfall: -22, cwcStorage: 22, isroZone: 'Poor' },
  ]},
  { name: 'Rajasthan', code: 'RJ', lat: 27.0, lng: 74.2, cities: [
    { name: 'Jaipur', state: 'Rajasthan', solvency: 24, dayZeroDays: 412, dayZeroDate: '2027-04-08', reservoirDepletion: 82, gwOverdraft: 137, consumptionExcess: 45, infraStrain: 78, climateStress: 72, borewellLimit: 90, lat: 26.9, lng: 75.8, cgwbDepth: 32.4, wrisUsage: 18.2, imdRainfall: -34, cwcStorage: 18, isroZone: 'Poor' },
    { name: 'Jodhpur', state: 'Rajasthan', solvency: 20, dayZeroDays: 350, dayZeroDate: '2027-02-05', reservoirDepletion: 88, gwOverdraft: 145, consumptionExcess: 48, infraStrain: 82, climateStress: 80, borewellLimit: 80, lat: 26.3, lng: 73.0, cgwbDepth: 42.6, wrisUsage: 12.4, imdRainfall: -42, cwcStorage: 12, isroZone: 'Poor' },
    { name: 'Udaipur', state: 'Rajasthan', solvency: 35, dayZeroDays: 620, dayZeroDate: '2027-11-10', reservoirDepletion: 68, gwOverdraft: 105, consumptionExcess: 38, infraStrain: 65, climateStress: 58, borewellLimit: 120, lat: 24.6, lng: 73.7, cgwbDepth: 26.8, wrisUsage: 8.6, imdRainfall: -24, cwcStorage: 24, isroZone: 'Poor' },
  ]},
  { name: 'Sikkim', code: 'SK', lat: 27.5, lng: 88.5, cities: [
    { name: 'Gangtok', state: 'Sikkim', solvency: 76, dayZeroDays: 2400, dayZeroDate: '2032-09-01', reservoirDepletion: 15, gwOverdraft: 22, consumptionExcess: 12, infraStrain: 45, climateStress: 18, borewellLimit: 300, lat: 27.3, lng: 88.6, cgwbDepth: 3.8, wrisUsage: 1.2, imdRainfall: 6, cwcStorage: 70, isroZone: 'Good' },
  ]},
  { name: 'Tamil Nadu', code: 'TN', lat: 11.1, lng: 78.7, cities: [
    { name: 'Chennai', state: 'Tamil Nadu', solvency: 35, dayZeroDays: 800, dayZeroDate: '2028-04-30', reservoirDepletion: 74, gwOverdraft: 112, consumptionExcess: 38, infraStrain: 65, climateStress: 58, borewellLimit: 150, lat: 13.1, lng: 80.3, cgwbDepth: 18.6, wrisUsage: 14.8, imdRainfall: -22, cwcStorage: 24, isroZone: 'Poor' },
    { name: 'Coimbatore', state: 'Tamil Nadu', solvency: 42, dayZeroDays: 780, dayZeroDate: '2028-04-01', reservoirDepletion: 62, gwOverdraft: 92, consumptionExcess: 35, infraStrain: 58, climateStress: 48, borewellLimit: 160, lat: 11.0, lng: 76.9, cgwbDepth: 22.4, wrisUsage: 10.8, imdRainfall: -18, cwcStorage: 28, isroZone: 'Poor' },
    { name: 'Madurai', state: 'Tamil Nadu', solvency: 38, dayZeroDays: 680, dayZeroDate: '2027-12-20', reservoirDepletion: 68, gwOverdraft: 102, consumptionExcess: 40, infraStrain: 62, climateStress: 52, borewellLimit: 140, lat: 9.9, lng: 78.1, cgwbDepth: 24.8, wrisUsage: 12.6, imdRainfall: -26, cwcStorage: 22, isroZone: 'Poor' },
  ]},
  { name: 'Telangana', code: 'TS', lat: 18.1, lng: 79.0, cities: [
    { name: 'Hyderabad', state: 'Telangana', solvency: 48, dayZeroDays: 847, dayZeroDate: '2028-06-17', reservoirDepletion: 62, gwOverdraft: 88, consumptionExcess: 35, infraStrain: 58, climateStress: 42, borewellLimit: 180, lat: 17.4, lng: 78.5, cgwbDepth: 14.2, wrisUsage: 12.6, imdRainfall: -12, cwcStorage: 38, isroZone: 'Moderate' },
    { name: 'Warangal', state: 'Telangana', solvency: 45, dayZeroDays: 810, dayZeroDate: '2028-05-01', reservoirDepletion: 58, gwOverdraft: 90, consumptionExcess: 38, infraStrain: 60, climateStress: 45, borewellLimit: 170, lat: 18.0, lng: 79.6, cgwbDepth: 16.8, wrisUsage: 8.4, imdRainfall: -15, cwcStorage: 34, isroZone: 'Moderate' },
  ]},
  { name: 'Tripura', code: 'TR', lat: 23.9, lng: 91.9, cities: [
    { name: 'Agartala', state: 'Tripura', solvency: 68, dayZeroDays: 1750, dayZeroDate: '2030-12-01', reservoirDepletion: 28, gwOverdraft: 40, consumptionExcess: 20, infraStrain: 52, climateStress: 24, borewellLimit: 240, lat: 23.8, lng: 91.3, cgwbDepth: 6.4, wrisUsage: 3.2, imdRainfall: 0, cwcStorage: 56, isroZone: 'Good' },
  ]},
  { name: 'Uttar Pradesh', code: 'UP', lat: 26.8, lng: 80.9, cities: [
    { name: 'Lucknow', state: 'Uttar Pradesh', solvency: 42, dayZeroDays: 780, dayZeroDate: '2028-04-01', reservoirDepletion: 58, gwOverdraft: 95, consumptionExcess: 42, infraStrain: 65, climateStress: 42, borewellLimit: 120, lat: 26.8, lng: 81.0, cgwbDepth: 22.4, wrisUsage: 28.6, imdRainfall: -16, cwcStorage: 30, isroZone: 'Moderate' },
    { name: 'Varanasi', state: 'Uttar Pradesh', solvency: 40, dayZeroDays: 720, dayZeroDate: '2028-02-15', reservoirDepletion: 62, gwOverdraft: 98, consumptionExcess: 45, infraStrain: 68, climateStress: 45, borewellLimit: 110, lat: 25.3, lng: 83.0, cgwbDepth: 26.2, wrisUsage: 18.4, imdRainfall: -20, cwcStorage: 28, isroZone: 'Poor' },
    { name: 'Agra', state: 'Uttar Pradesh', solvency: 38, dayZeroDays: 660, dayZeroDate: '2027-12-10', reservoirDepletion: 65, gwOverdraft: 105, consumptionExcess: 48, infraStrain: 70, climateStress: 48, borewellLimit: 100, lat: 27.2, lng: 78.0, cgwbDepth: 30.4, wrisUsage: 14.2, imdRainfall: -22, cwcStorage: 24, isroZone: 'Poor' },
  ]},
  { name: 'Uttarakhand', code: 'UK', lat: 30.1, lng: 79.0, cities: [
    { name: 'Dehradun', state: 'Uttarakhand', solvency: 60, dayZeroDays: 1300, dayZeroDate: '2029-09-01', reservoirDepletion: 40, gwOverdraft: 55, consumptionExcess: 28, infraStrain: 50, climateStress: 32, borewellLimit: 190, lat: 30.3, lng: 78.0, cgwbDepth: 10.2, wrisUsage: 6.4, imdRainfall: -8, cwcStorage: 46, isroZone: 'Good' },
  ]},
  { name: 'West Bengal', code: 'WB', lat: 22.6, lng: 88.4, cities: [
    { name: 'Kolkata', state: 'West Bengal', solvency: 50, dayZeroDays: 980, dayZeroDate: '2028-11-01', reservoirDepletion: 52, gwOverdraft: 78, consumptionExcess: 38, infraStrain: 62, climateStress: 35, borewellLimit: 150, lat: 22.6, lng: 88.4, cgwbDepth: 10.8, wrisUsage: 16.4, imdRainfall: -8, cwcStorage: 40, isroZone: 'Moderate' },
    { name: 'Siliguri', state: 'West Bengal', solvency: 58, dayZeroDays: 1200, dayZeroDate: '2029-06-15', reservoirDepletion: 42, gwOverdraft: 62, consumptionExcess: 28, infraStrain: 55, climateStress: 30, borewellLimit: 180, lat: 26.7, lng: 88.4, cgwbDepth: 6.8, wrisUsage: 8.2, imdRainfall: -4, cwcStorage: 48, isroZone: 'Good' },
  ]},
  // Union Territories
  { name: 'Delhi', code: 'DL', lat: 28.7, lng: 77.1, cities: [
    { name: 'New Delhi', state: 'Delhi', solvency: 42, dayZeroDays: 720, dayZeroDate: '2028-02-10', reservoirDepletion: 68, gwOverdraft: 108, consumptionExcess: 52, infraStrain: 72, climateStress: 48, borewellLimit: 120, lat: 28.6, lng: 77.2, cgwbDepth: 28.1, wrisUsage: 22.4, imdRainfall: -18, cwcStorage: 32, isroZone: 'Moderate' },
  ]},
  { name: 'Jammu & Kashmir', code: 'JK', lat: 33.8, lng: 76.6, cities: [
    { name: 'Srinagar', state: 'Jammu & Kashmir', solvency: 65, dayZeroDays: 1600, dayZeroDate: '2030-07-01', reservoirDepletion: 32, gwOverdraft: 42, consumptionExcess: 22, infraStrain: 52, climateStress: 28, borewellLimit: 220, lat: 34.1, lng: 74.8, cgwbDepth: 6.4, wrisUsage: 4.8, imdRainfall: -6, cwcStorage: 52, isroZone: 'Good' },
    { name: 'Jammu', state: 'Jammu & Kashmir', solvency: 58, dayZeroDays: 1250, dayZeroDate: '2029-07-15', reservoirDepletion: 42, gwOverdraft: 58, consumptionExcess: 28, infraStrain: 55, climateStress: 35, borewellLimit: 190, lat: 32.7, lng: 74.9, cgwbDepth: 10.2, wrisUsage: 6.2, imdRainfall: -10, cwcStorage: 44, isroZone: 'Moderate' },
  ]},
  { name: 'Ladakh', code: 'LA', lat: 34.2, lng: 77.6, cities: [
    { name: 'Leh', state: 'Ladakh', solvency: 55, dayZeroDays: 1100, dayZeroDate: '2029-03-01', reservoirDepletion: 45, gwOverdraft: 58, consumptionExcess: 20, infraStrain: 60, climateStress: 42, borewellLimit: 200, lat: 34.2, lng: 77.6, cgwbDepth: 12.4, wrisUsage: 1.2, imdRainfall: -15, cwcStorage: 35, isroZone: 'Moderate' },
  ]},
  { name: 'Chandigarh', code: 'CH', lat: 30.7, lng: 76.8, cities: [
    { name: 'Chandigarh', state: 'Chandigarh', solvency: 55, dayZeroDays: 1100, dayZeroDate: '2029-03-15', reservoirDepletion: 48, gwOverdraft: 72, consumptionExcess: 32, infraStrain: 48, climateStress: 35, borewellLimit: 150, lat: 30.7, lng: 76.8, cgwbDepth: 18.6, wrisUsage: 4.8, imdRainfall: -12, cwcStorage: 42, isroZone: 'Moderate' },
  ]},
  { name: 'Puducherry', code: 'PY', lat: 11.9, lng: 79.8, cities: [
    { name: 'Puducherry', state: 'Puducherry', solvency: 48, dayZeroDays: 900, dayZeroDate: '2028-08-20', reservoirDepletion: 55, gwOverdraft: 85, consumptionExcess: 35, infraStrain: 52, climateStress: 42, borewellLimit: 140, lat: 11.9, lng: 79.8, cgwbDepth: 14.6, wrisUsage: 3.6, imdRainfall: -16, cwcStorage: 32, isroZone: 'Poor' },
  ]},
  { name: 'Andaman & Nicobar', code: 'AN', lat: 11.7, lng: 92.7, cities: [
    { name: 'Port Blair', state: 'Andaman & Nicobar', solvency: 72, dayZeroDays: 2100, dayZeroDate: '2031-10-01', reservoirDepletion: 20, gwOverdraft: 28, consumptionExcess: 15, infraStrain: 48, climateStress: 22, borewellLimit: 250, lat: 11.7, lng: 92.7, cgwbDepth: 4.2, wrisUsage: 0.8, imdRainfall: 4, cwcStorage: 65, isroZone: 'Good' },
  ]},
  { name: 'Dadra & Nagar Haveli and Daman & Diu', code: 'DN', lat: 20.4, lng: 73.0, cities: [
    { name: 'Silvassa', state: 'Dadra & Nagar Haveli and Daman & Diu', solvency: 58, dayZeroDays: 1200, dayZeroDate: '2029-06-01', reservoirDepletion: 45, gwOverdraft: 62, consumptionExcess: 28, infraStrain: 50, climateStress: 34, borewellLimit: 170, lat: 20.3, lng: 73.0, cgwbDepth: 8.6, wrisUsage: 2.4, imdRainfall: -6, cwcStorage: 46, isroZone: 'Moderate' },
  ]},
  { name: 'Lakshadweep', code: 'LD', lat: 10.6, lng: 72.6, cities: [
    { name: 'Kavaratti', state: 'Lakshadweep', solvency: 62, dayZeroDays: 1400, dayZeroDate: '2029-12-01', reservoirDepletion: 35, gwOverdraft: 48, consumptionExcess: 22, infraStrain: 55, climateStress: 30, borewellLimit: 180, lat: 10.6, lng: 72.6, cgwbDepth: 3.2, wrisUsage: 0.4, imdRainfall: -2, cwcStorage: 50, isroZone: 'Good' },
  ]},
];

// Flatten all cities for backwards compatibility
export const CITIES: CityData[] = STATES.flatMap(s => s.cities);

// Get all cities for a state
export function getCitiesForState(stateName: string): CityData[] {
  const state = STATES.find(s => s.name === stateName);
  return state?.cities || [];
}

// Compute state-level solvency (average of cities)
export function getStateSolvency(stateName: string): number {
  const cities = getCitiesForState(stateName);
  if (cities.length === 0) return 50;
  return Math.round(cities.reduce((sum, c) => sum + c.solvency, 0) / cities.length);
}

// Search cities by name (for search bar)
export function searchCities(query: string): { city: CityData; state: string }[] {
  const q = query.toLowerCase();
  const results: { city: CityData; state: string }[] = [];
  STATES.forEach(s => {
    s.cities.forEach(c => {
      if (c.name.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)) {
        results.push({ city: c, state: s.name });
      }
    });
  });
  return results.slice(0, 10);
}

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
