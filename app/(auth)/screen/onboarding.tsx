import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../src/theme/colors";
import { Fonts } from "../../../src/theme/fonts";
import { GlobalStyles, spacing, radius } from "../../../src/theme/styles.global";
import { GiglyIcon } from "../../../src/theme/icons";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={GlobalStyles.row}>
          <GiglyIcon name="aiSpark" color={Colors.primary} size={24} />
          <Text style={styles.logoText}>Gigly</Text>
        </View>
        <Pressable hitSlop={10}>
          <Text style={styles.skipButton}>SKIP</Text>
        </Pressable>
      </View>

      {/* Top 60% Illustration Section */}
      <View style={styles.illustrationContainer}>
        {/* Abstract Background Blurs */}
        <View style={[styles.glowRing, styles.glowPrimary]} />
        <View style={[styles.glowRing, styles.glowSecondary]} />

        {/* Mockup Phone */}
        <View style={styles.mockupPhone}>
          <View style={styles.mockupContent}>
            {/* Mockup Header */}
            <View style={styles.mockupHeaderBar} />

            {/* Job Card Simulation */}
            <View style={styles.mockupJobCard}>
              <View style={styles.mockupJobCardHeader}>
                <View style={styles.mockupJobCardLine1} />
                <GiglyIcon
                  name="aiSpark"
                  color={Colors.secondaryLight}
                  size={16}
                />
              </View>
              <View style={[GlobalStyles.row, { gap: 4 }]}>
                <GiglyIcon
                  name="location"
                  color={"rgba(255,255,255,0.7)"}
                  size={12}
                />
                <View style={styles.mockupJobCardLine2} />
              </View>
            </View>

            {/* List Items */}
            <View style={styles.mockupList}>
              <View style={styles.mockupListItem}>
                <View
                  style={[
                    styles.mockupIconBox,
                    { backgroundColor: Colors.secondaryLight },
                  ]}
                >
                  <GiglyIcon
                    name="provider"
                    color={Colors.secondary}
                    size={18}
                  />
                </View>
                <View style={styles.mockupListLines}>
                  <View style={styles.mockupListLineLarge} />
                  <View style={styles.mockupListLineSmall} />
                </View>
              </View>

              <View style={styles.mockupListItem}>
                <View
                  style={[
                    styles.mockupIconBox,
                    { backgroundColor: Colors.successLight },
                  ]}
                >
                  <Ionicons name="school" color={Colors.success} size={18} />
                </View>
                <View style={styles.mockupListLines}>
                  <View
                    style={[styles.mockupListLineLarge, { width: "60%" }]}
                  />
                  <View
                    style={[styles.mockupListLineSmall, { width: "30%" }]}
                  />
                </View>
              </View>
            </View>

            {/* FAB */}
            <View style={styles.mockupFabContainer}>
              <LinearGradient
                colors={["#3525cd", "#4f46e5"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.mockupFab}
              >
                <GiglyIcon name="add" color={Colors.surface} size={24} />
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Floating Badges */}
        <View style={styles.floatingPin}>
          <Ionicons
            name="pin"
            color={Colors.surface}
            size={28}
            style={{ transform: [{ rotate: "-45deg" }] }}
          />
        </View>

        <View style={styles.floatingBidLabel}>
          <Text style={styles.floatingBidSubtitle}>BIDS</Text>
          <Text style={styles.floatingBidTitle}>12+</Text>
        </View>
      </View>

      {/* Bottom 40% Content */}
      <View style={styles.contentSection}>
        <Text style={styles.title}>Post any task in seconds</Text>
        <Text style={styles.subtitle}>
          From plumbing to tutoring — describe what you need and get bids fast
        </Text>

        {/* DOTS */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={[styles.dot, styles.dotInactive]} />
          <View style={[styles.dot, styles.dotInactive]} />
        </View>

        {/* Primary Action Button */}
        <Pressable
          style={({ pressed }) => [
            styles.nextButtonWrapper,
            { transform: [{ scale: pressed ? 0.95 : 1 }] },
          ]}
        >
          <LinearGradient
            colors={["#3525cd", "#4f46e5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.nextButton}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.surface} />
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceSecondary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing["2xl"],
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    zIndex: 50,
  },
  logoText: {
    fontFamily: Fonts.fontFamily.bold,
    fontSize: Fonts.fontSize["2xl"],
    color: Colors.primary,
    marginLeft: spacing.xs,
    letterSpacing: -0.5,
  },
  skipButton: {
    fontFamily: Fonts.fontFamily.semiBold,
    fontSize: Fonts.fontSize.sm,
    color: Colors.textTertiary,
    letterSpacing: 0.5,
  },
  illustrationContainer: {
    flex: 6, // 60% of vertical space
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  // Abstract background blurs (simplified for RN)
  glowRing: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.15,
  },
  glowPrimary: {
    width: 300,
    height: 300,
    backgroundColor: Colors.primary,
    top: "10%",
    left: -80,
  },
  glowSecondary: {
    width: 350,
    height: 350,
    backgroundColor: Colors.secondary,
    bottom: "5%",
    right: -100,
  },
  // Mockup phone shape
  mockupPhone: {
    width: width * 0.65,
    aspectRatio: 9 / 16,
    backgroundColor: Colors.surface,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: "rgba(0,0,0,0.03)",
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 15,
    overflow: "hidden",
    zIndex: 10,
  },
  mockupContent: {
    flex: 1,
    padding: spacing.lg,
  },
  mockupHeaderBar: {
    width: "50%",
    height: 16,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: radius.full,
    marginBottom: spacing.lg,
  },
  mockupJobCard: {
    backgroundColor: Colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  mockupJobCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.xl,
  },
  mockupJobCardLine1: {
    width: "65%",
    height: 14,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: radius.full,
  },
  mockupJobCardLine2: {
    width: "35%",
    height: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: radius.full,
  },
  mockupList: {
    marginTop: spacing.xl,
    gap: spacing.lg,
  },
  mockupListItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surfaceSecondary,
    padding: spacing.md,
    borderRadius: radius.lg,
    gap: spacing.md,
  },
  mockupIconBox: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  mockupListLines: {
    flex: 1,
    gap: 8,
  },
  mockupListLineLarge: {
    width: "75%",
    height: 10,
    backgroundColor: Colors.border,
    borderRadius: radius.full,
  },
  mockupListLineSmall: {
    width: "45%",
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: radius.full,
    opacity: 0.5,
  },
  mockupFabContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: spacing.md,
  },
  mockupFab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  // Floating Decor
  floatingPin: {
    position: "absolute",
    top: "25%",
    right: "12%",
    width: 58,
    height: 58,
    backgroundColor: Colors.secondary,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "12deg" }],
    zIndex: 20,
    shadowColor: Colors.secondaryDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  floatingBidLabel: {
    position: "absolute",
    bottom: "22%",
    left: "8%",
    backgroundColor: "rgba(255,255,255,0.85)",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
  },
  floatingBidSubtitle: {
    fontSize: 10,
    fontFamily: Fonts.fontFamily.bold,
    color: Colors.secondaryDark,
  },
  floatingBidTitle: {
    fontSize: Fonts.fontSize.xl,
    fontFamily: Fonts.fontFamily.bold,
    color: Colors.primary,
    marginTop: -2,
  },

  // Content
  contentSection: {
    flex: 4, // 40% of vertical space
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: spacing["2xl"],
    paddingTop: 48,
    paddingBottom: 48,
    alignItems: "center",
  },
  title: {
    fontFamily: Fonts.fontFamily.bold,
    fontSize: 28,
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: spacing.lg,
    lineHeight: 34,
  },
  subtitle: {
    fontFamily: Fonts.fontFamily.regular,
    fontSize: Fonts.fontSize.lg,
    color: Colors.textSecondary,
    textAlign: "center",
    maxWidth: 280,
    lineHeight: 24,
    marginBottom: 40,
  },
  pagination: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: Colors.primary,
  },
  dotInactive: {
    backgroundColor: "#E2E2E2", // surface-variant mapping
  },
  nextButtonWrapper: {
    width: "100%",
    maxWidth: 320,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: radius.xl,
    gap: spacing.sm,
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  nextButtonText: {
    color: Colors.surface,
    fontFamily: Fonts.fontFamily.semiBold,
    fontSize: Fonts.fontSize.xl,
  },
});
