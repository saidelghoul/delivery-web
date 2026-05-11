import { useAuthStore } from '../../store/useAuthStore';
import { COLORS } from '../../constants/colors';
import type { UserRole } from '../../types/auth';

const ROLE_CONFIG: Record<
  UserRole,
  {
    greeting: string;
    description: string;
    stats: { label: string; value: string; color: string; icon: React.ReactNode }[];
  }
> = {
  SYSTEM_ADMIN: {
    greeting: 'Admin Overview',
    description: "Here's what's happening across the platform today.",
    stats: [
      { label: 'Active Workers', value: '24', color: COLORS.primary, icon: '👷' },
      { label: 'Deliveries Today', value: '128', color: COLORS.success, icon: '📦' },
      { label: 'Pending Shipments', value: '37', color: COLORS.secondary, icon: '⏳' },
      { label: 'Fleet Vehicles', value: '12', color: COLORS.primaryLight, icon: '🚚' },
    ],
  },
  DISPATCHER: {
    greeting: 'Dispatch Control',
    description: "Monitor and manage today's delivery operations.",
    stats: [
      { label: 'Active Drivers', value: '8', color: COLORS.primary, icon: '🧑‍✈️' },
      { label: 'Routes Active', value: '14', color: COLORS.success, icon: '🗺️' },
      { label: 'Pending Dispatch', value: '6', color: COLORS.secondary, icon: '⏳' },
      { label: 'Completed Today', value: '53', color: COLORS.primaryLight, icon: '✅' },
    ],
  },
  DRIVER: {
    greeting: 'Your Delivery Day',
    description: "Here's your schedule and active route for today.",
    stats: [
      { label: 'Assigned Stops', value: '11', color: COLORS.primary, icon: '📍' },
      { label: 'Completed', value: '4', color: COLORS.success, icon: '✅' },
      { label: 'Remaining', value: '7', color: COLORS.secondary, icon: '📦' },
      { label: 'Est. Finish', value: '5:30 PM', color: COLORS.primaryLight, icon: '🕔' },
    ],
  },
  SELLER: {
    greeting: 'Your Shipments',
    description: 'Track your orders and manage outgoing shipments.',
    stats: [
      { label: 'Active Orders', value: '19', color: COLORS.primary, icon: '🛒' },
      { label: 'In Transit', value: '11', color: COLORS.primaryLight, icon: '🚚' },
      { label: 'Delivered', value: '84', color: COLORS.success, icon: '✅' },
      { label: 'Issues', value: '2', color: COLORS.danger, icon: '⚠️' },
    ],
  },
  CLIENT: {
    greeting: 'Your Packages',
    description: 'Track your deliveries and view order history.',
    stats: [
      { label: 'In Transit', value: '2', color: COLORS.primary, icon: '🚚' },
      { label: 'Out for Delivery', value: '1', color: COLORS.secondary, icon: '📍' },
      { label: 'Delivered', value: '12', color: COLORS.success, icon: '✅' },
      { label: 'Returns', value: '0', color: COLORS.text.muted, icon: '↩️' },
    ],
  },
};

export default function DashboardPage() {
  const { user } = useAuthStore();
  const role = user?.role ?? 'CLIENT';
  const config = ROLE_CONFIG[role];

  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Welcome header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
          borderRadius: '16px',
          padding: '28px 32px',
          marginBottom: '28px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circle */}
        <div
          style={{
            position: 'absolute',
            right: '-40px',
            top: '-40px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '60px',
            bottom: '-60px',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }}
        />

        <p style={{ fontSize: '14px', opacity: 0.75, marginBottom: '6px' }}>
          {timeGreeting}, {user?.fullName?.split(' ')[0]} 👋
        </p>
        <h2
          style={{
            fontSize: '26px',
            fontWeight: '800',
            letterSpacing: '-0.5px',
            marginBottom: '8px',
          }}
        >
          {config.greeting}
        </h2>
        <p style={{ fontSize: '14px', opacity: 0.7, maxWidth: '400px' }}>{config.description}</p>

        {/* Role badge */}
        <div
          style={{
            display: 'inline-block',
            marginTop: '16px',
            padding: '4px 14px',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.15)',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '0.3px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          {role.replace('_', ' ')}
        </div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        {config.stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '14px',
              padding: '20px',
              boxShadow: COLORS.shadow.sm,
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = COLORS.shadow.md;
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = COLORS.shadow.sm;
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
            }}
          >
            <div style={{ fontSize: '26px', marginBottom: '12px' }}>{stat.icon}</div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: '800',
                color: stat.color,
                letterSpacing: '-1px',
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: '13px',
                color: COLORS.text.muted,
                marginTop: '6px',
                fontWeight: '500',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder content card */}
      <div
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '14px',
          padding: '32px',
          boxShadow: COLORS.shadow.sm,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚧</div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '700',
            color: COLORS.text.main,
            marginBottom: '8px',
          }}
        >
          More content coming soon
        </h3>
        <p style={{ fontSize: '14px', color: COLORS.text.muted, maxWidth: '320px' }}>
          This section will be populated as we build out the features for your role.
        </p>
      </div>
    </div>
  );
}
