import { useState, useCallback } from 'react';
import { CITIES, computeSolvency, computeDayZeroDays } from '@/lib/waterData';
import Header from '@/components/dashboard/Header';
import CountdownTimer from '@/components/dashboard/CountdownTimer';
import CityMap from '@/components/dashboard/CityMap';
import SolvencyGauge from '@/components/dashboard/SolvencyGauge';
import CoreIndicators from '@/components/dashboard/CoreIndicators';
import DataSources from '@/components/dashboard/DataSources';
import InterventionSimulator from '@/components/dashboard/InterventionSimulator';
import AlertsEngine from '@/components/dashboard/AlertsEngine';
import PreventiveMeasures from '@/components/dashboard/PreventiveMeasures';
import WaterAugmentation from '@/components/dashboard/WaterAugmentation';
import HistoricalTrend from '@/components/dashboard/HistoricalTrend';
import DayZeroProjection from '@/components/dashboard/DayZeroProjection';
import ReportGenerator from '@/components/dashboard/ReportGenerator';

const Index = () => {
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [interventions, setInterventions] = useState<Record<string, number>>({});
  const [refreshKey, setRefreshKey] = useState(0);

  const city = CITIES.find(c => c.name === selectedCity) || CITIES[3];

  // Build intervention map
  const interventionMap: Record<string, number> = {};
  const intDefs = [
    { id: 'conservation', key: 'conservation' },
    { id: 'gwCap', key: 'gwCap' },
    { id: 'rwh', key: 'climate' },
    { id: 'infra', key: 'infra' },
    { id: 'desal', key: 'reservoir' },
    { id: 'reuse', key: 'conservation' },
    { id: 'meters', key: 'conservation' },
  ];
  intDefs.forEach(d => {
    interventionMap[d.key] = (interventionMap[d.key] || 0) + (interventions[d.id] || 0);
  });

  const solvency = computeSolvency(city, interventionMap);
  const dayZeroDays = computeDayZeroDays(solvency, city.dayZeroDays);

  const handleCitySelect = useCallback((name: string) => {
    setSelectedCity(name);
    setInterventions({});
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background" key={refreshKey}>
      <Header cityName={`${city.name}, ${city.state}`} onRefresh={handleRefresh} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 shrink-0 border-r border-border overflow-y-auto p-3 bg-secondary/20">
          <CityMap
            cities={CITIES}
            selectedCity={selectedCity}
            onCitySelect={handleCitySelect}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Countdown - Dominant */}
          <div className="border-b border-border bg-secondary/10">
            <CountdownTimer
              dayZeroDays={dayZeroDays}
              dayZeroDate={city.dayZeroDate}
              isCritical={dayZeroDays < 365}
            />
          </div>

          {/* Dashboard Grid */}
          <div className="p-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            {/* Gauge + Indicators */}
            <div className="space-y-3">
              <SolvencyGauge score={solvency} />
              <CoreIndicators city={city} />
              <DayZeroProjection solvency={solvency} dayZeroDays={dayZeroDays} />
            </div>

            {/* Middle Column */}
            <div className="space-y-3">
              <AlertsEngine city={city} dayZeroDays={dayZeroDays} />
              <InterventionSimulator city={city} onInterventionChange={setInterventions} />
              <HistoricalTrend city={city} />
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <DataSources city={city} />
              <PreventiveMeasures city={city} />
              <WaterAugmentation city={city} />
              <ReportGenerator city={city} solvency={solvency} dayZeroDays={dayZeroDays} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
