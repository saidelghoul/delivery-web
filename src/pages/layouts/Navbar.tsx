import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { COLORS } from "../../constants/colors";
import { useAuthStore } from "../../store/useAuthStore";
import { useAuth } from "../../features/auth/hooks/useAuth";

// Page title map
const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/fleet-management": "Fleet Management",
  "/workers": "Workers",
  "/my-routes": "My Routes",
  "/inventory/shipments": "Shipments",
  "/track-my-package": "Track Package",
};

interface NavbarProps {
  onMenuToggle: () => void;
  sidebarCollapsed: boolean;
}

export const Navbar = ({ onMenuToggle, sidebarCollapsed }: NavbarProps) => {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pageTitle = PAGE_TITLES[location.pathname] || "Dashboard";

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <header style={{
      height: "68px",
      background: COLORS.surface,
      borderBottom: `1px solid ${COLORS.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px",
      flexShrink: 0,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Left: page title */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <h1 style={{
          fontSize: "18px",
          fontWeight: "800",
          color: COLORS.text.main,
          letterSpacing: "-0.4px",
        }}>
          {pageTitle}
        </h1>
      </div>

      {/* Right: notifications + user menu */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Notification bell (placeholder) */}
        <button style={{
          width: "38px",
          height: "38px",
          borderRadius: "10px",
          border: `1px solid ${COLORS.border}`,
          background: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.text.muted,
          position: "relative",
          transition: "background 0.15s",
        }}
          onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.background)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* Badge dot */}
          <span style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: COLORS.danger,
            border: `2px solid ${COLORS.surface}`,
          }} />
        </button>

        {/* User avatar + dropdown */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "6px 10px 6px 6px",
              borderRadius: "10px",
              border: `1px solid ${COLORS.border}`,
              background: dropdownOpen ? COLORS.background : "transparent",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.background)}
            onMouseLeave={(e) => {
              if (!dropdownOpen) e.currentTarget.style.background = "transparent";
            }}
          >
            {/* Avatar */}
            <div style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "12px",
              fontWeight: "800",
              flexShrink: 0,
            }}>
              {initials}
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: COLORS.text.main, lineHeight: "1.2" }}>
                {user?.fullName?.split(" ")[0] || "User"}
              </div>
              <div style={{ fontSize: "11px", color: COLORS.text.muted, lineHeight: "1.2" }}>
                {user?.email}
              </div>
            </div>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={COLORS.text.muted} strokeWidth={2.5}
              style={{ marginLeft: "2px", transition: "transform 0.2s", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              width: "200px",
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "12px",
              boxShadow: COLORS.shadow.lg,
              overflow: "hidden",
              zIndex: 100,
            }}>
              <div style={{ padding: "12px 14px", borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: "13px", fontWeight: "700", color: COLORS.text.main }}>{user?.fullName}</div>
                <div style={{ fontSize: "11px", color: COLORS.text.muted, marginTop: "2px" }}>{user?.email}</div>
              </div>

              {[
                {
                  label: "Profile settings",
                  icon: (
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  ),
                  onClick: () => setDropdownOpen(false),
                },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "13px",
                    color: COLORS.text.secondary,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: "500",
                    textAlign: "left",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.background)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}

              <div style={{ borderTop: `1px solid ${COLORS.border}` }}>
                <button
                  onClick={() => { setDropdownOpen(false); logout(); }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "13px",
                    color: COLORS.danger,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: "600",
                    textAlign: "left",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.dangerLight)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};