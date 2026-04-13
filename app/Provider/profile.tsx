import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import {
    ArrowLeft,
    Bell,
    CalendarCheck,
    MessageSquare,
    Star,
    Zap
} from "lucide-react-native";

import { ScreenWrapper } from "@/src/components/wrapper";
import { COLORS, Radius, Shadows, Spacing } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <ScreenWrapper
                safeArea
                style={styles.wrapper}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.header}>
                    <ArrowLeft size={22} color={COLORS.textPrimary} />
                    <Text style={styles.brand}>Gigly</Text>

                    <View style={styles.headerRight}>
                        <Text style={styles.location}>Mathura, UP</Text>
                        <Bell size={20} color={COLORS.textPrimary} />
                    </View>
                </View>

                <View style={styles.profileCard}>
                    <Image
                        source={{ uri: "https://i.pravatar.cc/150" }}
                        style={styles.avatar}
                    />

                    <Text style={styles.name}>Arjun Sharma</Text>
                    <Text style={styles.role}>Plumber & Electrician</Text>

                    <View style={styles.skills}>
                        <Text style={styles.skill}>PLUMBING</Text>
                        <Text style={styles.skill}>ELECTRICAL</Text>
                        <Text style={styles.skill}>HVAC REPAIR</Text>
                    </View>

                    <View style={styles.trustCard}>
                        <View style={styles.circle}>
                            <Text style={styles.trustNumber}>92</Text>
                            <Text style={styles.trustLabel}>TRUST SCORE</Text>
                        </View>

                        <Text style={styles.verified}>AI Verified Expert</Text>
                    </View>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>4.9</Text>
                        <Star size={16} color={COLORS.starFilled} />
                        <Text style={styles.statLabel}>RATING</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>47</Text>
                        <Text style={styles.statLabel}>REVIEWS</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>18</Text>
                        <Text style={styles.statLabel}>JOBS</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ABOUT ME</Text>
                    <Text style={styles.aboutText}>
                        Certified technician with over 8 years of experience in residential infrastructure...
                    </Text>
                </View>

                <View style={styles.availableCard}>
                    <CalendarCheck size={18} color={COLORS.success} />

                    <View>
                        <Text style={styles.availableTitle}>AVAILABLE TODAY</Text>
                        <Text style={styles.availableTime}>Mon-Sat, 9AM-7PM</Text>
                    </View>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>TOP REVIEWS</Text>
                    <Text style={styles.viewAll}>View All</Text>
                </View>

                {[1, 2].map((item) => (
                    <View key={item} style={styles.reviewCard}>
                        <View style={styles.reviewHeader}>
                            <Image
                                source={{ uri: "https://i.pravatar.cc/100" }}
                                style={styles.reviewAvatar}
                            />

                            <View style={styles.reviewMeta}>
                                <Text style={styles.reviewName}>Priya Verma</Text>
                                <Text style={styles.reviewTime}>2 days ago</Text>
                            </View>

                            <View style={styles.stars}>
                                <Star size={14} color={COLORS.starFilled} />
                                <Star size={14} color={COLORS.starFilled} />
                                <Star size={14} color={COLORS.starFilled} />
                                <Star size={14} color={COLORS.starFilled} />
                                <Star size={14} color={COLORS.starFilled} />
                            </View>
                        </View>

                        <Text style={styles.reviewText}>
                            Arjun fixed our kitchen leak in record time...
                        </Text>
                    </View>
                ))}
            </ScreenWrapper>

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.chatBtn}>
                    <MessageSquare size={18} color={COLORS.primary} />
                    <Text style={styles.chatText}>Chat</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.hireBtn}>
                    <Text style={styles.hireText}>Hire Now ₹299/hr</Text>
                    <Zap size={16} color={COLORS.textInverse} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    wrapper: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    scrollContent: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        paddingBottom: Spacing.base
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
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    location: {
        fontFamily: FONTS.REGULAR,
        fontSize: 12,
        color: COLORS.textSecondary
    },
    profileCard: {
        backgroundColor: COLORS.surface,
        marginHorizontal: Spacing.lg,
        padding: Spacing.lg,
        borderRadius: Radius.xl,
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
        ...Shadows.sm
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: Radius.full
    },
    name: {
        fontFamily: FONTS.BOLD,
        fontSize: 22,
        color: COLORS.textPrimary,
        marginTop: 10
    },
    role: {
        fontFamily: FONTS.REGULAR,
        color: COLORS.textSecondary,
        marginTop: 4
    },
    skills: {
        flexDirection: "row",
        gap: Spacing.sm,
        marginTop: Spacing.md,
        flexWrap: "wrap",
        justifyContent: "center"
    },
    skill: {
        backgroundColor: COLORS.primaryLight,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: Radius.full,
        color: COLORS.primary,
        fontSize: 12,
        fontFamily: FONTS.MEDIUM
    },
    trustCard: {
        alignItems: "center",
        marginTop: Spacing.lg
    },
    circle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 6,
        borderColor: COLORS.starFilled,
        alignItems: "center",
        justifyContent: "center"
    },
    trustNumber: {
        fontFamily: FONTS.BOLD,
        fontSize: 24,
        color: COLORS.textPrimary
    },
    trustLabel: {
        fontFamily: FONTS.MEDIUM,
        fontSize: 10,
        color: COLORS.textSecondary
    },
    verified: {
        marginTop: Spacing.sm,
        color: COLORS.secondaryDark,
        fontFamily: FONTS.SEMIBOLD,
        fontSize: 13
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: Spacing.lg,
        marginTop: Spacing.base
    },
    statCard: {
        backgroundColor: COLORS.surface,
        padding: Spacing.base,
        borderRadius: Radius.lg,
        alignItems: "center",
        width: "30%",
        borderWidth: 1,
        borderColor: COLORS.border,
        ...Shadows.sm
    },
    statNumber: {
        fontFamily: FONTS.BOLD,
        fontSize: 20,
        color: COLORS.textPrimary
    },
    statLabel: {
        fontFamily: FONTS.MEDIUM,
        fontSize: 11,
        marginTop: 4,
        color: COLORS.textSecondary
    },
    section: {
        padding: Spacing.lg
    },
    sectionTitle: {
        fontFamily: FONTS.BOLD,
        fontSize: 14,
        letterSpacing: 1,
        color: COLORS.textPrimary
    },
    aboutText: {
        marginTop: Spacing.sm,
        color: COLORS.textSecondary,
        lineHeight: 20,
        fontFamily: FONTS.REGULAR,
        fontSize: 14
    },
    availableCard: {
        backgroundColor: COLORS.successLight,
        marginHorizontal: Spacing.lg,
        padding: Spacing.base,
        borderRadius: Radius.lg,
        flexDirection: "row",
        gap: Spacing.sm,
        alignItems: "center"
    },
    availableTitle: {
        fontFamily: FONTS.SEMIBOLD,
        color: COLORS.success
    },
    availableTime: {
        fontFamily: FONTS.REGULAR,
        color: COLORS.successDark
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.lg
    },
    viewAll: {
        color: COLORS.primary,
        fontFamily: FONTS.MEDIUM,
        fontSize: 13
    },
    reviewCard: {
        backgroundColor: COLORS.surface,
        marginHorizontal: Spacing.lg,
        marginTop: Spacing.base,
        padding: Spacing.base,
        borderRadius: Radius.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...Shadows.sm
    },
    reviewHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.sm
    },
    reviewAvatar: {
        width: 40,
        height: 40,
        borderRadius: Radius.full
    },
    reviewMeta: {
        flex: 1
    },
    reviewName: {
        fontFamily: FONTS.SEMIBOLD,
        color: COLORS.textPrimary
    },
    reviewTime: {
        fontFamily: FONTS.REGULAR,
        fontSize: 12,
        color: COLORS.textSecondary
    },
    stars: {
        flexDirection: "row",
        gap: 2
    },
    reviewText: {
        marginTop: 10,
        color: COLORS.textSecondary,
        fontFamily: FONTS.REGULAR,
        fontSize: 14
    },
    bottomBar: {
        flexDirection: "row",
        gap: Spacing.sm,
        padding: Spacing.base,
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border
    },
    chatBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.primary,
        padding: 14,
        borderRadius: Radius.md,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6
    },
    chatText: {
        color: COLORS.primary,
        fontFamily: FONTS.SEMIBOLD
    },
    hireBtn: {
        flex: 2,
        backgroundColor: COLORS.primary,
        padding: 14,
        borderRadius: Radius.md,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6
    },
    hireText: {
        color: COLORS.textInverse,
        fontFamily: FONTS.BOLD
    }
});