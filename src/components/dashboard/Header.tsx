import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface HeaderProps {
  cityName: string;
  onRefresh: () => void;
}

const Header = ({ cityName, onRefresh }: HeaderProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatted = time.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    timeZone: 'Asia/Kolkata',
  });
  const clock = time.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    timeZone: 'Asia/Kolkata', hour12: true,
  });

  return (
    <header className="flex items-center justify-between px-4 py-2.5 border-b border-border">
      <div className="flex items-center gap-3">
        <span className="text-sm tracking-[0.3em] uppercase text-foreground font-semibold">HydraShield</span>
        <span className="text-sm text-primary font-semibold">// {cityName}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-body">{formatted}</span>
        <span className="text-primary font-semibold tabular-nums">{clock} IST</span>
        <span className="animate-tick text-primary">●</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">Updated: {time.toISOString().slice(0, 16).replace('T', ' ')} IST from CGWB/IMD</span>
        <button
          onClick={onRefresh}
          className="p-1.5 rounded-sm border border-border hover:bg-primary/20 transition-colors"
          title="Force refresh"
        >
          <RefreshCw className="w-4 h-4 text-primary" />
        </button>
      </div>
    </header>
  );
};

export default Header;
