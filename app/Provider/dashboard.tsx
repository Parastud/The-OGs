import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { ScreenWrapper } from "@/src/components/wrapper";
import { COLORS } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";

import {
  Bell,
  MapPin,
  Star,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react-native";

import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";

export default function Dashboard() {
  const { getDashboard } = useProviderApi();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboard = useCallback(
    async (isRefresh = false) => {
      if (!isRefresh) setIsLoading(true);

      try {
        const data = await getDashboard();
        if (data) {
          setDashboardData(data);
        }
      } catch {
        console.error("Failed to load dashboard");
      } finally {
        setIsLoading(false);
      }
    },
    [getDashboard],
  );

  useFocusEffect(
    useCallback(() => {
      loadDashboard();
    }, [loadDashboard]),
  );

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <ScreenWrapper
      contentContainerStyle={{ paddingBottom: 120 }}
      onRefresh={() => loadDashboard(true)}
    >
      {/* Gradient Header */}
      <LinearGradient
        colors={["#6D5DF6", "#8A6DFF", "#B088FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.brand}>Gigly</Text>

            <View style={styles.locationRow}>
              <MapPin size={14} color="#fff" />
              <Text style={styles.location}>Mathura, UP</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.bellWrap}>
              <Bell size={20} color="#000" />
            </View>

            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={styles.avatar}
            />
          </View>
        </View>
      </LinearGradient>

      {/* Greeting */}
      <View style={styles.greetingWrapper}>
        <Text style={styles.greeting}>{dashboardData?.greeting}</Text>

        <View style={styles.matchBadge}>
          <Text style={styles.matchText}>
            {dashboardData?.matchedJobs?.length} new job matches
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsGrid}>
        <StatCard
          label="Earned"
          value={`₹${dashboardData?.stats?.totalEarned?.toLocaleString("en-IN") || 0}`}
        />
        <StatCard
          label="Jobs Done"
          value={`${dashboardData?.stats?.jobsDone || 0}`}
        />
        <StatCard
          label="Completion"
          value={`${dashboardData?.stats?.completion || 0}%`}
        />
        <StatCard
          label="Active Gigs"
          value={`${String(dashboardData?.stats?.activeGigs || 0).padStart(2, "0")}`}
        />
      </View>

      {/* Trust Score */}
      <View style={styles.trustCard}>
        <View style={styles.trustHeader}>
          <Star size={18} color="#F59E0B" />
          <Text style={styles.trustTitle}>Trust Score</Text>
          <Text style={styles.trustScore}>
            {dashboardData?.trustScore?.score || 92}/100
          </Text>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${dashboardData?.trustScore?.score || 92}%` },
            ]}
          />
        </View>

        <View style={styles.badgesRow}>
          {dashboardData?.trustScore?.badges?.map(
            (badge: string, idx: number) => (
              <Badge key={idx} icon={<CheckCircle2 size={14} />} text={badge} />
            ),
          )}
        </View>
      </View>

      {/* AI Smart Matches */}
      <View style={styles.aiCard}>
        <View style={styles.aiHeader}>
          <Zap size={18} color={COLORS.primary} />
          <Text style={styles.aiTitle}>AI Smart Matches</Text>
        </View>

        <Text style={styles.aiPercent}>92% Match</Text>

        <View style={styles.aiRow}>
          <Badge icon={<CheckCircle2 size={14} />} text="Nearby Jobs" />
          <Badge icon={<CheckCircle2 size={14} />} text="Suggested Bid" />
        </View>
      </View>

      {/* Weekly Performance */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Weekly Performance</Text>

        <View style={styles.performanceRow}>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>
              {dashboardData?.weeklyPerformance?.jobs || 0}
            </Text>
            <Text style={styles.performanceLabel}>Jobs</Text>
          </View>

          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>
              ₹
              {dashboardData?.weeklyPerformance?.earned?.toLocaleString(
                "en-IN",
              ) || 0}
            </Text>
            <Text style={styles.performanceLabel}>Earned</Text>
          </View>

          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>
              {dashboardData?.weeklyPerformance?.rating || 0}
            </Text>
            <Text style={styles.performanceLabel}>Rating</Text>
          </View>
        </View>
      </View>

      {/* Active Jobs */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Active Jobs</Text>

        {dashboardData?.activeJobs && dashboardData.activeJobs.length > 0 ? (
          dashboardData.activeJobs.map((job: any) => (
            <View key={job.id} style={styles.jobRow}>
              <Text style={styles.jobName}>{job.title}</Text>
              <Text style={styles.jobStatus}>{job.status}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.jobName}>No active jobs</Text>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionRow}>
          <View style={styles.actionButton}>
            <Text style={styles.actionText}>Browse Jobs</Text>
          </View>

          <View style={styles.actionButton}>
            <Text style={styles.actionText}>Withdraw</Text>
          </View>

          <View style={styles.actionButton}>
            <Text style={styles.actionText}>Profile</Text>
          </View>
        </View>
      </View>

      {/* Reviews */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Top Reviews</Text>

        <View style={styles.reviewBox}>
          <Text style={styles.reviewText}>
            "Excellent service. Very professional."
          </Text>
          <Text style={styles.reviewUser}>— Rahul</Text>
        </View>
      </View>
      <View style={{ height: 80 }} />
    </ScreenWrapper>
  );
}

const StatCard = ({ label, value }: any) => (
  <View style={styles.statCard}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const Badge = ({ icon, text }: any) => (
  <View style={styles.badge}>
    {icon}
    <Text style={styles.badgeText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 180, // was 160
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  brand: {
    fontSize: 28,
    fontFamily: FONTS.BOLD,
    color: "#fff",
  },

  locationRow: {
    flexDirection: "row",
    gap: 6,
  },

  location: {
    color: "#fff",
  },

  headerRight: {
    flexDirection: "row",
    gap: 10,
  },

  bellWrap: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 14,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  greetingWrapper: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },

  greeting: {
    fontSize: 22,
    fontFamily: FONTS.BOLD,
  },

  matchBadge: {
    backgroundColor: "#ECEBFF",
    padding: 8,
    borderRadius: 14,
    marginTop: 8,
    alignSelf: "flex-start",
  },

  matchText: {
    color: "#6D5DF6",
    fontFamily: FONTS.SEMIBOLD,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 20,
  },

  statCard: {
    width: "47%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  statLabel: {
    color: "#888",
  },

  statValue: {
    fontSize: 20,
    fontFamily: FONTS.BOLD,
  },

  trustCard: {
    margin: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  trustHeader: {
    flexDirection: "row",
    gap: 6,
  },

  trustTitle: {
    flex: 1,
  },

  trustScore: {
    color: "#6D5DF6",
    fontFamily: FONTS.BOLD,
  },

  progressTrack: {
    height: 6,
    backgroundColor: "#eee",
    marginVertical: 10,
    borderRadius: 6,
  },

  progressFill: {
    height: 6,
    backgroundColor: "#6D5DF6",
    borderRadius: 6,
  },

  badgesRow: {
    flexDirection: "row",
    gap: 10,
  },

  badge: {
    flexDirection: "row",
    gap: 6,
    backgroundColor: "#F5F5F5",
    padding: 8,
    borderRadius: 12,
  },

  badgeText: {},

  aiCard: {
    margin: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  aiHeader: {
    flexDirection: "row",
    gap: 6,
  },

  aiTitle: {
    fontFamily: FONTS.SEMIBOLD,
  },

  aiPercent: {
    fontSize: 24,
    fontFamily: FONTS.BOLD,
    marginVertical: 8,
  },

  aiRow: {
    flexDirection: "row",
    gap: 10,
  },

  sectionCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.SEMIBOLD,
    marginBottom: 12,
  },

  performanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  performanceItem: {
    alignItems: "center",
  },

  performanceValue: {
    fontSize: 18,
    fontFamily: FONTS.BOLD,
  },

  performanceLabel: {
    fontSize: 12,
    color: "#888",
  },

  jobRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  jobName: {
    fontFamily: FONTS.SEMIBOLD,
  },

  jobStatus: {
    color: COLORS.primary,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  actionButton: {
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 12,
  },

  actionText: {
    fontFamily: FONTS.SEMIBOLD,
  },

  reviewBox: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 12,
  },

  reviewText: {
    marginBottom: 6,
  },

  reviewUser: {
    color: "#888",
  },
});
