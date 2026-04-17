import { Link } from "react-router-dom";
import { COLORS } from "../../constants/colors";
import { useAuthStore } from "../../store/useAuthStore";

const features = [
  {
    icon: "📦",
    title: "Real-Time Tracking",
    desc: "Clients can follow every step of their delivery — from warehouse to doorstep — with live status updates.",
    color: COLORS.primary,
    bg: COLORS.primaryMuted,
  },
  {
    icon: "🚚",
    title: "Fleet Management",
    desc: "Dispatchers assign routes, monitor drivers, and manage the entire fleet from one unified dashboard.",
    color: COLORS.success,
    bg: COLORS.successLight,
  },
  {
    icon: "🏪",
    title: "Seller Portal",
    desc: "Sellers create shipments, print labels, and track outgoing orders without any back-and-forth.",
    color: COLORS.secondary,
    bg: COLORS.warningLight,
  },
  {
    icon: "📊",
    title: "Smart Analytics",
    desc: "Admins get a full picture of delivery performance, on-time rates, and operational bottlenecks.",
    color: COLORS.primaryLight,
    bg: COLORS.primaryMuted,
  },
  {
    icon: "🔐",
    title: "Role-Based Access",
    desc: "Every user — admin, dispatcher, driver, seller, or client — sees only what they need.",
    color: COLORS.danger,
    bg: COLORS.dangerLight,
  },
  {
    icon: "⚡",
    title: "Built for Speed",
    desc: "Lightweight, fast, and mobile-ready. Your team stays productive whether in the office or on the road.",
    color: COLORS.warning,
    bg: COLORS.warningLight,
  },
];

const steps = [
  { step: "01", title: "Create your account", desc: "Sign up as an admin, seller, or client in under a minute." },
  { step: "02", title: "Set up your operation", desc: "Add workers, configure routes, and connect your inventory." },
  { step: "03", title: "Start delivering", desc: "Manage every shipment end-to-end from a single platform." },
];

