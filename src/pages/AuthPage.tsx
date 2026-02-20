import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      if (login(email, password)) {
        navigate('/select');
      } else {
        setError('Invalid credentials');
      }
    } else {
      if (!name.trim()) { setError('Name is required'); return; }
      if (signup(email, password, name)) {
        navigate('/select');
      } else {
        setError('Email already registered');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl lg:text-[86px] font-extrabold tracking-tight text-foreground leading-none mb-4">
          HydraShield
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-body tracking-wide">
          National Water Crisis Monitor
        </p>
        <div className="w-24 h-px bg-border mx-auto mt-6" />
      </div>

      {/* Auth Form */}
      <div className="w-full max-w-sm">
        <div className="panel p-6">
          <div className="flex gap-4 mb-6 border-b border-border pb-3">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`text-sm uppercase tracking-wider font-semibold pb-1 border-b-2 transition-colors ${
                isLogin ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`text-sm uppercase tracking-wider font-semibold pb-1 border-b-2 transition-colors ${
                !isLogin ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="data-label block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-secondary/50 border border-border rounded-sm px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter your name"
                  maxLength={100}
                />
              </div>
            )}
            <div>
              <label className="data-label block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-sm px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="you@example.com"
                required
                maxLength={255}
              />
            </div>
            <div>
              <label className="data-label block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-sm px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
                required
                minLength={4}
                maxLength={128}
              />
            </div>
            {error && <p className="text-xs status-critical">{error}</p>}
            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity"
            >
              {isLogin ? 'Enter Dashboard' : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Report Wastage Link */}
        <button
          onClick={() => navigate('/report')}
          className="w-full mt-4 py-2.5 border border-border rounded-sm text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
        >
          Report Wasteful Usage →
        </button>
      </div>

      <div className="mt-8 text-[10px] text-muted-foreground text-center max-w-md font-body">
        LIVE data from CGWB • CWC • IMD • India-WRIS • ISRO Bhuvan
      </div>
    </div>
  );
};

export default AuthPage;
