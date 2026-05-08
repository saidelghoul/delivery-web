import React from 'react';
import { COLORS } from '../../../constants/colors';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div style={styles.root}>
      {/* Left panel — branding */}
      <div style={styles.panel} data-auth-panel-hide="true">
        <div style={styles.panelInner}>
          <div style={styles.logo}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="10" fill="white" fillOpacity="0.15" />
              <path
                d="M8 14l10-6 10 6v8l-10 6-10-6v-8z"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M18 8v16M8 14l10 6 10-6"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            <span style={styles.logoText}>SwiftDeliver</span>
          </div>

          <div style={styles.panelContent}>
            <h2 style={styles.panelHeading}>
              Delivery management,
              <br />
              <span style={styles.panelHeadingAccent}>reimagined.</span>
            </h2>
            <p style={styles.panelDesc}>
              A unified platform for delivery companies, sellers, and clients — from first shipment
              to final mile.
            </p>

            <div style={styles.featureList}>
              {[
                { icon: '📦', label: 'Real-time package tracking' },
                { icon: '🚚', label: 'Fleet & driver management' },
                { icon: '📊', label: 'Shipment analytics dashboard' },
              ].map((f) => (
                <div key={f.label} style={styles.featureItem}>
                  <span style={styles.featureIcon}>{f.icon}</span>
                  <span style={styles.featureLabel}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative circles */}
          <div style={styles.decorCircle1} />
          <div style={styles.decorCircle2} />
        </div>
      </div>

      {/* Right panel — form */}
      <div style={styles.formSide}>
        <div style={styles.formContainer}>
          <div style={styles.formHeader}>
            <h1 style={styles.formTitle}>{title}</h1>
            {subtitle && <p style={styles.formSubtitle}>{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Inline styles ---
const styles: Record<string, React.CSSProperties> = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    backgroundColor: COLORS.background,
  },
  panel: {
    width: '42%',
    minWidth: '380px',
    background: `linear-gradient(145deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 60%, #0F172A 100%)`,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  panelInner: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '40px 48px',
    position: 'relative',
    zIndex: 2,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoText: {
    color: COLORS.text.inverse,
    fontSize: '22px',
    fontWeight: '700',
    letterSpacing: '-0.4px',
  },
  panelContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: '60px',
  },
  panelHeading: {
    color: COLORS.text.inverse,
    fontSize: '36px',
    fontWeight: '800',
    lineHeight: '1.2',
    letterSpacing: '-0.8px',
    marginBottom: '20px',
  },
  panelHeadingAccent: {
    color: COLORS.primaryMuted,
  },
  panelDesc: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: '15px',
    lineHeight: '1.7',
    marginBottom: '40px',
    maxWidth: '320px',
  },
  featureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '12px 18px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.10)',
  },
  featureIcon: {
    fontSize: '20px',
  },
  featureLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: '14px',
    fontWeight: '500',
  },
  decorCircle1: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.06)',
    bottom: '-100px',
    right: '-100px',
    zIndex: 1,
  },
  decorCircle2: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.04)',
    bottom: '-200px',
    right: '-200px',
    zIndex: 1,
  },
  formSide: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
    overflowY: 'auto',
  },
  formContainer: {
    width: '100%',
    maxWidth: '440px',
  },
  formHeader: {
    marginBottom: '32px',
  },
  formTitle: {
    fontSize: '28px',
    fontWeight: '800',
    color: COLORS.text.main,
    letterSpacing: '-0.6px',
    marginBottom: '6px',
  },
  formSubtitle: {
    fontSize: '15px',
    color: COLORS.text.muted,
    lineHeight: '1.6',
  },
};

// Inject responsive CSS + Google Font
const styleTag = document.createElement('style');
styleTag.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  @media (max-width: 767px) {
    [data-auth-panel-hide] { display: none !important; }
  }

  .auth-input {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid ${COLORS.border};
    border-radius: 10px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    color: ${COLORS.text.main};
    background: ${COLORS.surface};
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  .auth-input:focus {
    border-color: ${COLORS.borderFocus};
    box-shadow: ${COLORS.shadow.focus};
  }
  .auth-input::placeholder { color: ${COLORS.text.muted}; }

  .auth-btn {
    width: 100%;
    padding: 13px 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    background: ${COLORS.primary};
    color: ${COLORS.text.inverse};
    transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
    letter-spacing: -0.2px;
  }
  .auth-btn:hover { background: ${COLORS.primaryDark}; box-shadow: 0 4px 16px rgba(29,78,216,0.35); }
  .auth-btn:active { transform: scale(0.99); }
  .auth-btn:disabled { background: ${COLORS.primaryLight}; cursor: not-allowed; transform: none; box-shadow: none; }

  .auth-btn-outline {
    width: 100%;
    padding: 12px 20px;
    border-radius: 10px;
    border: 1.5px solid ${COLORS.border};
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    background: ${COLORS.surface};
    color: ${COLORS.text.secondary};
    transition: border-color 0.2s, background 0.2s;
  }
  .auth-btn-outline:hover { border-color: ${COLORS.borderFocus}; background: ${COLORS.surfaceAlt}; }

  .auth-error {
    background: ${COLORS.dangerLight};
    border: 1px solid #FECACA;
    color: ${COLORS.dangerDark};
    padding: 12px 14px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 1.5;
  }

  .auth-success {
    background: ${COLORS.successLight};
    border: 1px solid #A7F3D0;
    color: ${COLORS.successDark};
    padding: 12px 14px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 1.5;
  }

  .auth-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: ${COLORS.text.secondary};
    margin-bottom: 6px;
  }

  .auth-link {
    color: ${COLORS.text.link};
    font-weight: 600;
    text-decoration: none;
    font-size: 14px;
  }
  .auth-link:hover { text-decoration: underline; }

  .auth-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${COLORS.text.muted};
    font-size: 13px;
    margin: 8px 0;
  }
  .auth-divider::before, .auth-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${COLORS.border};
  }

  .spinner {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 2.5px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    vertical-align: middle;
    margin-right: 8px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .otp-grid {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  .otp-box {
    width: 52px;
    height: 60px;
    border: 2px solid ${COLORS.border};
    border-radius: 12px;
    font-size: 24px;
    font-weight: 700;
    color: ${COLORS.text.main};
    background: ${COLORS.surface};
    text-align: center;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-family: 'DM Sans', sans-serif;
    caret-color: transparent;
  }
  .otp-box:focus {
    border-color: ${COLORS.borderFocus};
    box-shadow: ${COLORS.shadow.focus};
  }
  .otp-box.filled {
    border-color: ${COLORS.primary};
    background: ${COLORS.primaryMuted};
  }

  .role-card {
    border: 2px solid ${COLORS.border};
    border-radius: 12px;
    padding: 14px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.15s;
    background: ${COLORS.surface};
  }
  .role-card:hover { border-color: ${COLORS.primaryLight}; background: ${COLORS.surfaceAlt}; }
  .role-card.selected {
    border-color: ${COLORS.primary};
    background: ${COLORS.primaryMuted};
    box-shadow: 0 0 0 3px rgba(29,78,216,0.1);
  }

  .password-toggle {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: ${COLORS.text.muted};
    padding: 4px;
    display: flex;
    align-items: center;
  }
  .password-toggle:hover { color: ${COLORS.text.secondary}; }

  @media (min-width: 768px) {
    .auth-panel-show { display: flex !important; }
  }
`;
document.head.appendChild(styleTag);
