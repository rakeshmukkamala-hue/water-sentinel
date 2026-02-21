import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { STATES, getStateSolvency, getSolvencyLabel, getSolvencyClass, CITIES, computeDayZeroDays } from '@/lib/waterData';
import { useAuth } from '@/lib/auth';

interface StateAllocation {
  name: string;
  code: string;
  cities: number;
  gwBCM: number;
  surfaceMCM: number;
  totalAvailable: number;
  consumptionPct: number;
  solvency: number;
  status: string;
}

const AllocationPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const allocations = useMemo<StateAllocation[]>(() => {
    return STATES.map(state => {
      const sol = getStateSolvency(state.name);
      // Derive allocation from city data
      const avgGW = state.cities.reduce((s, c) => s + c.wrisUsage, 0) / Math.max(state.cities.length, 1);
      const avgCWC = state.cities.reduce((s, c) => s + c.cwcStorage, 0) / Math.max(state.cities.length, 1);
      const gwBCM = +(avgGW * (state.cities.length * 1.5)).toFixed(1);
      const surfaceMCM = +(avgCWC * state.cities.length * 120).toFixed(0);
      const total = +(gwBCM + surfaceMCM / 1000).toFixed(1);
      const consumption = Math.round(100 - sol * 0.6 + Math.random() * 10);
      return {
        name: state.name,
        code: state.code,
        cities: state.cities.length,
        gwBCM,
        surfaceMCM,
        totalAvailable: total,
        consumptionPct: Math.min(consumption, 120),
        solvency: sol,
        status: getSolvencyLabel(sol),
      };
    }).sort((a, b) => a.solvency - b.solvency);
  }, []);

  // National aggregate
  const nationalSolvency = Math.round(CITIES.reduce((s, c) => s + c.solvency, 0) / CITIES.length);
  const nationalDayZero = computeDayZeroDays(nationalSolvency, Math.round(CITIES.reduce((s, c) => s + c.dayZeroDays, 0) / CITIES.length));
  const nationalDate = new Date();
  nationalDate.setDate(nationalDate.getDate() + nationalDayZero);

  // Map helper
  const mapState = (lat: number, lng: number) => {
    const x = ((lng - 68) / (98 - 68)) * 380 + 10;
    const y = ((38 - lat) / (38 - 6)) * 380 + 10;
    return { x, y };
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-4">
          <span className="text-base tracking-[0.3em] uppercase text-foreground font-semibold">HydraShield</span>
          <span className="text-base text-primary font-semibold">// Water Allocation Explorer</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <button onClick={() => navigate('/select')} className="text-muted-foreground hover:text-foreground transition-colors">← Dashboard</button>
          <button onClick={logout} className="text-muted-foreground hover:text-foreground transition-colors">Logout</button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {/* National Countdown */}
        <div className="py-10 border-b border-border text-center">
          <div className="data-label mb-2 text-base tracking-[0.25em]">National Day Zero Countdown</div>
          <div
            className="text-[60px] md:text-[80px] lg:text-[100px] font-extrabold text-primary tabular-nums leading-none"
            style={{ textShadow: '0 0 20px hsla(184, 72%, 35%, 0.3)' }}
          >
            {nationalDayZero.toLocaleString()} <span className="text-3xl text-muted-foreground">DAYS</span>
          </div>
          <div className="text-lg text-muted-foreground font-body mt-2">
            Expected: <span className="text-foreground font-semibold">{nationalDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="text-sm text-muted-foreground font-body mt-1">
            National Solvency: <span className={`font-bold ${getSolvencyClass(nationalSolvency)}`}>{nationalSolvency}</span> | Total: 1,122 BCM Surface + 433 BCM GW
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Choropleth Map */}
          <div className="xl:col-span-1">
            <h2 className="text-2xl font-bold mb-3 text-foreground">Stress Choropleth</h2>
            <div className="bg-muted/10 rounded-sm border border-border p-2" style={{ height: 420 }}>
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <path
                  d="M160,20 L240,15 L280,30 L300,60 L310,100 L320,140 L310,200 L280,260 L240,320 L210,360 L190,380 L170,360 L140,320 L110,260 L90,200 L80,140 L84,100 L100,60 L130,30 Z"
                  fill="none"
                  stroke="hsl(0 0% 100% / 0.4)"
                  strokeWidth="1.5"
                />
                {STATES.map(state => {
                  const { x, y } = mapState(state.lat, state.lng);
                  const sol = getStateSolvency(state.name);
                  // Opacity from stress: lower solvency = more opaque (more stressed)
                  const opacity = 0.3 + (1 - sol / 100) * 0.7;
                  const size = Math.max(4, 12 - sol / 10);
                  return (
                    <g key={state.code}>
                      <circle
                        cx={x} cy={y} r={size}
                        fill={`hsla(184, 72%, 35%, ${opacity})`}
                        stroke="hsl(0 0% 100% / 0.3)"
                        strokeWidth={1}
                      />
                      <text x={x} y={y - size - 3} textAnchor="middle" fill="hsl(184 72% 35%)" fontSize="6" fontFamily="JetBrains Mono" fontWeight="bold">
                        {state.code}
                      </text>
                      <title>{`${state.name} | Solvency: ${sol} | ${getSolvencyLabel(sol)}`}</title>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 px-1">
              <span>◀ Critical (low opacity)</span>
              <span>Safe (high opacity) ▶</span>
            </div>
          </div>

          {/* Allocation Table */}
          <div className="xl:col-span-2 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-3 text-primary">National Water Allocation Monitor</h2>
            <div className="border border-border rounded-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    <th className="text-left px-3 py-2.5 text-muted-foreground uppercase tracking-wider text-xs">#</th>
                    <th className="text-left px-3 py-2.5 text-muted-foreground uppercase tracking-wider text-xs">State/UT</th>
                    <th className="text-right px-3 py-2.5 text-muted-foreground uppercase tracking-wider text-xs">Cities</th>
                    <th className="text-right px-3 py-2.5 text-muted-foreground uppercase tracking-wider text-xs">GW (BCM/yr)</th>
                    <th className="text-right px-3 py-2.5 text-muted-foreground uppercase tracking-wider text-xs">Surface (MCM)</th>
                    <th className="text-right px-3 py-2.5 text-muted-foreground uppercase tracking-wider text-xs">Total</th>
                    <th className="text-right px-3 py-2.5 text-muted-foreground uppercase tracking-wider text-xs">Use %</th>
                    <th className="text-right px-3 py-2.5 text-muted-foreground uppercase tracking-wider text-xs">Solvency</th>
                    <th className="text-left px-3 py-2.5 text-muted-foreground uppercase tracking-wider text-xs">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allocations.map((a, i) => (
                    <tr
                      key={a.code}
                      className="border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => navigate(`/dashboard?state=${encodeURIComponent(a.name)}`)}
                    >
                      <td className="px-3 py-2 text-muted-foreground">{i + 1}</td>
                      <td className="px-3 py-2 font-semibold text-foreground">{a.name}</td>
                      <td className="px-3 py-2 text-right tabular-nums text-foreground">{a.cities}</td>
                      <td className="px-3 py-2 text-right tabular-nums text-foreground">{a.gwBCM}</td>
                      <td className="px-3 py-2 text-right tabular-nums text-foreground">{a.surfaceMCM.toLocaleString()}</td>
                      <td className="px-3 py-2 text-right tabular-nums font-semibold text-foreground">{a.totalAvailable}</td>
                      <td className={`px-3 py-2 text-right tabular-nums font-bold ${
                        a.consumptionPct > 90 ? 'status-critical' : a.consumptionPct > 70 ? 'status-warning' : 'status-live'
                      }`}>{a.consumptionPct}%</td>
                      <td className={`px-3 py-2 text-right tabular-nums font-bold ${getSolvencyClass(a.solvency)}`}>{a.solvency}</td>
                      <td className="px-3 py-2">
                        <span className={`text-xs font-semibold ${getSolvencyClass(a.solvency)}`}>{a.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllocationPage;