const stats = [
  { value: "10K+", label: "Packages delivered" },
  { value: "98%", label: "On-time delivery rate" },
  { value: "500+", label: "Businesses using SwiftDeliver" },
  { value: "24/7", label: "Platform availability" },
];

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: COLORS.surface,
      color: COLORS.text.main,
      overflowX: "hidden",
    }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        height: "68px",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="10" fill={COLORS.primary} />
            <path d="M8 14l10-6 10 6v8l-10 6-10-6v-8z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
            <path d="M18 8v16M8 14l10 6 10-6" stroke="white" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <span style={{ fontWeight: "800", fontSize: "18px", letterSpacing: "-0.4px", color: COLORS.text.main }}>
            SwiftDeliver
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {isAuthenticated ? (
            <Link to="/dashboard" style={{
              padding: "9px 20px", borderRadius: "10px",
              background: COLORS.primary, color: "white",
              fontWeight: "700", fontSize: "14px", textDecoration: "none",
              transition: "background 0.2s",
            }}>
              Go to Dashboard →
            </Link>
          ) : (
            <>
              <Link to="/login" style={{
                padding: "9px 18px", borderRadius: "10px",
                border: `1.5px solid ${COLORS.border}`,
                color: COLORS.text.secondary, fontWeight: "600",
                fontSize: "14px", textDecoration: "none",
                transition: "border-color 0.2s",
              }}>
                Sign in
              </Link>
              <Link to="/register" style={{
                padding: "9px 20px", borderRadius: "10px",
                background: COLORS.primary, color: "white",
                fontWeight: "700", fontSize: "14px", textDecoration: "none",
              }}>
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        background: `linear-gradient(160deg, ${COLORS.background} 0%, ${COLORS.primaryMuted} 50%, ${COLORS.surface} 100%)`,
        padding: "100px 48px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background decoration */}
        <div style={{
          position: "absolute", top: "-120px", left: "50%",
          transform: "translateX(-50%)",
          width: "800px", height: "800px", borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.primaryMuted} 0%, transparent 70%)`,
          opacity: 0.6, pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "760px", margin: "0 auto" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "20px",
            background: COLORS.primaryMuted,
            border: `1px solid ${COLORS.primaryLight}`,
            fontSize: "13px", fontWeight: "600", color: COLORS.primary,
            marginBottom: "28px",
          }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: COLORS.success, display: "inline-block" }} />
            Platform now live — join 500+ businesses
          </div>

          <h1 style={{
            fontSize: "clamp(38px, 6vw, 64px)",
            fontWeight: "900",
            lineHeight: "1.1",
            letterSpacing: "-2px",
            marginBottom: "24px",
            color: COLORS.text.main,
          }}>
            Delivery management
            <br />
            <span style={{
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              built for everyone.
            </span>
          </h1>

          <p style={{
            fontSize: "18px", color: COLORS.text.muted,
            lineHeight: "1.7", marginBottom: "40px",
            maxWidth: "540px", margin: "0 auto 40px",
          }}>
            One platform for delivery companies, sellers, and clients.
            Track packages, manage fleets, and streamline every shipment — in real time.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register" style={{
              padding: "14px 32px", borderRadius: "12px",
              background: COLORS.primary, color: "white",
              fontWeight: "700", fontSize: "16px", textDecoration: "none",
              boxShadow: `0 8px 24px rgba(29,78,216,0.35)`,
              transition: "transform 0.2s, box-shadow 0.2s",
              display: "inline-block",
            }}>
              Start for free →
            </Link>
            <Link to="/login" style={{
              padding: "14px 32px", borderRadius: "12px",
              border: `2px solid ${COLORS.border}`,
              color: COLORS.text.secondary,
              fontWeight: "600", fontSize: "16px", textDecoration: "none",
              display: "inline-block",
            }}>
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{
        background: COLORS.text.main,
        padding: "40px 48px",
      }}>
        <div style={{
          maxWidth: "900px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "32px",
          textAlign: "center",
        }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{
                fontSize: "36px", fontWeight: "900",
                color: "white", letterSpacing: "-1.5px", lineHeight: 1,
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "6px", fontWeight: "500" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "96px 48px", background: COLORS.background }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ fontSize: "13px", fontWeight: "700", color: COLORS.primary, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>
              Everything you need
            </p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "900", letterSpacing: "-1px", color: COLORS.text.main }}>
              One platform. Every role. Zero friction.
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}>
            {features.map((f) => (
              <div key={f.title} style={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "16px",
                padding: "28px",
                boxShadow: COLORS.shadow.sm,
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = COLORS.shadow.md;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = COLORS.shadow.sm;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px",
                  background: f.bg, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: "24px", marginBottom: "18px",
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: "800", color: COLORS.text.main, marginBottom: "10px" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "14px", color: COLORS.text.muted, lineHeight: "1.7" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "96px 48px", background: COLORS.surface }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "13px", fontWeight: "700", color: COLORS.primary, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>
            How it works
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: "900", letterSpacing: "-1px", marginBottom: "60px", color: COLORS.text.main }}>
            Up and running in minutes
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {steps.map((s, i) => (
              <div key={s.step} style={{
                display: "flex", gap: "28px", alignItems: "flex-start",
                textAlign: "left", paddingBottom: i < steps.length - 1 ? "40px" : "0",
                position: "relative",
              }}>
                {/* Vertical line */}
                {i < steps.length - 1 && (
                  <div style={{
                    position: "absolute", left: "23px", top: "52px",
                    width: "2px", height: "calc(100% - 12px)",
                    background: COLORS.border,
                  }} />
                )}
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px",
                  background: COLORS.primaryMuted,
                  border: `2px solid ${COLORS.primary}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: "900", fontSize: "14px", color: COLORS.primary,
                  flexShrink: 0, zIndex: 1,
                }}>
                  {s.step}
                </div>
                <div style={{ paddingTop: "10px" }}>
                  <h3 style={{ fontSize: "17px", fontWeight: "800", color: COLORS.text.main, marginBottom: "6px" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: COLORS.text.muted, lineHeight: "1.7" }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: "96px 48px",
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
        }} />
        <div style={{
          position: "absolute", bottom: "-100px", left: "-60px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "560px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: "900", letterSpacing: "-1px",
            color: "white", marginBottom: "16px",
          }}>
            Ready to streamline your deliveries?
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", marginBottom: "36px", lineHeight: "1.7" }}>
            Join hundreds of businesses already using SwiftDeliver to run smarter operations.
          </p>
          <Link to="/register" style={{
            display: "inline-block",
            padding: "15px 36px", borderRadius: "12px",
            background: "white", color: COLORS.primary,
            fontWeight: "800", fontSize: "16px", textDecoration: "none",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}>
            Create your free account →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: COLORS.text.main,
        padding: "40px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="26" height="26" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="10" fill={COLORS.primaryLight} />
            <path d="M8 14l10-6 10 6v8l-10 6-10-6v-8z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
            <path d="M18 8v16M8 14l10 6 10-6" stroke="white" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <span style={{ color: "white", fontWeight: "700", fontSize: "15px" }}>SwiftDeliver</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>
          © {new Date().getFullYear()} SwiftDeliver. All rights reserved.
        </p>
      </footer>
    </div>
  );
}