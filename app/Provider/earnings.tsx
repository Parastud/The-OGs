import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Bell,
  Building,
  Wrench,
  TrendingUp,
  BarChart3,
} from "lucide-react-native";

import { ScreenWrapper } from "@/src/components/wrapper";
import { FONTS } from "@/src/theme/fonts";
import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";
import { router } from "expo-router";

type WeeklyPoint = {
  label: string;
  amount: number;
};

type EarningsData = {
  thisMonth: number;
  growth: number;
  weeklyActivity?: WeeklyPoint[];
  maxWeeklyAmount?: number;
  transactions?: Array<{
    title: string;
    date: string;
    amount: string;
    status: string;
  }>;
  stats?: {
    totalJobs: number;
    averageEarning: number;
  };
};

export default function EarningsScreen() {
  const { getEarnings } = useProviderApi();
  const [earningsData, setEarningsData] = useState<EarningsData | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const loadEarnings = useCallback(async () => {
    setIsFetching(true);
    const data = await getEarnings();
    if (data) {
      setEarningsData(data);
    }
    setIsFetching(false);
  }, [getEarnings]);

  useEffect(() => {
    loadEarnings();
  }, [loadEarnings]);

  useFocusEffect(
    useCallback(() => {
      loadEarnings();
    }, [loadEarnings]),
  );

  const chartPoints = useMemo(() => {
    const points = earningsData?.weeklyActivity;
    if (!points || points.length !== 7) {
      return [
        { label: "M", amount: 0 },
        { label: "T", amount: 0 },
        { label: "W", amount: 0 },
        { label: "T", amount: 0 },
        { label: "F", amount: 0 },
        { label: "S", amount: 0 },
        { label: "S", amount: 0 },
      ];
    }

    return points;
  }, [earningsData?.weeklyActivity]);

  const maxAmount = useMemo(() => {
    const serverMax = Number(earningsData?.maxWeeklyAmount || 0);
    if (serverMax > 0) return serverMax;
    return Math.max(...chartPoints.map((item) => item.amount), 0);
  }, [chartPoints, earningsData?.maxWeeklyAmount]);

  const getBarHeight = (amount: number) => {
    if (maxAmount <= 0) return 20;
    const scaled = Math.round((amount / maxAmount) * 80);
    return Math.max(20, scaled);
  };

  return (
    <View style={styles.container}>
      <ScreenWrapper
        contentContainerStyle={styles.scrollContent}
        onRefresh={loadEarnings}
      >
        <LinearGradient
          colors={["#6D5DF6", "#8A6DFF", "#B088FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.brand}>Gigly</Text>
              <Text style={styles.headerSubtitle}>Earnings Overview</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.bellWrap}
                onPress={() => router.push("/Provider/NotificationsScreen")}
              >
                <Bell size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {isFetching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6D5DF6" />
          </View>
        ) : (
          <>
            <View style={styles.greetingWrapper}>
              <Text style={styles.greeting}>Your Earnings 💰</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.small}>This month</Text>
              <Text style={styles.amount}>
                ₹{earningsData?.thisMonth?.toLocaleString() || "0"}
              </Text>
              <View style={styles.badge}>
                <TrendingUp size={14} color="#6D5DF6" />
                <Text style={styles.badgeText}>
                  +{earningsData?.growth || 0}% vs last month
                </Text>
              </View>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Total Jobs</Text>
                <Text style={styles.statValue}>
                  {earningsData?.stats?.totalJobs || 0}
                </Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Avg Earning</Text>
                <Text style={styles.statValue}>
                  ₹{earningsData?.stats?.averageEarning || 0}
                </Text>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <BarChart3 size={18} color="#6D5DF6" />
                <Text style={styles.sectionTitle}>Weekly Activity</Text>
              </View>
              <View style={styles.chart}>
                {chartPoints.map((point, index) => (
                  <View
                    key={`bar-${index}`}
                    style={[
                      point.amount > 0 ? styles.barActive : styles.bar,
                      { height: getBarHeight(point.amount) },
                    ]}
                  />
                ))}
              </View>
              <View style={styles.days}>
                {chartPoints.map((point, index) => (
                  <Text key={`label-${index}`} style={styles.dayLabel}>
                    {point.label}
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.transactionSection}>
              <Text style={styles.sectionTitleLabel}>Recent Transactions</Text>
              {earningsData?.transactions &&
              earningsData.transactions.length > 0 ? (
                earningsData.transactions.map((item, idx) => (
                  <View key={idx} style={styles.transaction}>
                    <View style={styles.transactionIcon}>
                      {item.status === "CREDITED" ? (
                        <Wrench size={20} color="#6D5DF6" />
                      ) : (
                        <Building size={20} color="#F59E0B" />
                      )}
                    </View>

                    <View style={styles.transactionInfo}>
                      <Text style={styles.transactionTitle}>{item.title}</Text>
                      <Text style={styles.transactionDate}>{item.date}</Text>
                    </View>

                    <View style={styles.transactionAmount}>
                      <Text
                        style={[
                          styles.transactionAmountText,
                          item.status === "CREDITED" && { color: "#10B981" },
                        ]}
                      >
                        {item.amount}
                      </Text>
                      <Text style={styles.transactionStatus}>
                        {item.status}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyTransactions}>
                  No transactions yet.
                </Text>
              )}
            </View>
          </>
        )}
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    height: 170,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 65,
    paddingHorizontal: 20,
    shadowColor: "#6D5DF6",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
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
  headerSubtitle: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: "#E2E8F0",
    marginTop: 4,
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
  greetingWrapper: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  greeting: {
    fontSize: 22,
    fontFamily: FONTS.BOLD,
    color: "#1F2937",
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  small: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: "#6B7280",
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontFamily: FONTS.BOLD,
    color: "#6D5DF6",
    marginBottom: 16,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#ECEBFF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 13,
    fontFamily: FONTS.SEMIBOLD,
    color: "#6D5DF6",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statLabel: {
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 8,
    fontFamily: FONTS.REGULAR,
  },
  statValue: {
    fontSize: 22,
    fontFamily: FONTS.BOLD,
    color: "#1F2937",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: FONTS.SEMIBOLD,
    color: "#1F2937",
  },
  sectionTitleLabel: {
    fontSize: 18,
    fontFamily: FONTS.SEMIBOLD,
    color: "#1F2937",
    marginBottom: 16,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 120,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  bar: {
    width: 24,
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
  },
  barActive: {
    width: 24,
    backgroundColor: "#6D5DF6",
    borderRadius: 6,
  },
  days: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  dayLabel: {
    fontSize: 13,
    fontFamily: FONTS.REGULAR,
    color: "#9CA3AF",
    width: 24,
    textAlign: "center",
  },
  transactionSection: {
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 20,
  },
  transaction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  transactionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 15,
    fontFamily: FONTS.SEMIBOLD,
    color: "#1F2937",
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 13,
    fontFamily: FONTS.REGULAR,
    color: "#6B7280",
  },
  transactionAmount: {
    alignItems: "flex-end",
  },
  transactionAmountText: {
    fontSize: 16,
    fontFamily: FONTS.BOLD,
    color: "#1F2937",
    marginBottom: 4,
  },
  transactionStatus: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: "#9CA3AF",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTransactions: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: "#9CA3AF",
  },
});
