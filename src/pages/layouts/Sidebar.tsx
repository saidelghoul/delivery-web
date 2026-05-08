import { NavLink } from 'react-router-dom';
import { COLORS } from '../../constants/colors';
import { useAuthStore } from '../../store/useAuthStore';
import type { UserRole } from '../../types/auth';

// --- Nav item type ---
interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

// --- Icons ---
const Icon = {
  dashboard: (
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  fleet: (
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  workers: (
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  routes: (
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
    </svg>
  ),
  shipments: (
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    </svg>
  ),
  track: (
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  ),
  chevronLeft: (
    <svg
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  chevronRight: (
    <svg
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  logo: (
    <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="10" fill={COLORS.primary} />
      <path
        d="M8 14l10-6 10 6v8l-10 6-10-6v-8z"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M18 8v16M8 14l10 6 10-6" stroke="white" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
};

// --- All nav items ---
const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: Icon.dashboard,
    roles: ['SYSTEM_ADMIN', 'DISPATCHER', 'DRIVER', 'SELLER', 'CLIENT'],
  },
  {
    label: 'Fleet Management',
    path: '/fleet-management',
    icon: Icon.fleet,
    roles: ['SYSTEM_ADMIN', 'DISPATCHER'],
  },
  {
    label: 'Workers',
    path: '/workers',
    icon: Icon.workers,
    roles: ['SYSTEM_ADMIN'],
  },
  {
    label: 'My Routes',
    path: '/my-routes',
    icon: Icon.routes,
    roles: ['DRIVER'],
  },
  {
    label: 'Shipments',
    path: '/inventory/shipments',
    icon: Icon.shipments,
    roles: ['SELLER'],
  },
  {
    label: 'Track Package',
    path: '/track-my-package',
    icon: Icon.track,
    roles: ['CLIENT'],
  },
];

// --- Role badge colors ---
const ROLE_LABELS: Record<UserRole, string> = {
  SYSTEM_ADMIN: 'Admin',
  DISPATCHER: 'Dispatcher',
  DRIVER: 'Driver',
  SELLER: 'Seller',
  CLIENT: 'Client',
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const { user } = useAuthStore();
  const role = user?.role;

  const visibleItems = NAV_ITEMS.filter((item) => role && item.roles.includes(role));

  return (
    <aside
      style={{
        width: collapsed ? '72px' : '240px',
        minHeight: '100vh',
        background: COLORS.surface,
        borderRight: `1px solid ${COLORS.border}`,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
        flexShrink: 0,
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: collapsed ? '20px 18px' : '20px 24px',
          borderBottom: `1px solid ${COLORS.border}`,
          minHeight: '68px',
          overflow: 'hidden',
        }}
      >
        {Icon.logo}
        {!collapsed && (
          <span
            style={{
              fontWeight: '800',
              fontSize: '17px',
              color: COLORS.text.main,
              letterSpacing: '-0.4px',
              whiteSpace: 'nowrap',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            SwiftDeliver
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav
        style={{
          flex: 1,
          padding: '12px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
        }}
      >
        {visibleItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={collapsed ? item.label : undefined}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: collapsed ? '11px 17px' : '11px 16px',
              borderRadius: '10px',
              textDecoration: 'none',
              color: isActive ? COLORS.primary : COLORS.text.secondary,
              background: isActive ? COLORS.primaryMuted : 'transparent',
              fontWeight: isActive ? '700' : '500',
              fontSize: '14px',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'background 0.15s, color 0.15s',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            })}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              if (!el.style.background.includes(COLORS.primaryMuted)) {
                el.style.background = COLORS.surfaceAlt;
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              if (!el.style.background.includes(COLORS.primaryMuted)) {
                el.style.background = 'transparent';
              }
            }}
          >
            <span style={{ flexShrink: 0 }}>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Role badge */}
      {!collapsed && role && (
        <div
          style={{
            margin: '0 12px 12px',
            padding: '12px 14px',
            background: COLORS.background,
            borderRadius: '10px',
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: COLORS.text.muted,
              marginBottom: '4px',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Signed in as
          </div>
          <div
            style={{
              fontSize: '13px',
              fontWeight: '700',
              color: COLORS.text.main,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {user?.fullName}
          </div>
          <div
            style={{
              display: 'inline-block',
              marginTop: '6px',
              padding: '2px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '700',
              fontFamily: "'DM Sans', sans-serif",
              background: COLORS.roles[role],
              color: 'white',
              letterSpacing: '0.3px',
            }}
          >
            {ROLE_LABELS[role]}
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 8px 16px',
          padding: '10px',
          borderRadius: '10px',
          border: `1px solid ${COLORS.border}`,
          background: COLORS.surface,
          cursor: 'pointer',
          color: COLORS.text.muted,
          transition: 'background 0.15s, color 0.15s',
          fontFamily: "'DM Sans', sans-serif",
        }}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? Icon.chevronRight : Icon.chevronLeft}
      </button>
    </aside>
  );
};
