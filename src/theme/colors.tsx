// ─────────────────────────────────────────────────────────────────────────────
// Gigly Design Tokens
// ─────────────────────────────────────────────────────────────────────────────

export const Colors = {

  // ── Base ──────────────────────────────────────────────────────────────────
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",

  // ── Primary — Indigo ──────────────────────────────────────────────────────
  primary: "#3B30C4",         // buttons, active tabs, CTAs  ← BRAND
  primaryLight: "#EEEDFB",    // badge backgrounds, chip bg, card selected bg  ← BRAND_LIGHT
  primaryDark: "#2D1F8A",     // pressed states, illustration bg  ← illustrationActiveBg
  primaryMuted: "#C7D2FE",    // disabled outlines, skeleton shimmer
  primarySurface: "#F5F3FF",  // page-level tinted backgrounds

  // ── Secondary — Amber ────────────────────────────────────────────────────
  secondary: "#F59E0B",
  secondaryLight: "#FFFBEB",
  secondaryDark: "#B45309",
  secondaryMuted: "#FDE68A",  // star fill, low-priority badges

  // ── Success — Emerald ────────────────────────────────────────────────────
  success: "#10B981",
  successLight: "#ECFDF5",
  successDark: "#065F46",
  successMuted: "#A7F3D0",

  // ── Danger — Red ─────────────────────────────────────────────────────────
  danger: "#EF4444",
  dangerLight: "#FEF2F2",
  dangerDark: "#B91C1C",
  dangerMuted: "#FECACA",

  // ── Warning — Orange ─────────────────────────────────────────────────────
  warning: "#F97316",
  warningLight: "#FFF7ED",
  warningDark: "#C2410C",
  warningMuted: "#FED7AA",

  // ── Info — Sky ───────────────────────────────────────────────────────────
  info: "#0EA5E9",
  infoLight: "#F0F9FF",
  infoDark: "#0369A1",
  infoMuted: "#BAE6FD",

  // ── Neutrals ─────────────────────────────────────────────────────────────
  neutral50:  "#F9FAFB",
  neutral100: "#F3F4F6",
  neutral200: "#E5E7EB",
  neutral300: "#D1D5DB",
  neutral400: "#9CA3AF",
  neutral500: "#6B7280",
  neutral600: "#4B5563",
  neutral700: "#374151",
  neutral800: "#1F2937",
  neutral900: "#111827",

  // ── Backgrounds ──────────────────────────────────────────────────────────
  background: "#FAFAFA",              // app background
  backgroundAlt: "#F4F4F8",           // subtle section contrast  ← GRAY_BG
  surface: "#FFFFFF",                  // card surfaces
  surfaceSecondary: "#F4F4F8",         // input backgrounds, message bubbles  ← GRAY_BG
  surfaceElevated: "#FFFFFF",          // modals, bottom sheets
  surfaceOverlay: "rgba(0,0,0,0.45)",  // modal scrim

  // ── Borders ──────────────────────────────────────────────────────────────
  border: "#E2E2EC",               // all card / input borders  ← GRAY_BORDER
  borderStrong: "#D1D5DB",         // heavier dividers
  borderFocus: "#3B30C4",          // focused input border  ← BRAND
  borderDanger: "#EF4444",         // error-state input border

  // ── Text ─────────────────────────────────────────────────────────────────
  textPrimary: "#111118",          // headings, body  ← DARK
  textSecondary: "#6B7280",        // subtitles, muted labels
  textTertiary: "#9898AA",         // timestamps, placeholders  ← GRAY_TEXT
  textDisabled: "#D1D5DB",
  textInverse: "#FFFFFF",
  textLink: "#3B30C4",             // tappable inline links  ← BRAND
  textDanger: "#EF4444",
  textSuccess: "#10B981",
  textWarning: "#F97316",

  // ── Tab bar ──────────────────────────────────────────────────────────────
  tabBarActive: "#3B30C4",         // ← BRAND
  tabBarInactive: "#9CA3AF",
  tabBarBackground: "#FFFFFF",
  tabBarBorder: "#E2E2EC",         // ← GRAY_BORDER

  // ── Skeleton / Shimmer ───────────────────────────────────────────────────
  skeletonBase: "#E2E2EC",         // ← GRAY_BORDER
  skeletonHighlight: "#F4F4F8",    // ← GRAY_BG

  // ── Rating / Trust ───────────────────────────────────────────────────────
  starFilled: "#F59E0B",
  starEmpty: "#E2E2EC",            // ← GRAY_BORDER
  trustHigh: "#10B981",            // 4.5+
  trustMid: "#F59E0B",             // 3–4.4
  trustLow: "#EF4444",             // < 3

  // ── Online / Availability ────────────────────────────────────────────────
  onlineIndicator: "#10B981",
  offlineIndicator: "#9CA3AF",
  busyIndicator: "#F97316",

  // ── Chat / Messaging ─────────────────────────────────────────────────────
  bubbleSent: "#3B30C4",           // ← BRAND
  bubbleSentText: "#FFFFFF",
  bubbleReceived: "#F4F4F8",       // ← GRAY_BG
  bubbleReceivedText: "#111118",   // ← DARK
  chatInputBg: "#F4F4F8",          // ← GRAY_BG

  // ── Gig status badges ────────────────────────────────────────────────────
  statusPosted: "#EEEDFB",         // ← primaryLight
  statusInProgress: "#FFF7ED",
  statusCompleted: "#ECFDF5",
  statusCancelled: "#FEF2F2",
  statusDisputed: "#FFF7ED",

  // ── OTP / Auth ───────────────────────────────────────────────────────────
  otpBoxBorder: "#E2E2EC",         // idle  ← GRAY_BORDER
  otpBoxActiveBg: "#EEEDFB",       // focused  ← primaryLight
  otpBoxFilledBorder: "#3B30C4",   // filled  ← BRAND
  otpBoxErrorBg: "#FEF2F2",
  otpBoxErrorBorder: "#EF4444",

  // ── Role / Onboarding illustrations ──────────────────────────────────────
  illustrationActiveBg: "#2D1F8A",   // selected role card  ← primaryDark
  illustrationInactiveBg: "#D1D1D8", // unselected role card (greyscale)

  // ── Chips ────────────────────────────────────────────────────────────────
  chipBorder: "#E2E2EC",           // unselected  ← GRAY_BORDER
  chipBg: "#FFFFFF",

  // ── Progress bar ─────────────────────────────────────────────────────────
  progressTrackBg: "#F4F4F8",      // ← GRAY_BG

  // ── ID verification badge ────────────────────────────────────────────────
  verificationBadgeBg: "#ECFDF5",
  verificationBadgeBorder: "#D1FAE5",
  verificationBadgeText: "#065F46",

  // ── Watermark ────────────────────────────────────────────────────────────
  watermark: "rgba(59,48,196,0.04)", // large decorative brand text

  // ── Aliases (backwards-compat) ───────────────────────────────────────────
  amber: "#F59E0B",
  indigo: "#3B30C4",
  emerald: "#10B981",

  // ── Status bar ───────────────────────────────────────────────────────────
  statusBarStyle: "dark-content" as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// Shadows
// ─────────────────────────────────────────────────────────────────────────────
export const Shadows = {
  none: {},

  sm: {
    shadowColor: "#111118",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: "#111118",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: "#111118",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
  },

  primaryGlow: {
    shadowColor: "#3B30C4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 12,
    elevation: 6,
  },
  cardShadow: {}, // legacy — border-only cards
};

// ─────────────────────────────────────────────────────────────────────────────
// Spacing scale  (4-pt grid)
// ─────────────────────────────────────────────────────────────────────────────
export const Spacing = {
  xxs:   2,
  xs:    4,
  sm:    8,
  md:    12,
  base:  16,
  lg:    20,
  xl:    24,
  xxl:   32,
  "3xl": 40,
  "4xl": 48,
  "5xl": 64,
};

// ─────────────────────────────────────────────────────────────────────────────
// Border radius scale
// ─────────────────────────────────────────────────────────────────────────────
export const Radius = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  24,
  full: 9999,
};

