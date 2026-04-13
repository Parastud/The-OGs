import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { ScreenWrapper } from "@/src/components/wrapper";
import { COLORS, Radius, Shadows, Spacing } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";
import { Bell, CheckCircle2, Clock, MapPin, Star } from "lucide-react-native";

export default function HomeScreen() {
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
                    <Text style={styles.greetingTitle}>Good morning, Rahul 👋</Text>
                    <Text style={styles.subtitle}>
                        You have{" "}
                        <Text style={styles.highlight}>3 new job matches</Text>
                    </Text>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>TOTAL EARNED</Text>
                        <Text style={[styles.statValue, { color: COLORS.primary }]}>₹12,400</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>JOBS DONE</Text>
                        <Text style={[styles.statValue, { color: COLORS.success }]}>34</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>COMPLETION</Text>
                        <Text style={[styles.statValue, { color: COLORS.success }]}>97%</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>ACTIVE GIGS</Text>
                        <Text style={[styles.statValue, { color: COLORS.secondary }]}>03</Text>
                    </View>
                </View>

                {/* Trust Score */}
                <View style={styles.trustCard}>
                    <View style={styles.trustHeader}>
                        <Star size={18} color={COLORS.starFilled} />
                        <Text style={styles.trustTitle}>Trust Score</Text>
                        <Text style={styles.trustScore}>92/100</Text>
                    </View>
                    <View style={styles.progressTrack}>
                        <View style={styles.progressFill} />
                    </View>
                    <View style={styles.badgesRow}>
                        <View style={styles.badge}>
                            <Clock size={13} color={COLORS.success} />
                            <Text style={styles.badgeText}>On Time</Text>
                        </View>
                        <View style={styles.badge}>
                            <CheckCircle2 size={13} color={COLORS.success} />
                            <Text style={styles.badgeText}>Verified</Text>
                        </View>
                    </View>
                </View>

                {/* Job Matches */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Matched jobs for you</Text>
                    <Text style={styles.viewAll}>View all</Text>
                </View>

                {[1, 2, 3].map((item) => (
                    <View key={item} style={styles.jobCard}>
                        <View style={styles.jobTop}>
                            <Image
                                source={{ uri: "https://picsum.photos/200" }}
                                style={styles.jobImage}
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.jobTitle}>Leaking Faucet & Sink Repair</Text>
                                <Text style={styles.jobMeta}>2.4 km · ₹500 – ₹800</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.bidBtn} activeOpacity={0.8}>
                            <Text style={styles.bidText}>Place Bid</Text>
                        </TouchableOpacity>
                    </View>
                ))}

        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        paddingBottom: Spacing.xl,
    },

    // ── Header ──────────────────────────────────────────────────────────────
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.sm,
    },
    brand: {
        fontFamily: FONTS.BOLD,
        fontSize: 22,
        color: COLORS.primary,
        letterSpacing: -0.5,
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 3,
        gap: 4,
    },
    location: {
        fontFamily: FONTS.REGULAR,
        fontSize: 13,
        color: COLORS.textSecondary,
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.sm,
    },
    bellWrap: {
        width: 36,
        height: 36,
        borderRadius: Radius.md,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: Radius.full,
        borderWidth: 2,
        borderColor: COLORS.primaryLight,
    },

    // ── Greeting ────────────────────────────────────────────────────────────
    greeting: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.sm,
    },
    greetingTitle: {
        fontFamily: FONTS.BOLD,
        fontSize: 24,
        color: COLORS.textPrimary,
    },
    subtitle: {
        fontFamily: FONTS.REGULAR,
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 4,
    },
    highlight: {
        fontFamily: FONTS.BOLD,
        color: COLORS.primary,
    },

    // ── Stats ───────────────────────────────────────────────────────────────
    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: Spacing.lg,
        gap: Spacing.sm,
        marginTop: Spacing.sm,
    },
    statCard: {
        flex: 1,
        minWidth: "45%",
        backgroundColor: COLORS.surface,
        borderRadius: Radius.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: Spacing.base,
        ...Shadows.sm,
    },
    statLabel: {
        fontFamily: FONTS.BOLD,
        fontSize: 11,
        color: COLORS.textSecondary,
        letterSpacing: 0.8,
    },
    statValue: {
        fontFamily: FONTS.BOLD,
        fontSize: 22,
        marginTop: 6,
    },

    // ── Trust Card ──────────────────────────────────────────────────────────
    trustCard: {
        backgroundColor: COLORS.surface,
        marginHorizontal: Spacing.lg,
        marginTop: Spacing.base,
        padding: Spacing.base,
        borderRadius: Radius.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...Shadows.sm,
    },
    trustHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    trustTitle: {
        fontFamily: FONTS.SEMIBOLD,
        fontSize: 15,
        color: COLORS.textPrimary,
        flex: 1,
    },
    trustScore: {
        fontFamily: FONTS.BOLD,
        fontSize: 15,
        color: COLORS.textPrimary,
    },
    progressTrack: {
        height: 7,
        backgroundColor: COLORS.neutral200,
        borderRadius: Radius.full,
        marginTop: Spacing.sm,
        overflow: "hidden",
    },
    progressFill: {
        height: 7,
        width: "92%",
        backgroundColor: COLORS.starFilled,
        borderRadius: Radius.full,
    },
    badgesRow: {
        flexDirection: "row",
        gap: Spacing.sm,
        marginTop: Spacing.sm,
    },
    badge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: COLORS.successLight,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: Radius.full,
    },
    badgeText: {
        fontFamily: FONTS.SEMIBOLD,
        fontSize: 12,
        color: COLORS.success,
    },

    // ── Section Header ──────────────────────────────────────────────────────
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Spacing.lg,
        marginTop: Spacing.xl,
        marginBottom: Spacing.sm,
    },
    sectionTitle: {
        fontFamily: FONTS.BOLD,
        fontSize: 17,
        color: COLORS.textPrimary,
    },
    viewAll: {
        fontFamily: FONTS.SEMIBOLD,
        fontSize: 13,
        color: COLORS.primary,
    },

    // ── Job Card ────────────────────────────────────────────────────────────
    jobCard: {
        backgroundColor: COLORS.surface,
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.md,
        padding: Spacing.base,
        borderRadius: Radius.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...Shadows.sm,
    },
    jobTop: {
        flexDirection: "row",
        gap: Spacing.md,
        alignItems: "center",
    },
    jobImage: {
        width: 52,
        height: 52,
        borderRadius: Radius.md,
    },
    jobTitle: {
        fontFamily: FONTS.SEMIBOLD,
        fontSize: 14,
        color: COLORS.textPrimary,
    },
    jobMeta: {
        fontFamily: FONTS.REGULAR,
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 3,
    },
    bidBtn: {
        marginTop: Spacing.md,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        paddingVertical: 10,
        borderRadius: Radius.md,
        alignItems: "center",
    },
    bidText: {
        fontFamily: FONTS.BOLD,
        fontSize: 14,
        color: COLORS.primary,
    },
});