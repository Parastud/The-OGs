import { StyleSheet } from "react-native";
import { Colors } from "./colors";
import { Fonts } from "./fonts";

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
};
export const radius = { sm: 4, md: 8, lg: 12, xl: 16, full: 999 };

export const GlobalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: spacing.lg,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  screenPadding: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },

  // Cards
  card: {
    backgroundColor: Colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: spacing.lg,
  },
  cardSm: {
    backgroundColor: Colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: spacing.md,
  },
  cardRow: {
    backgroundColor: Colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: spacing.lg,
    flexDirection: "row",
    gap: spacing.md,
  },

  // Typography
  h1: {
    fontSize: Fonts.fontSize["4xl"],
    fontFamily: Fonts.fontFamily.bold,
    color: Colors.textPrimary,
  },
  h2: {
    fontSize: 22,
    fontFamily: Fonts.fontFamily.bold,
    color: Colors.textPrimary,
  },
  h3: {
    fontSize: Fonts.fontSize.xl,
    fontFamily: Fonts.fontFamily.semiBold,
    color: Colors.textPrimary,
  },
  h4: {
    fontSize: Fonts.fontSize.lg,
    fontFamily: Fonts.fontFamily.semiBold,
    color: Colors.textPrimary,
  },
  bodyLg: {
    fontSize: Fonts.fontSize.lg,
    fontFamily: Fonts.fontFamily.regular,
    color: Colors.textPrimary,
    lineHeight: Fonts.fontSize.lg * Fonts.lineHeight.normal,
  },
  body: {
    fontSize: Fonts.fontSize.md,
    fontFamily: Fonts.fontFamily.regular,
    color: Colors.textPrimary,
    lineHeight: Fonts.fontSize.md * Fonts.lineHeight.normal,
  },
  bodySm: {
    fontSize: Fonts.fontSize.base,
    fontFamily: Fonts.fontFamily.regular,
    color: Colors.textSecondary,
  },
  caption: {
    fontSize: Fonts.fontSize.sm,
    fontFamily: Fonts.fontFamily.regular,
    color: Colors.textTertiary,
  },
  label: {
    fontSize: Fonts.fontSize.sm,
    fontFamily: Fonts.fontFamily.medium,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // Buttons
  btnPrimary: {
    backgroundColor: Colors.primary,
    borderRadius: radius.md,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimaryText: {
    color: Colors.textInverse,
    fontSize: 15,
    fontFamily: Fonts.fontFamily.semiBold,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: radius.md,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  btnOutlineText: {
    color: Colors.primary,
    fontSize: 15,
    fontFamily: Fonts.fontFamily.semiBold,
  },
  btnDanger: {
    backgroundColor: Colors.danger,
    borderRadius: radius.md,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  btnDangerText: {
    color: Colors.textInverse,
    fontSize: 15,
    fontFamily: Fonts.fontFamily.semiBold,
  },
  btnDisabled: {
    opacity: 0.5,
  },

  // Inputs
  input: {
    height: 44,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    fontSize: Fonts.fontSize.md,
    fontFamily: Fonts.fontFamily.regular,
    color: Colors.textPrimary,
  },
  inputFocused: {
    borderColor: Colors.borderFocus,
  },
  inputLabel: {
    fontSize: Fonts.fontSize.base,
    fontFamily: Fonts.fontFamily.medium,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  inputError: {
    borderColor: Colors.danger,
  },
  inputErrorText: {
    fontSize: Fonts.fontSize.sm,
    color: Colors.danger,
    marginTop: 4,
  },

  // Badges / pills
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillPrimary: {
    backgroundColor: Colors.primaryLight,
    borderWidth: 0,
  },
  pillSuccess: {
    backgroundColor: Colors.successLight,
    borderWidth: 0,
  },
  pillWarning: {
    backgroundColor: Colors.secondaryLight,
    borderWidth: 0,
  },
  pillDanger: {
    backgroundColor: Colors.dangerLight,
    borderWidth: 0,
  },
  pillText: {
    fontSize: Fonts.fontSize.sm,
    fontFamily: Fonts.fontFamily.medium,
  },
  pillTextPrimary: {
    color: Colors.primary,
  },
  pillTextSuccess: {
    color: Colors.successDark,
  },
  pillTextWarning: {
    color: Colors.secondaryDark,
  },
  pillTextDanger: {
    color: Colors.dangerDark,
  },

  // Dividers
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: spacing.md,
  },
  dividerSm: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: spacing.sm,
  },

  // Avatars
  avatarSm: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  avatarMd: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  avatarLg: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  avatarXl: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  // Tab bar
  tabBar: {
    backgroundColor: Colors.tabBarBackground,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 60,
    paddingBottom: 8,
  },

  // Trust score bar
  trustBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.border,
  },
  trustBarFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.amber,
  },
});

// Backward-compatibility text helpers
export const BOLD_TEXT = (size: number, color?: string) => ({
  fontFamily: Fonts.fontFamily.bold,
  fontSize: size,
  color: color || Colors.textPrimary,
});

export const REGULAR_TEXT = (size: number, color?: string) => ({
  fontFamily: Fonts.fontFamily.regular,
  fontSize: size,
  color: color || Colors.textPrimary,
});

export const MEDIUM_TEXT = (size: number, color?: string) => ({
  fontFamily: Fonts.fontFamily.medium,
  fontSize: size,
  color: color || Colors.textPrimary,
});

export const SEMIBOLD_TEXT = (size: number, color?: string) => ({
  fontFamily: Fonts.fontFamily.semiBold,
  fontSize: size,
  color: color || Colors.textPrimary,
});

