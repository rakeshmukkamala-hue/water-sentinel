import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { STATES, CITIES, computeSolvency, computeDayZeroDays } from '@/lib/waterData';
import WaterAugmentation from '@/components/dashboard/WaterAugmentation';

const ExpansionPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const stateName = params.get('state') || 'Telangana';
  const cityName = params.get('city') || 'Hyderabad';
  const [selectedCity, setSelectedCity] = useState(cityName);

  const stateData = STATES.find(s => s.name === stateName);
  const city = stateData?.cities.find(c => c.name === selectedCity) || CITIES[0];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/dashboard?state=${encodeURIComponent(stateName)}&city=${encodeURIComponent(selectedCity)}`)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
          >
            ← Back to Dashboard
          </button>
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-semibold">HydraShield</span>
          <span className="text-sm text-primary font-semibold">// Water Resource Expansion</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">City:</span>
          <select
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            className="bg-secondary/50 border border-border rounded-sm px-2 py-1 text-xs text-foreground focus:outline-none focus:border-primary"
          >
            {stateData?.cities.map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <h1 className="text-3xl md:text-4xl lg:text-[43px] font-extrabold tracking-tight mb-2">
          Water Resource Expansion & Recharge
        </h1>
        <p className="text-sm text-muted-foreground font-body mb-6">
          {city.name}, {city.state} — Solvency: {city.solvency} | Day Zero: {city.dayZeroDays} days
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
          {/* Full Augmentation Panel */}
          <div className="lg:col-span-2">
            <WaterAugmentation city={city} />
          </div>

          {/* Long-Term Target */}
          <div className="panel p-6">
            <div className="panel-header">Long-Term Sustainability Target</div>
            <div className="space-y-4">
              <div>
                <div className="data-label">Target Index</div>
                <div className="text-3xl font-extrabold text-foreground">75+</div>
                <div className="text-xs text-muted-foreground font-body mt-1">Current: {city.solvency}</div>
              </div>
              <div>
                <div className="data-label">Gap to Target</div>
                <div className="text-2xl font-bold tabular-nums text-foreground">
                  {Math.max(0, 75 - city.solvency)} points
                </div>
              </div>
              <div>
                <div className="data-label">Est. Years to Target</div>
                <div className="text-2xl font-bold tabular-nums text-foreground">
                  {Math.max(1, Math.ceil((75 - city.solvency) / 8))}
                </div>
                <div className="text-[10px] text-muted-foreground font-body">With max interventions + augmentation</div>
              </div>
            </div>
          </div>

          {/* Borewell Integration */}
          <div className="panel p-6">
            <div className="panel-header">Borewell Limit Integration</div>
            <div className="space-y-3">
              <div>
                <div className="data-label">Max Permitted Depth</div>
                <div className="text-3xl font-extrabold tabular-nums">{city.borewellLimit}m</div>
              </div>
              {city.gwOverdraft > 100 && (
                <div className="p-3 border border-destructive/30 rounded-sm">
                  <div className="status-critical text-sm font-semibold">⚠ MORATORIUM ACTIVE</div>
                  <div className="text-xs text-foreground/70 font-body mt-1">
                    GW overdraft at {city.gwOverdraft}% — no new borewells until recharge exceeds extraction.
                  </div>
                </div>
              )}
              <div className="text-xs text-muted-foreground font-body">
                Recharge programs directly impact borewell policy. Achieving recharge parity lifts moratorium restrictions.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExpansionPage;
