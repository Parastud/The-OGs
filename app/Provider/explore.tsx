import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { ScreenWrapper } from "@/src/components/wrapper";
import { COLORS, Radius, Shadows, Spacing } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";
import { MapPin, Search, SlidersHorizontal } from "lucide-react-native";
import { useState } from "react";

const CATEGORIES = ["Plumbing", "Electrical", "Cleaning", "AC Repair", "Carpentry"];

const jobs = [
    {
        id: 1,
        title: "Leaking Faucet & Sink Repair",
        distance: "2.4 km",
        price: "₹500 – ₹800",
        match: "94%",
        image: "https://picsum.photos/200",
    },
    {
        id: 2,
        title: "Ceiling Fan Installation",
        distance: "4.1 km",
        price: "₹1,200 – ₹1,500",
        match: "89%",
        image: "https://picsum.photos/201",
    },
    {
        id: 3,
        title: "Deep Sofa Cleaning",
        distance: "0.8 km",
        price: "₹900 – ₹1,100",
        match: "82%",
        image: "https://picsum.photos/202",
    },
];

export default function ExploreScreen() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchFocused, setSearchFocused] = useState(false);

    return (
        <ScreenWrapper
            safeArea
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
        >

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Explore Jobs</Text>
                    <Text style={styles.subtitle}>Find work near you</Text>
                </View>

                {/* Search */}
                <View style={styles.searchRow}>
                    <View style={[styles.searchBox, searchFocused && styles.searchBoxFocused]}>
                        <Search size={17} color={COLORS.textTertiary} />
                        <TextInput
                            placeholder="Search jobs..."
                            placeholderTextColor={COLORS.textTertiary}
                            style={styles.searchInput}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                        />
                    </View>
                    <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
                        <SlidersHorizontal size={18} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesList}
                >
                    {CATEGORIES.map((item) => {
                        const active = activeCategory === item;
                        return (
                            <TouchableOpacity
                                key={item}
                                style={[styles.category, active && styles.categoryActive]}
                                onPress={() => setActiveCategory(active ? null : item)}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recommended for you</Text>
                    <Text style={styles.count}>{jobs.length} jobs</Text>
                </View>

                {/* Job Cards */}
                {jobs.map((job) => (
                    <View key={job.id} style={styles.card}>
                        <View style={styles.cardTop}>
                            <Image source={{ uri: job.image }} style={styles.jobImage} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.jobTitle}>{job.title}</Text>
                                <View style={styles.metaRow}>
                                    <View style={styles.metaItem}>
                                        <MapPin size={13} color={COLORS.textSecondary} />
                                        <Text style={styles.metaText}>{job.distance}</Text>
                                    </View>
                                    <Text style={styles.metaText}>{job.price}</Text>
                                </View>
                            </View>
                            <View style={styles.matchBadge}>
                                <Text style={styles.matchText}>{job.match}</Text>
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
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.sm,
    },
    title: {
        fontFamily: FONTS.BOLD,
        fontSize: 26,
        color: COLORS.textPrimary,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontFamily: FONTS.REGULAR,
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 2,
    },

    // ── Search ──────────────────────────────────────────────────────────────
    searchRow: {
        flexDirection: "row",
        paddingHorizontal: Spacing.lg,
        gap: Spacing.sm,
        marginBottom: Spacing.base,
    },
    searchBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.surface,
        borderRadius: Radius.lg,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        paddingHorizontal: Spacing.md,
        paddingVertical: 11,
        gap: 8,
    },
    searchBoxFocused: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primaryLight,
    },
    searchInput: {
        flex: 1,
        fontFamily: FONTS.REGULAR,
        fontSize: 14,
        color: COLORS.textPrimary,
        padding: 0,
    },
    filterBtn: {
        backgroundColor: COLORS.primaryLight,
        borderWidth: 1.5,
        borderColor: COLORS.primaryMuted,
        padding: Spacing.md,
        borderRadius: Radius.lg,
        alignItems: "center",
        justifyContent: "center",
    },

    // ── Categories ──────────────────────────────────────────────────────────
    categoriesList: {
        paddingHorizontal: Spacing.lg,
        gap: Spacing.sm,
        paddingBottom: Spacing.sm,
    },
    category: {
        backgroundColor: COLORS.surface,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        paddingHorizontal: Spacing.base,
        paddingVertical: 8,
        borderRadius: Radius.full,
    },
    categoryActive: {
        backgroundColor: COLORS.primaryLight,
        borderColor: COLORS.primaryMuted,
    },
    categoryText: {
        fontFamily: FONTS.SEMIBOLD,
        fontSize: 13,
        color: COLORS.textSecondary,
    },
    categoryTextActive: {
        color: COLORS.primary,
    },

    // ── Section Header ──────────────────────────────────────────────────────
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Spacing.lg,
        marginTop: Spacing.sm,
        marginBottom: Spacing.md,
    },
    sectionTitle: {
        fontFamily: FONTS.BOLD,
        fontSize: 17,
        color: COLORS.textPrimary,
    },
    count: {
        fontFamily: FONTS.REGULAR,
        fontSize: 13,
        color: COLORS.textSecondary,
    },

    // ── Job Card ────────────────────────────────────────────────────────────
    card: {
        backgroundColor: COLORS.surface,
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.md,
        padding: Spacing.base,
        borderRadius: Radius.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...Shadows.sm,
    },
    cardTop: {
        flexDirection: "row",
        gap: Spacing.md,
        alignItems: "flex-start",
    },
    jobImage: {
        width: 60,
        height: 60,
        borderRadius: Radius.md,
    },
    jobTitle: {
        fontFamily: FONTS.SEMIBOLD,
        fontSize: 15,
        color: COLORS.textPrimary,
    },
    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
        alignItems: "center",
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
    metaText: {
        fontFamily: FONTS.REGULAR,
        fontSize: 13,
        color: COLORS.textSecondary,
    },
    matchBadge: {
        backgroundColor: COLORS.primaryLight,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: Radius.full,
        alignSelf: "flex-start",
    },
    matchText: {
        fontFamily: FONTS.BOLD,
        fontSize: 12,
        color: COLORS.primary,
    },
    bidBtn: {
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        paddingVertical: 11,
        borderRadius: Radius.md,
        marginTop: Spacing.md,
        alignItems: "center",
    },
    bidText: {
        fontFamily: FONTS.BOLD,
        fontSize: 14,
        color: COLORS.primary,
    },
});