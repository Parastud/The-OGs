export const Colors = {
  primary: "#4F46E5", // indigo — buttons, active tabs, CTAs
  primaryLight: "#EEF2FF", // indigo tint — badge backgrounds, AI chip bg
  primaryDark: "#3730A3", // indigo dark — pressed states

  secondary: "#F59E0B", // amber — trust score, urgency, highlights
  secondaryLight: "#FFFBEB", // amber tint
  secondaryDark: "#B45309", // amber dark

  success: "#10B981", // emerald — verified, completed, online dot
  successLight: "#ECFDF5", // emerald tint
  successDark: "#065F46", // emerald dark

  danger: "#EF4444", // red — errors, withdraw, delete, dispute reject
  dangerLight: "#FEF2F2", // red tint
  dangerDark: "#B91C1C", // red dark

  background: "#FAFAFA", // app background
  surface: "#FFFFFF", // card surfaces
  surfaceSecondary: "#F3F4F6", // input backgrounds, message bubbles

  border: "#E5E7EB", // all card/input borders
  borderFocus: "#4F46E5", // focused input border

  textPrimary: "#111827", // headings, body
  textSecondary: "#6B7280", // subtitles, muted labels
  textTertiary: "#9CA3AF", // timestamps, placeholders, version text
  textInverse: "#FFFFFF", // text on dark/indigo backgrounds

  amber: "#F59E0B", // alias for secondary (trust score bars)
  indigo: "#4F46E5", // alias for primary
  emerald: "#10B981", // alias for success

  tabBarActive: "#4F46E5",
  tabBarInactive: "#9CA3AF",
  tabBarBackground: "#FFFFFF",

  statusBarStyle: "dark-content" as const,
};

export const Shadows = {
  cardShadow: {}, // empty — Gigly uses borders not shadows
};

export const COLORS = {
  ...Colors,
  appBackground: Colors.background,
  splashBackground: Colors.primary,
  inputBackground: Colors.surfaceSecondary,
  error: Colors.danger,
  // ensure others match naturally
};
