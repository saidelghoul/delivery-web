export const COLORS = {
  primary: '#1D4ED8', // Deep delivery blue
  primaryLight: '#3B82F6', // Hover / lighter blue
  primaryDark: '#1E3A8A', // Active / dark blue
  primaryMuted: '#DBEAFE', // Light blue tint (backgrounds, badges)

  secondary: '#F59E0B', // Amber — pending / warning
  secondaryLight: '#FDE68A',
  secondaryDark: '#B45309',

  success: '#10B981', // Delivered / verified
  successLight: '#D1FAE5',
  successDark: '#065F46',

  danger: '#EF4444', // Error / cancelled
  dangerLight: '#FEE2E2',
  dangerDark: '#991B1B',

  warning: '#F97316', // In-transit / attention
  warningLight: '#FFEDD5',

  // Neutrals
  background: '#F1F5F9', // App-level background
  surface: '#FFFFFF', // Cards / forms
  surfaceAlt: '#F8FAFC', // Subtle card variant
  border: '#E2E8F0', // Default border
  borderFocus: '#3B82F6', // Focused input border

  // Typography
  text: {
    main: '#0F172A', // Primary text
    secondary: '#334155', // Secondary text
    muted: '#64748B', // Placeholders / captions
    inverse: '#FFFFFF', // Text on dark backgrounds
    link: '#1D4ED8',
  },

  // Roles (for badges / selectors)
  roles: {
    CLIENT: '#6366F1',
    SELLER: '#F59E0B',
    SYSTEM_ADMIN: '#EF4444',
    DISPATCHER: '#10B981',
    DRIVER: '#3B82F6',
  },

  // Shadows
  shadow: {
    sm: '0 1px 3px rgba(15,23,42,0.08)',
    md: '0 4px 16px rgba(15,23,42,0.10)',
    lg: '0 8px 32px rgba(15,23,42,0.12)',
    focus: '0 0 0 3px rgba(59,130,246,0.25)',
  },
};
