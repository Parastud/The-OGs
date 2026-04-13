import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";

import { ScreenWrapper } from "@/src/components/wrapper";
import { COLORS, Radius } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";
import { Bell, CheckCircle2, Clock, MapPin, Star } from "lucide-react-native";
import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";

export default function HomeScreen() {
  const { getDashboard } = useProviderApi();
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      const data = await getDashboard();
      if (data) {
        setDashboardData(data);
      }
    };

    loadDashboard();
  }, []);

  if (!dashboardData) {
    return (
      <ScreenWrapper safeArea style={styles.container}>
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper
      safeArea
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>Gigly</Text>
          <View style={styles.locationRow}>
            <MapPin size={14} color={COLORS.textSecondary} />
            <Text style={styles.location}>Mathura, UP</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.bellWrap}>
            <Bell size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Greeting */}
      <View style={styles.greeting}>
        <Text style={styles.greetingTitle}>{dashboardData?.greeting}</Text>
        <Text style={styles.subtitle}>
          You have{" "}
          <Text style={styles.highlight}>
            {dashboardData?.matchedJobs?.length || 0} new job matches
          </Text>
        </Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>TOTAL EARNED</Text>
          <Text style={[styles.statValue, { color: COLORS.primary }]}>
            ₹{dashboardData?.stats?.totalEarned?.toLocaleString()}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>JOBS DONE</Text>
          <Text style={[styles.statValue, { color: COLORS.success }]}>
            {dashboardData?.stats?.jobsDone}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>COMPLETION</Text>
          <Text style={[styles.statValue, { color: COLORS.success }]}>
            {dashboardData?.stats?.completion}%
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>ACTIVE GIGS</Text>
          <Text style={[styles.statValue, { color: COLORS.secondary }]}>
            {dashboardData?.stats?.activeGigs?.toString().padStart(2, "0")}
          </Text>
        </View>
      </View>

      {/* Trust Score */}
      <View style={styles.trustCard}>
        <View style={styles.trustHeader}>
          <Star size={18} color={COLORS.starFilled} />
          <Text style={styles.trustTitle}>Trust Score</Text>
          <Text style={styles.trustScore}>
            {dashboardData?.trustScore?.score}/100
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${dashboardData?.trustScore?.score}%` },
            ]}
          />
        </View>
        <View style={styles.badgesRow}>
          {dashboardData?.trustScore?.badges?.map(
            (badge: string, idx: number) => (
              <View key={idx} style={styles.badge}>
                {idx === 0 ? (
                  <Clock size={13} color={COLORS.success} />
                ) : (
                  <CheckCircle2 size={13} color={COLORS.success} />
                )}
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ),
          )}
        </View>
      </View>

      {/* Job Matches */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Matched jobs for you</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      {dashboardData?.matchedJobs?.map((item: any) => (
        <View key={item.id} style={styles.jobCard}>
          <View style={styles.jobTop}>
            <Image source={{ uri: item.imageUrl }} style={styles.jobImage} />
            <View style={styles.jobContent}>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <View style={styles.jobMeta}>
                <MapPin size={12} color={COLORS.textSecondary} />
                <Text style={styles.jobDistance}>{item.distance}</Text>
              </View>
            </View>
          </View>
          <View style={styles.jobFooter}>
            <Text style={styles.jobPrice}>{item.price}</Text>
            <View style={[styles.matchBadge, { backgroundColor: "#E8F5E9" }]}>
              <Text style={[styles.matchText, { color: COLORS.success }]}>
                {item.match} match
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ScreenWrapper>
  );
}

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  brand: {
    fontSize: 20,
    fontFamily: FONTS.BOLD,
    color: COLORS.textPrimary,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  location: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bellWrap: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  greetingTitle: {
    fontSize: 20,
    fontFamily: FONTS.BOLD,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },
  highlight: {
    color: COLORS.primary,
    fontFamily: FONTS.SEMIBOLD,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: "48%",
    backgroundColor: COLORS.surface,
    borderRadius: Radius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontFamily: FONTS.BOLD,
  },
  trustCard: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: COLORS.surface,
    borderRadius: Radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  trustHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  trustTitle: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textPrimary,
  },
  trustScore: {
    fontSize: 16,
    fontFamily: FONTS.BOLD,
    color: COLORS.primary,
  },
  progressTrack: {
    height: 6,
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
  },
  badgesRow: {
    flexDirection: "row",
    gap: 12,
  },
  badge: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: Radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textPrimary,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textPrimary,
  },
  viewAll: {
    fontSize: 12,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.primary,
  },
  jobCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: COLORS.surface,
    borderRadius: Radius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  jobTop: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  jobImage: {
    width: 80,
    height: 80,
    borderRadius: Radius.sm,
  },
  jobContent: {
    flex: 1,
    justifyContent: "center",
  },
  jobTitle: {
    fontSize: 14,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  jobMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  jobDistance: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },
  jobFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobPrice: {
    fontSize: 13,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.primary,
  },
  matchBadge: {
    borderRadius: Radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  matchText: {
    fontSize: 11,
    fontFamily: FONTS.SEMIBOLD,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 50,
  },
});
