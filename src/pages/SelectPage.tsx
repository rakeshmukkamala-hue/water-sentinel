import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { STATES, searchCities, getStateSolvency, getSolvencyLabel, getSolvencyClass } from '@/lib/waterData';
import { useAuth } from '@/lib/auth';

const SelectPage = () => {
  const [selectedState, setSelectedState] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredState, setHoveredState] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return searchCities(searchQuery);
  }, [searchQuery]);

  const sortedStates = useMemo(() =>
    [...STATES].sort((a, b) => getStateSolvency(a.name) - getStateSolvency(b.name)),
  []);

  const selectedStateData = STATES.find(s => s.name === selectedState);

  const handleCitySelect = (cityName: string, stateName: string) => {
    navigate(`/dashboard?state=${encodeURIComponent(stateName)}&city=${encodeURIComponent(cityName)}`);
  };

  // Map coordinates helper
  const mapState = (lat: number, lng: number) => {
    const x = ((lng - 68) / (98 - 68)) * 380 + 10;
    const y = ((38 - lat) / (38 - 6)) * 380 + 10;
    return { x, y };
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="text-base tracking-[0.3em] uppercase text-foreground font-semibold">HydraShield</span>
          <span className="text-base text-primary">// Select Location</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground font-body">{user?.email}</span>
          <button onClick={logout} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Logout</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Map + Search */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold mb-4 tracking-tight text-foreground">Select State & City</h2>

          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search city or state..."
              className="w-full max-w-md bg-muted border border-border rounded-sm px-3 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              maxLength={100}
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full max-w-md mt-1 bg-card border border-border rounded-sm z-20 max-h-60 overflow-y-auto">
                {searchResults.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => handleCitySelect(r.city.name, r.state)}
                    className="w-full text-left px-3 py-2.5 text-sm hover:bg-muted/50 transition-colors flex justify-between text-card-foreground"
                  >
                    <span>{r.city.name}, <span className="text-muted-foreground">{r.state}</span></span>
                    <span className={getSolvencyClass(r.city.solvency)}>{r.city.solvency}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SVG Map */}
          <div className="bg-muted/20 rounded-sm border border-border p-2" style={{ maxWidth: 500, height: 420 }}>
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <path
                d="M160,20 L240,15 L280,30 L300,60 L310,100 L320,140 L310,200 L280,260 L240,320 L210,360 L190,380 L170,360 L140,320 L110,260 L90,200 L80,140 L84,100 L100,60 L130,30 Z"
                fill="none"
                stroke="hsl(0 0% 100%)"
                strokeWidth="2"
                opacity="0.6"
              />
              {STATES.map(state => {
                const { x, y } = mapState(state.lat, state.lng);
                const solvency = getStateSolvency(state.name);
                const isSelected = state.name === selectedState;
                const isHovered = state.name === hoveredState;
                const size = Math.max(3, 10 - solvency / 12);
                return (
                  <g
                    key={state.code}
                    onClick={() => setSelectedState(state.name)}
                    onMouseEnter={() => setHoveredState(state.name)}
                    onMouseLeave={() => setHoveredState('')}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={x} cy={y} r={size}
                      fill={isSelected ? 'hsl(184 72% 35%)' : 'hsl(184 72% 35% / 0.5)'}
                      opacity={isSelected || isHovered ? 1 : 0.5}
                      stroke={isSelected ? 'hsl(0 0% 100%)' : 'none'}
                      strokeWidth={2}
                    />
                    {(isSelected || isHovered) && (
                      <text x={x} y={y - size - 4} textAnchor="middle" fill="hsl(184 72% 35%)" fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono">
                        {state.code} ({solvency})
                      </text>
                    )}
                    <title>{`${state.name} | Solvency: ${solvency} | ${getSolvencyLabel(solvency)}`}</title>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right: State List + Preview */}
        <aside className="w-80 shrink-0 border-l border-border overflow-y-auto bg-background">
          {/* State List */}
          <div className="p-3">
            <div className="panel-header mb-2">States & UTs — Ranked by Risk</div>
            <div className="space-y-0.5 max-h-[40vh] overflow-y-auto">
              {sortedStates.map((state, i) => {
                const solvency = getStateSolvency(state.name);
                return (
                  <button
                    key={state.code}
                    onClick={() => setSelectedState(state.name)}
                    className={`w-full flex items-center justify-between px-2 py-2 rounded-sm text-sm transition-colors ${
                      state.name === selectedState ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground w-6">{i + 1}.</span>
                      <span className={`font-semibold ${state.name === selectedState ? 'text-primary' : 'text-foreground'}`}>
                        {state.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${getSolvencyClass(solvency)}`}>{solvency}</span>
                      <span className="text-muted-foreground text-xs">{state.cities.length}c</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* City Preview */}
          {selectedStateData && (
            <div className="p-3 border-t border-border">
              <div className="panel-header mb-2">{selectedStateData.name} — Cities</div>
              <div className="space-y-2">
                {selectedStateData.cities.map(city => (
                  <button
                    key={city.name}
                    onClick={() => handleCitySelect(city.name, selectedStateData.name)}
                    className="w-full panel p-3 hover:border-primary/50 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-semibold text-card-foreground">{city.name}</span>
                      <span className={`text-sm font-bold ${getSolvencyClass(city.solvency)}`}>{city.solvency}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <div className="text-muted-foreground">GW Level</div>
                        <div className="text-card-foreground font-semibold">{city.cgwbDepth}m</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Reservoir</div>
                        <div className="text-card-foreground font-semibold">{city.cwcStorage}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Day Zero</div>
                        <div className="text-card-foreground font-semibold">{city.dayZeroDays}d</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default SelectPage;