// ─────────────────────────────────────────────────────────────────────────────
// Typography scale
// ─────────────────────────────────────────────────────────────────────────────
export const FontSize = {
  xs:    11,
  sm:    12,
  base:  14,
  md:    15,
  lg:    16,
  xl:    18,
  "2xl": 20,
  "3xl": 24,
  "4xl": 28,
  "5xl": 32,
  "6xl": 40,
};

export const LineHeight = {
  tight:   1.2,
  snug:    1.35,
  normal:  1.5,
  relaxed: 1.65,
};

// ─────────────────────────────────────────────────────────────────────────────
// Z-index layers
// ─────────────────────────────────────────────────────────────────────────────
export const ZIndex = {
  base:     0,
  raised:   10,
  dropdown: 100,
  sticky:   200,
  overlay:  300,
  modal:    400,
  toast:    500,
  tooltip:  600,
};

// ─────────────────────────────────────────────────────────────────────────────
// Animation durations (ms)
// ─────────────────────────────────────────────────────────────────────────────
export const Duration = {
  instant: 80,
  fast:    150,
  normal:  250,
  slow:    400,
  xslow:   600,
};

// ─────────────────────────────────────────────────────────────────────────────
// Semantic / alias map  (use this in components — not raw Colors)
// ─────────────────────────────────────────────────────────────────────────────
export const COLORS = {
  ...Colors,

  // ── App-level ────────────────────────────────────────────────────────────
  appBackground:    Colors.background,
  splashBackground: Colors.primary,
  inputBackground:  Colors.surfaceSecondary,
  error:            Colors.danger,
  errorLight:       Colors.dangerLight,
  errorText:        Colors.textDanger,

  // ── Button ───────────────────────────────────────────────────────────────
  buttonPrimary:       Colors.primary,
  buttonPrimaryText:   Colors.textInverse,
  buttonSecondary:     Colors.surface,
  buttonSecondaryText: Colors.textPrimary,
  buttonDisabled:      Colors.neutral200,
  buttonDisabledText:  Colors.textDisabled,

  // ── Card ─────────────────────────────────────────────────────────────────
  cardBackground: Colors.surface,
  cardBorder:     Colors.border,

  // ── Input ────────────────────────────────────────────────────────────────
  inputBorder:      Colors.border,
  inputBorderFocus: Colors.borderFocus,
  inputBorderError: Colors.borderDanger,
  inputText:        Colors.textPrimary,
  inputPlaceholder: Colors.textTertiary,

  // ── Badge ────────────────────────────────────────────────────────────────
  badgePrimary:     Colors.primaryLight,
  badgePrimaryText: Colors.primary,
  badgeSuccess:     Colors.successLight,
  badgeSuccessText: Colors.successDark,
  badgeDanger:      Colors.dangerLight,
  badgeDangerText:  Colors.dangerDark,
  badgeWarning:     Colors.warningLight,
  badgeWarningText: Colors.warningDark,
  badgeInfo:        Colors.infoLight,
  badgeInfoText:    Colors.infoDark,

  // ── Misc ─────────────────────────────────────────────────────────────────
  divider: Colors.border,
  scrim:   Colors.surfaceOverlay,
};

// ─────────────────────────────────────────────────────────────────────────────
// Gig status helper  — maps status string → { bg, text, label }
// Usage: const badge = GigStatusColors['completed']
// ─────────────────────────────────────────────────────────────────────────────
export const GigStatusColors: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  posted:      { bg: Colors.statusPosted,      text: Colors.primary,      label: "Posted"      },
  in_progress: { bg: Colors.statusInProgress,  text: Colors.warning,      label: "In Progress" },
  completed:   { bg: Colors.statusCompleted,   text: Colors.successDark,  label: "Completed"   },
  cancelled:   { bg: Colors.statusCancelled,   text: Colors.dangerDark,   label: "Cancelled"   },
  disputed:    { bg: Colors.statusDisputed,    text: Colors.warningDark,  label: "Disputed"    },
};