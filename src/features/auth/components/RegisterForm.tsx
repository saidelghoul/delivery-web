import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type RegisterableRole = 'CLIENT' | 'SELLER' | 'SYSTEM_ADMIN';

const ROLES: {
  value: RegisterableRole;
  label: string;
  desc: string;
  icon: string;
}[] = [
  { value: 'CLIENT', label: 'Client', desc: 'Track your packages', icon: '👤' },
  {
    value: 'SELLER',
    label: 'Seller / Provider',
    desc: 'Manage your shipments',
    icon: '🏪',
  },
  {
    value: 'SYSTEM_ADMIN',
    label: 'Admin',
    desc: 'Manage a delivery company',
    icon: '🏢',
  },
];

export const RegisterForm = () => {
  const { register, loading, error, clearError } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<RegisterableRole>('CLIENT');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await register({ email, password, fullName, role });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {error && <div className="auth-error">⚠️ {error}</div>}

      {/* Role selector */}
      <div>
        <label className="auth-label">I am a...</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {ROLES.map((r) => (
            <div
              key={r.value}
              className={`role-card ${role === r.value ? 'selected' : ''}`}
              onClick={() => {
                setRole(r.value);
                clearError();
              }}
            >
              <span style={{ fontSize: '22px' }}>{r.icon}</span>
              <div>
                <div
                  style={{
                    fontWeight: '700',
                    fontSize: '14px',
                    color: '#0F172A',
                  }}
                >
                  {r.label}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>{r.desc}</div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: `2px solid ${role === r.value ? '#1D4ED8' : '#CBD5E1'}`,
                    background: role === r.value ? '#1D4ED8' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {role === r.value && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2 2 4-4"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="auth-label">Full name</label>
        <input
          className="auth-input"
          type="text"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          autoComplete="name"
        />
      </div>

      <div>
        <label className="auth-label">Email address</label>
        <input
          className="auth-input"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div>
        <label className="auth-label">Password</label>
        <div style={{ position: 'relative' }}>
          <input
            className="auth-input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            style={{ paddingRight: '48px' }}
            autoComplete="new-password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                />
              </svg>
            ) : (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
        <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '6px' }}>Minimum 8 characters</p>
      </div>

      <button className="auth-btn" type="submit" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner" />
            Creating account...
          </>
        ) : (
          'Create account'
        )}
      </button>

      <p style={{ textAlign: 'center', fontSize: '14px', color: '#64748B' }}>
        Already have an account?{' '}
        <Link to="/login" className="auth-link">
          Sign in
        </Link>
      </p>
    </form>
  );
};
