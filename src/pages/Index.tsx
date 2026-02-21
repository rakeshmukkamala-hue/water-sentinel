import { useState, useCallback, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { STATES, CITIES, computeSolvency, computeDayZeroDays, getStateSolvency, getSolvencyLabel, getSolvencyClass } from '@/lib/waterData';
import { useAuth } from '@/lib/auth';
import Header from '@/components/dashboard/Header';
import CountdownTimer from '@/components/dashboard/CountdownTimer';
import SolvencyGauge from '@/components/dashboard/SolvencyGauge';
import CoreIndicators from '@/components/dashboard/CoreIndicators';
import DataSources from '@/components/dashboard/DataSources';
import InterventionSimulator from '@/components/dashboard/InterventionSimulator';
import AlertsEngine from '@/components/dashboard/AlertsEngine';
import PreventiveMeasures from '@/components/dashboard/PreventiveMeasures';
import HistoricalTrend from '@/components/dashboard/HistoricalTrend';
import DayZeroProjection from '@/components/dashboard/DayZeroProjection';
import ReportGenerator from '@/components/dashboard/ReportGenerator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import WaterAugmentation from '@/components/dashboard/WaterAugmentation';

const Index = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const initialState = params.get('state') || 'Telangana';
  const initialCity = params.get('city') || 'Hyderabad';

  const [selectedStateName, setSelectedStateName] = useState(initialState);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [interventions, setInterventions] = useState<Record<string, number>>({});
  const [refreshKey, setRefreshKey] = useState(0);

  const stateData = STATES.find(s => s.name === selectedStateName);
  const city = stateData?.cities.find(c => c.name === selectedCity)
    || CITIES.find(c => c.name === selectedCity)
    || CITIES[0];

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
    const s = STATES.find(st => st.cities.some(c => c.name === name));
    if (s) setSelectedStateName(s.name);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  const sortedStates = useMemo(() =>
    [...STATES].sort((a, b) => getStateSolvency(a.name) - getStateSolvency(b.name)),
  []);

  return (
    <div className="min-h-screen flex flex-col bg-background" key={refreshKey}>
      <Header cityName={`${city.name}, ${city.state}`} onRefresh={handleRefresh} />

      {/* Navigation sub-bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/20 text-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/select')} className="text-muted-foreground hover:text-foreground transition-colors">← Location Select</button>
          <span className="text-border">|</span>
          <select
            value={selectedStateName}
            onChange={e => {
              const st = STATES.find(s => s.name === e.target.value);
              setSelectedStateName(e.target.value);
              if (st && st.cities.length > 0) {
                setSelectedCity(st.cities[0].name);
                setInterventions({});
              }
            }}
            className="bg-transparent border border-border rounded-sm px-2 py-1 text-sm text-foreground focus:outline-none focus:border-primary"
          >
            {STATES.map(s => (
              <option key={s.code} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/allocations')} className="text-primary hover:text-foreground transition-colors font-semibold uppercase tracking-wider text-xs">Allocations</button>
          <span className="text-border">|</span>
          <button onClick={() => navigate('/report')} className="text-muted-foreground hover:text-primary transition-colors">Report Wastage</button>
          <button onClick={logout} className="text-muted-foreground hover:text-foreground transition-colors">Logout</button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 shrink-0 border-r border-border overflow-y-auto p-3 bg-muted/10 hidden md:block">
          <div className="panel-header mb-2">Nationwide — By State</div>
          <div className="space-y-0.5 mb-4 max-h-[30vh] overflow-y-auto">
            {sortedStates.map((state, i) => {
              const sol = getStateSolvency(state.name);
              return (
                <button
                  key={state.code}
                  onClick={() => {
                    setSelectedStateName(state.name);
                    if (state.cities.length > 0) {
                      setSelectedCity(state.cities[0].name);
                      setInterventions({});
                    }
                  }}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-sm text-sm transition-colors ${
                    state.name === selectedStateName ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted/50'
                  }`}
                >
                  <span className={state.name === selectedStateName ? 'text-primary font-semibold' : 'text-foreground'}>
                    {state.name}
                  </span>
                  <span className={`font-bold ${getSolvencyClass(sol)}`}>{sol}</span>
                </button>
              );
            })}
          </div>

          {stateData && (
            <>
              <div className="panel-header mb-2">{stateData.name} — Cities</div>
              <div className="space-y-0.5">
                {stateData.cities.sort((a, b) => a.solvency - b.solvency).map(c => (
                  <button
                    key={c.name}
                    onClick={() => handleCitySelect(c.name)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-sm text-sm transition-colors ${
                      c.name === selectedCity ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted/50'
                    }`}
                  >
                    <span className={c.name === selectedCity ? 'text-primary font-semibold' : 'text-foreground'}>
                      {c.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${getSolvencyClass(c.solvency)}`}>{c.solvency}</span>
                      <span className="text-muted-foreground text-xs">{getSolvencyLabel(c.solvency)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Countdown - Ultra Dominant */}
          <div className="border-b border-border">
            <CountdownTimer
              dayZeroDays={dayZeroDays}
              dayZeroDate={city.dayZeroDate}
              isCritical={dayZeroDays < 365}
            />
          </div>

          {/* Dashboard Grid */}
          <div className="p-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            <div className="space-y-3">
              <SolvencyGauge score={solvency} />
              <CoreIndicators city={city} />
              <DayZeroProjection solvency={solvency} dayZeroDays={dayZeroDays} />
            </div>

            <div className="space-y-3">
              <AlertsEngine city={city} dayZeroDays={dayZeroDays} />
              <InterventionSimulator city={city} onInterventionChange={setInterventions} />
              <HistoricalTrend city={city} />
            </div>

            <div className="space-y-3">
              <DataSources city={city} />
              <PreventiveMeasures city={city} />

              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-full py-3 px-4 border border-primary rounded-sm text-sm font-semibold uppercase tracking-wider hover:bg-primary/10 transition-colors text-primary flex items-center justify-between">
                    <span>Expansion Strategies →</span>
                    <span className="text-muted-foreground text-xs">Click to preview</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-card-foreground">Water Resource Expansion — {city.name}</DialogTitle>
                  </DialogHeader>
                  <WaterAugmentation city={city} />
                  <button
                    onClick={() => navigate(`/expansion?state=${encodeURIComponent(selectedStateName)}&city=${encodeURIComponent(selectedCity)}`)}
                    className="w-full py-3 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity mt-2"
                  >
                    Full View →
                  </button>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Fixed Report Button at Bottom */}
          <div className="sticky bottom-0 left-0 right-0 z-30">
            <ReportGenerator city={city} solvency={solvency} dayZeroDays={dayZeroDays} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
