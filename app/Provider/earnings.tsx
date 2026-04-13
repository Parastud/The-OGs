import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";

import { Bell, Building, Wrench } from "lucide-react-native";

import { ScreenWrapper } from "@/src/components/wrapper";
import { COLORS } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";
import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";

export default function EarningsScreen() {
  const { getEarnings, isLoading } = useProviderApi();
  const [earningsData, setEarningsData] = useState<any>(null);

  useEffect(() => {
    const loadEarnings = async () => {
      const data = await getEarnings();
      if (data) {
        setEarningsData(data);
      }
    };

    loadEarnings();
  }, [getEarnings]);

  if (!earningsData) {
    return (
      <ScreenWrapper
        safeArea
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.brand}>Gigly</Text>
          <Text style={styles.title}>Earnings</Text>
          <Bell size={22} color={COLORS.textPrimary} />
        </View>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : null}
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper
      safeArea
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.brand}>Gigly</Text>
        <Text style={styles.title}>Earnings</Text>
        <Bell size={22} color={COLORS.textPrimary} />
      </View>

      <View style={styles.card}>
        <Text style={styles.small}>This month</Text>
        <Text style={styles.amount}>
          ₹{earningsData?.thisMonth?.toLocaleString()}
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            +{earningsData?.growth}% vs last month
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Weekly Activity</Text>
        <View style={styles.chart}>
          <View style={[styles.bar, { height: 30 }]} />
          <View style={[styles.bar, { height: 45 }]} />
          <View style={[styles.barActive, { height: 70 }]} />
          <View style={[styles.bar, { height: 40 }]} />
          <View style={[styles.barActive, { height: 80 }]} />
          <View style={[styles.bar, { height: 30 }]} />
          <View style={[styles.bar, { height: 45 }]} />
        </View>
        <View style={styles.days}>
          <Text style={styles.dayLabel}>M</Text>
          <Text style={styles.dayLabel}>T</Text>
          <Text style={styles.dayLabel}>W</Text>
          <Text style={styles.dayLabel}>T</Text>
          <Text style={styles.dayLabel}>F</Text>
          <Text style={styles.dayLabel}>S</Text>
          <Text style={styles.dayLabel}>S</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>JOBS</Text>
          <Text style={styles.statValue}>{earningsData?.stats?.totalJobs}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>AVG</Text>
          <Text style={styles.statValue}>
            ₹{earningsData?.stats?.averageEarning}
          </Text>
        </View>
      </View>

      <View style={styles.transactionSection}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {earningsData?.transactions?.map((item: any, idx: number) => (
          <View key={idx} style={styles.transaction}>
            <View style={styles.transactionIcon}>
              {item.status === "CREDITED" ? (
                <Wrench size={18} color={COLORS.primary} />
              ) : (
                <Building size={18} color={COLORS.secondary} />
              )}
            </View>

            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>{item.title}</Text>
              <Text style={styles.transactionDate}>{item.date}</Text>
            </View>

            <View style={styles.transactionAmount}>
              <Text
                style={[
                  styles.amount,
                  item.status === "CREDITED" && { color: COLORS.success },
                ]}
              >
                {item.amount}
              </Text>
              <Text style={styles.transactionStatus}>{item.status}</Text>
            </View>
          </View>
        ))}
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  brand: {
    fontSize: 18,
    fontFamily: FONTS.BOLD,
    color: COLORS.textPrimary,
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textPrimary,
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  small: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  amount: {
    fontSize: 28,
    fontFamily: FONTS.BOLD,
    color: COLORS.primary,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 12,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.success,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: 100,
    marginBottom: 16,
  },
  bar: {
    width: 28,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  barActive: {
    width: 28,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  days: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayLabel: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
    width: 28,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginVertical: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  statTitle: {
    fontSize: 11,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontFamily: FONTS.BOLD,
    color: COLORS.primary,
  },
  transactionSection: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  transaction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 13,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 11,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },
  transactionAmount: {
    alignItems: "flex-end",
  },
  transactionStatus: {
    fontSize: 10,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
});
