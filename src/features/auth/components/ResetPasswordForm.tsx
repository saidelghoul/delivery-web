import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ResetPasswordForm = () => {
  const { resetPassword, loading, error, clearError } = useAuth();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [matchError, setMatchError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email = sessionStorage.getItem('reset_email') || '';

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    clearError();
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted) {
      const newOtp = Array(6).fill('');
      pasted.split('').forEach((ch, i) => {
        newOtp[i] = ch;
      });
      setOtp(newOtp);
      inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMatchError('');
    clearError();
    if (newPassword !== confirmPassword) {
      setMatchError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setMatchError('Password must be at least 8 characters.');
      return;
    }
    await resetPassword({ email, code: otp.join(''), newPassword });
  };

  const EyeIcon = ({ show }: { show: boolean }) =>
    show ? (
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
    );

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {error && <div className="auth-error">⚠️ {error}</div>}
      {matchError && <div className="auth-error">⚠️ {matchError}</div>}

      <div>
        <label
          className="auth-label"
          style={{
            textAlign: 'center',
            display: 'block',
            marginBottom: '14px',
          }}
        >
          Enter the 6-digit code we sent you
        </label>
        <div className="otp-grid" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              className={`otp-box ${digit ? 'filled' : ''}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="auth-label">New password</label>
        <div style={{ position: 'relative' }}>
          <input
            className="auth-input"
            type={showNew ? 'text' : 'password'}
            placeholder="Create a new password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setMatchError('');
            }}
            required
            style={{ paddingRight: '48px' }}
            autoComplete="new-password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowNew(!showNew)}
            tabIndex={-1}
          >
            <EyeIcon show={showNew} />
          </button>
        </div>
      </div>

      <div>
        <label className="auth-label">Confirm new password</label>
        <div style={{ position: 'relative' }}>
          <input
            className="auth-input"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setMatchError('');
            }}
            required
            style={{ paddingRight: '48px' }}
            autoComplete="new-password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirm(!showConfirm)}
            tabIndex={-1}
          >
            <EyeIcon show={showConfirm} />
          </button>
        </div>
        <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '6px' }}>Minimum 8 characters</p>
      </div>

      <button className="auth-btn" type="submit" disabled={loading || otp.join('').length !== 6}>
        {loading ? (
          <>
            <span className="spinner" />
            Resetting password...
          </>
        ) : (
          'Reset password'
        )}
      </button>

      <p style={{ textAlign: 'center', fontSize: '14px', color: '#64748B' }}>
        <Link to="/login" className="auth-link">
          ← Back to login
        </Link>
      </p>
    </form>
  );
};
