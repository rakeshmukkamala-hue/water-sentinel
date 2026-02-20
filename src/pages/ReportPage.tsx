import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { STATES } from '@/lib/waterData';
import { useAuth } from '@/lib/auth';

interface Report {
  id: string;
  user: string;
  state: string;
  city: string;
  type: string;
  description: string;
  timestamp: string;
}

const WASTE_TYPES = ['Industrial Discharge', 'Domestic Waste', 'Agricultural Overuse', 'Infrastructure Leak'];

const ReportPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('hydrashield_reports') || '[]');
    setReports(stored);
  }, []);

  const stateData = STATES.find(s => s.name === state);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state || !wasteType || !description.trim()) return;

    const report: Report = {
      id: crypto.randomUUID(),
      user: user?.email || 'anonymous',
      state,
      city: city || 'Unspecified',
      type: wasteType,
      description: description.trim().slice(0, 500),
      timestamp: new Date().toISOString(),
    };

    const updated = [report, ...reports].slice(0, 50);
    setReports(updated);
    localStorage.setItem('hydrashield_reports', JSON.stringify(updated));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
        <div className="flex items-center gap-3">
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-semibold">HydraShield</span>
          <span className="text-sm text-primary">// Report Wasteful Usage</span>
        </div>
        <button
          onClick={() => navigate(user ? '/select' : '/')}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
        >
          ← {user ? 'Back to Dashboard' : 'Back to Login'}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-[43px] font-extrabold tracking-tight mb-2">
            Report Wasteful Usage
          </h1>
          <p className="text-sm text-muted-foreground font-body mb-8">
            Contribute to national water crisis alerts. Your reports inform regional solvency assessments.
          </p>

          {submitted ? (
            <div className="panel p-8 text-center">
              <div className="text-2xl font-bold text-foreground mb-3">✓ Report Logged</div>
              <p className="text-sm text-muted-foreground font-body mb-6">
                Your report has been submitted and contributes to national alert systems.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => { setSubmitted(false); setDescription(''); setWasteType(''); }}
                  className="px-4 py-2 border border-border rounded-sm text-xs font-semibold uppercase tracking-wider hover:bg-muted/50 transition-colors"
                >
                  Submit Another
                </button>
                <button
                  onClick={() => navigate(user ? '/select' : '/')}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-sm text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form */}
              <div className="panel p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {user && (
                    <div>
                      <label className="data-label block mb-1">Logged in as</label>
                      <div className="text-sm text-foreground">{user.name} ({user.email})</div>
                    </div>
                  )}
                  <div>
                    <label className="data-label block mb-1">State / UT *</label>
                    <select
                      value={state}
                      onChange={e => { setState(e.target.value); setCity(''); }}
                      required
                      className="w-full bg-secondary/50 border border-border rounded-sm px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                    >
                      <option value="">Select State</option>
                      {STATES.map(s => (
                        <option key={s.code} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  {stateData && (
                    <div>
                      <label className="data-label block mb-1">City</label>
                      <select
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className="w-full bg-secondary/50 border border-border rounded-sm px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                      >
                        <option value="">Select City</option>
                        {stateData.cities.map(c => (
                          <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="data-label block mb-1">Wastage Type *</label>
                    <select
                      value={wasteType}
                      onChange={e => setWasteType(e.target.value)}
                      required
                      className="w-full bg-secondary/50 border border-border rounded-sm px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                    >
                      <option value="">Select Type</option>
                      {WASTE_TYPES.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="data-label block mb-1">Description *</label>
                    <textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      required
                      maxLength={500}
                      rows={4}
                      className="w-full bg-secondary/50 border border-border rounded-sm px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
                      placeholder="Describe the water wastage observed..."
                    />
                    <div className="text-[10px] text-muted-foreground mt-1 text-right">{description.length}/500</div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity"
                  >
                    Submit Report
                  </button>
                </form>
              </div>

              {/* Recent Reports Log */}
              <div className="panel p-6">
                <div className="panel-header">Recent Reports — Terminal Log</div>
                <div className="space-y-2 max-h-96 overflow-y-auto terminal-text">
                  {reports.length === 0 ? (
                    <div className="text-muted-foreground text-xs">No reports yet. Be the first to contribute.</div>
                  ) : (
                    reports.slice(0, 15).map(r => (
                      <div key={r.id} className="border-b border-border/30 pb-1.5">
                        <div className="flex justify-between">
                          <span className="status-warning">[{r.type.toUpperCase()}]</span>
                          <span className="text-muted-foreground text-[9px]">{new Date(r.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
                        </div>
                        <div className="text-foreground/80 text-[11px] mt-0.5">{r.state} / {r.city}</div>
                        <div className="text-foreground/60 text-[10px] mt-0.5 truncate">{r.description}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReportPage;
