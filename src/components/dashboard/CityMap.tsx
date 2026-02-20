import { CityData, getSolvencyLabel } from '@/lib/waterData';

interface CityMapProps {
  cities: CityData[];
  selectedCity: string;
  onCitySelect: (name: string) => void;
}

const CityMap = ({ cities, selectedCity, onCitySelect }: CityMapProps) => {
  const sorted = [...cities].sort((a, b) => a.solvency - b.solvency);

  // Simplified India outline SVG viewbox mapping
  const mapCity = (city: CityData) => {
    const x = ((city.lng - 68) / (90 - 68)) * 180 + 10;
    const y = ((35 - city.lat) / (35 - 8)) * 220 + 10;
    return { x, y };
  };

  const markerSize = (solvency: number) => Math.max(4, 12 - (solvency / 10));

  return (
    <div className="flex flex-col gap-3">
      <div className="panel-header">India Water Crisis Map</div>
      
      {/* SVG Map */}
      <div className="relative bg-secondary/30 rounded-sm border border-border overflow-hidden" style={{ height: 240 }}>
        <svg viewBox="0 0 200 240" className="w-full h-full">
          {/* Simplified India outline */}
          <path
            d="M80,20 L120,15 L140,30 L150,50 L155,80 L160,100 L155,130 L140,160 L120,190 L105,210 L95,220 L85,210 L70,190 L55,160 L45,130 L40,100 L42,70 L50,45 L65,25 Z"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity="0.5"
          />
          {cities.map(city => {
            const { x, y } = mapCity(city);
            const size = markerSize(city.solvency);
            const isSelected = city.name === selectedCity;
            return (
              <g key={city.name} onClick={() => onCitySelect(city.name)} className="cursor-pointer">
                <circle
                  cx={x} cy={y} r={size}
                  fill={isSelected ? 'hsl(var(--primary))' : 'hsl(var(--accent))'}
                  opacity={isSelected ? 1 : 0.6}
                  stroke={isSelected ? 'hsl(var(--foreground))' : 'none'}
                  strokeWidth={isSelected ? 1.5 : 0}
                />
                <text
                  x={x} y={y - size - 3}
                  textAnchor="middle"
                  fill="hsl(var(--muted-foreground))"
                  fontSize="6"
                  fontFamily="JetBrains Mono"
                >
                  {city.name}
                </text>
                <title>{`${city.name} | Solvency: ${city.solvency} | Day Zero: ${city.dayZeroDays}d`}</title>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Ranked List */}
      <div className="space-y-1">
        {sorted.map((city, i) => (
          <button
            key={city.name}
            onClick={() => onCitySelect(city.name)}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-sm text-xs transition-colors ${
              city.name === selectedCity ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-4">{i + 1}.</span>
              <span className={city.name === selectedCity ? 'text-primary font-semibold' : 'text-foreground'}>
                {city.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-[10px] ${
                city.solvency <= 25 ? 'status-critical' : city.solvency <= 50 ? 'status-warning' : 'status-live'
              }`}>
                {city.solvency}
              </span>
              <span className="text-muted-foreground text-[10px]">
                {getSolvencyLabel(city.solvency)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CityMap;
