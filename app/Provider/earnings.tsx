import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import {
    Bell,
    Building,
    Wallet,
    Wrench,
    Zap
} from "lucide-react-native";

import { ScreenWrapper } from "@/src/components/wrapper";
import { COLORS, Radius, Shadows, Spacing } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";

const transactions = [
    {
        title: "Deep Kitchen Cleaning",
        date: "Completed Oct 24, 2023",
        amount: "₹1,200",
        status: "CREDITED",
        icon: <Wrench size={18} color={COLORS.primary} />
    },
    {
        title: "Pipe Leakage Fix",
        date: "Completed Oct 22, 2023",
        amount: "₹450",
        status: "CREDITED",
        icon: <Wrench size={18} color={COLORS.primary} />
    },
    {
        title: "Withdrawal to HDFC bank",
        date: "Oct 20, 2023",
        amount: "-₹5,000",
        status: "PROCESSED",
        icon: <Building size={18} color={COLORS.secondary} />
    },
    {
        title: "AC Maintenance",
        date: "Completed Oct 18, 2023",
        amount: "₹850",
        status: "CREDITED",
        icon: <Zap size={18} color={COLORS.primary} />
    }
];

export default function EarningsScreen() {
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
                <Text style={styles.amount}>₹8,400</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>+23% vs last month</Text>
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
                    <Text style={styles.statValue}>12</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statTitle}>AVG</Text>
                    <Text style={styles.statBlue}>₹700</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statTitle}>PENDING</Text>
                    <Text style={styles.statOrange}>₹1,200</Text>
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.withdrawHeader}>
                    <Wallet size={20} color={COLORS.primary} />
                    <Text style={styles.sectionTitle}>Available to withdraw</Text>
                </View>

                <Text style={styles.withdrawAmount}>₹7,200</Text>

                <TouchableOpacity style={styles.withdrawBtn}>
                    <Text style={styles.withdrawText}>Withdraw to bank</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Transaction history</Text>
                <Text style={styles.filter}>Filter</Text>
            </View>

            {transactions.map((item, index) => (
                <View key={index} style={styles.transaction}>
                    <View style={styles.iconCircle}>{item.icon}</View>

                    <View style={styles.transactionInfo}>
                        <Text style={styles.transTitle}>{item.title}</Text>
                        <Text style={styles.transDate}>{item.date}</Text>
                    </View>

                    <View>
                        <Text style={styles.transAmount}>{item.amount}</Text>
                        <Text style={styles.status}>{item.status}</Text>
                    </View>
                </View>
            ))}
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    scrollContent: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        paddingBottom: Spacing.xl
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.base
    },
    brand: {
        fontFamily: FONTS.BOLD,
        fontSize: 18,
        color: COLORS.primary
    },
    title: {
        fontFamily: FONTS.SEMIBOLD,
        fontSize: 18,
        color: COLORS.textPrimary
    },
    card: {
        backgroundColor: COLORS.surface,
        marginHorizontal: Spacing.lg,
        padding: Spacing.lg,
        borderRadius: Radius.xl,
        marginBottom: Spacing.base,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...Shadows.sm
    },
    small: {
        fontFamily: FONTS.REGULAR,
        fontSize: 13,
        color: COLORS.textSecondary
    },
    amount: {
        fontFamily: FONTS.BOLD,
        fontSize: 30,
        color: COLORS.primary,
        marginTop: 6
    },
    badge: {
        backgroundColor: COLORS.successLight,
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: Radius.full,
        marginTop: 10
    },
    badgeText: {
        fontFamily: FONTS.MEDIUM,
        fontSize: 12,
        color: COLORS.successDark
    },
    sectionTitle: {
        fontFamily: FONTS.SEMIBOLD,
        fontSize: 16,
        color: COLORS.textPrimary
    },
    chart: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginTop: Spacing.base
    },
    bar: {
        width: 18,
        backgroundColor: COLORS.neutral200,
        borderRadius: Radius.sm
    },
    barActive: {
        width: 18,
        backgroundColor: COLORS.primary,
        borderRadius: Radius.sm
    },
    days: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: Spacing.sm
    },
    dayLabel: {
        fontFamily: FONTS.REGULAR,
        fontSize: 12,
        color: COLORS.textSecondary
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.base
    },
    statCard: {
        backgroundColor: COLORS.surface,
        padding: Spacing.base,
        borderRadius: Radius.lg,
        width: "30%",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
        ...Shadows.sm
    },
    statTitle: {
        fontFamily: FONTS.MEDIUM,
        fontSize: 11,
        color: COLORS.textSecondary
    },
    statValue: {
        fontFamily: FONTS.BOLD,
        fontSize: 18,
        color: COLORS.textPrimary
    },
    statBlue: {
        fontFamily: FONTS.BOLD,
        fontSize: 18,
        color: COLORS.primary
    },
    statOrange: {
        fontFamily: FONTS.BOLD,
        fontSize: 18,
        color: COLORS.warningDark
    },
    withdrawHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.sm
    },
    withdrawAmount: {
        fontFamily: FONTS.BOLD,
        fontSize: 26,
        color: COLORS.textPrimary,
        marginTop: Spacing.sm
    },
    withdrawBtn: {
        backgroundColor: COLORS.primary,
        padding: 14,
        borderRadius: Radius.md,
        marginTop: Spacing.md,
        alignItems: "center"
    },
    withdrawText: {
        fontFamily: FONTS.SEMIBOLD,
        fontSize: 14,
        color: COLORS.textInverse
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.base
    },
    filter: {
        fontFamily: FONTS.MEDIUM,
        fontSize: 13,
        color: COLORS.primary
    },
    transaction: {
        backgroundColor: COLORS.surface,
        marginHorizontal: Spacing.lg,
        padding: 14,
        borderRadius: Radius.lg,
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.md,
        marginBottom: Spacing.sm,
        borderWidth: 1,
        borderColor: COLORS.border
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: Radius.full,
        backgroundColor: COLORS.surfaceSecondary,
        alignItems: "center",
        justifyContent: "center"
    },
    transactionInfo: {
        flex: 1
    },
    transTitle: {
        fontFamily: FONTS.SEMIBOLD,
        fontSize: 14,
        color: COLORS.textPrimary
    },
    transDate: {
        fontFamily: FONTS.REGULAR,
        color: COLORS.textSecondary,
        fontSize: 12
    },
    transAmount: {
        fontFamily: FONTS.SEMIBOLD,
        fontSize: 14,
        color: COLORS.textPrimary,
        textAlign: "right"
    },
    status: {
        fontFamily: FONTS.MEDIUM,
        fontSize: 11,
        color: COLORS.success,
        textAlign: "right"
    }
});