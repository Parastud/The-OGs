import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

export const Fonts = {
  fontFamily: {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    semiBold: "Inter_600SemiBold",
    bold: "Inter_700Bold",
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
    medium: "500" as const,
    semiBold: "600" as const,
    bold: "700" as const,
  },
};

export const useAppFonts = () => {
  return useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
};

export const FONTS = {
  REGULAR: Fonts.fontFamily.regular,
  MEDIUM: Fonts.fontFamily.medium,
  SEMIBOLD: Fonts.fontFamily.semiBold,
  BOLD: Fonts.fontFamily.bold,
};
