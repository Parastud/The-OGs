import {
  Quantico_400Regular,
  Quantico_700Bold,
  useFonts,
} from "@expo-google-fonts/quantico";

export const Fonts = {
  fontFamily: {
    regular: "Quantico_400Regular",
    medium: "Quantico_400Regular", // Quantico doesn't have 500
    semiBold: "Quantico_700Bold",  // closest match
    bold: "Quantico_700Bold",
  },

  fontSize: {
    xs: 11,
    sm: 12,
    base: 13,
    md: 14,
    lg: 16,
    xl: 18,
    "2xl": 20,
    "3xl": 24,
    "4xl": 28,
    "5xl": 32,
  },

  lineHeight: {
    tight: 1.3,
    normal: 1.5,
    relaxed: 1.7,
  },

  fontWeight: {
    regular: "400" as const,
    medium: "400" as const,
    semiBold: "700" as const,
    bold: "700" as const,
  },
};

export const useAppFonts = () => {
  return useFonts({
    Quantico_400Regular,
    Quantico_700Bold,
  });
};

export const FONTS = {
  REGULAR: Fonts.fontFamily.regular,
  MEDIUM: Fonts.fontFamily.medium,
  SEMIBOLD: Fonts.fontFamily.semiBold,
  BOLD: Fonts.fontFamily.bold,
};