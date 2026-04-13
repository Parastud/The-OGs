import { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import {
    Bell,
    MapPin,
    MessageSquare,
    ShieldCheck
} from "lucide-react-native";

import { ScreenWrapper } from "@/src/components/wrapper";
import { COLORS, Radius, Shadows, Spacing } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";

export default function BidsScreen() {
    const [activeTab, setActiveTab] = useState("accepted");

    const pendingData = [
        {
            id: 1,
            title: "Bathroom Pipe Repair",
            bid: "₹500",
            user: "Rahul Sharma"
        }
    ];

    const acceptedData = [
        {
            id: 2,
            title: "Kitchen Faucet Replacement",
            bid: "₹650",
            user: "Priya Sharma"
        },
        {
            id: 3,
            title: "Ceiling Fan Repair",
            bid: "₹450",
            user: "Arjun K."
        }
    ];

    const rejectedData = [
        {
            id: 4,
            title: "AC Installation",
            bid: "₹900",
            user: "Amit Verma"
        }
    ];

    const data =
        activeTab === "pending"
            ? pendingData
            : activeTab === "accepted"
                ? acceptedData
                : rejectedData;

    const handleChat = (item: any) => {
        console.log("Chat:", item.title);
    };

    const handleViewJob = (item: any) => {
        console.log("View Job:", item.title);
    };

    const handleResumeChat = (item: any) => {
        console.log("Resume Chat:", item.title);
    };

    return (
        <ScreenWrapper
            safeArea
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
        >
            <View style={styles.header}>
                <Text style={styles.brand}>Gigly</Text>
                <Text style={styles.title}>My Bids</Text>
                <Bell size={22} color={COLORS.textPrimary} />
            </View>

            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[styles.tabBtn, activeTab === "pending" && styles.activeTab]}
                    onPress={() => setActiveTab("pending")}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === "pending" && styles.activeText
                    ]}>
                        Pending
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabBtn, activeTab === "accepted" && styles.activeTab]}
                    onPress={() => setActiveTab("accepted")}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === "accepted" && styles.activeText
                    ]}>
                        Accepted
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabBtn, activeTab === "rejected" && styles.activeTab]}
                    onPress={() => setActiveTab("rejected")}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === "rejected" && styles.activeText
                    ]}>
                        Rejected
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.heading}>Active Opportunities</Text>
                <Text style={styles.subtitle}>
                    Manage your accepted offers and start working.
                </Text>
            </View>

            {data.map((item: any) => (
                <View key={item.id} style={styles.card}>
                    <View style={styles.cardTop}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{activeTab.toUpperCase()}</Text>
                        </View>

                        <Image
                            source={{ uri: "https://picsum.photos/100" }}
                            style={styles.jobImage}
                        />
                    </View>

                    <Text style={styles.jobTitle}>{item.title}</Text>
                    <Text style={styles.bid}>Your bid: {item.bid}</Text>

                    <View style={styles.clientBox}>
                        <Image
                            source={{ uri: "https://i.pravatar.cc/100" }}
                            style={styles.avatar}
                        />

                        <View style={styles.clientInfo}>
                            <Text style={styles.clientName}>{item.user}</Text>

                            <View style={styles.locationRow}>
                                <MapPin size={14} color={COLORS.textSecondary} />
                                <Text style={styles.location}>Mathura, UP</Text>
                            </View>
                        </View>

                        {activeTab === "accepted" && (
                            <View style={styles.escrow}>
                                <ShieldCheck size={16} color={COLORS.success} />
                                <Text style={styles.escrowText}>Payment held in escrow</Text>
                            </View>
                        )}
                    </View>

                    {activeTab === "accepted" ? (
                        <View style={styles.buttons}>
                            <TouchableOpacity
                                style={styles.chatBtn}
                                onPress={() => handleChat(item)}
                            >
                                <MessageSquare size={16} color={COLORS.primary} />
                                <Text style={styles.chatText}>Chat</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.viewBtn}
                                onPress={() => handleViewJob(item)}
                            >
                                <Text style={styles.viewText}>View Job</Text>
                            </TouchableOpacity>
                        </View>
                    ) : activeTab === "pending" ? (
                        <TouchableOpacity onPress={() => handleResumeChat(item)}>
                            <Text style={styles.resume}>Resume Chat</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.rejectedText}>Bid Rejected</Text>
                    )}
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
    tabs: {
        flexDirection: "row",
        backgroundColor: COLORS.surfaceSecondary,
        marginHorizontal: Spacing.lg,
        borderRadius: Radius.md,
        padding: 6,
        borderWidth: 1,
        borderColor: COLORS.border
    },
    tabBtn: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        borderRadius: Radius.sm
    },
    tabText: {
        fontFamily: FONTS.MEDIUM,
        fontSize: 13,
        color: COLORS.textSecondary
    },
    activeTab: {
        backgroundColor: COLORS.surface,
        ...Shadows.sm
    },
    activeText: {
        color: COLORS.primary,
        fontFamily: FONTS.SEMIBOLD
    },
    section: {
        padding: Spacing.lg
    },
    heading: {
        fontFamily: FONTS.BOLD,
        fontSize: 24,
        color: COLORS.textPrimary
    },
    subtitle: {
        fontFamily: FONTS.REGULAR,
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 4
    },
    card: {
        backgroundColor: COLORS.surface,
        marginHorizontal: Spacing.lg,
        padding: 18,
        borderRadius: Radius.xl,
        marginBottom: Spacing.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...Shadows.sm
    },
    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    badge: {
        backgroundColor: COLORS.successLight,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: Radius.full
    },
    badgeText: {
        color: COLORS.successDark,
        fontFamily: FONTS.SEMIBOLD,
        fontSize: 12
    },
    jobImage: {
        width: 60,
        height: 60,
        borderRadius: Radius.md
    },
    jobTitle: {
        fontFamily: FONTS.BOLD,
        fontSize: 20,
        color: COLORS.textPrimary,
        marginTop: 10
    },
    bid: {
        color: COLORS.textSecondary,
        fontFamily: FONTS.REGULAR,
        marginTop: 4
    },
    clientBox: {
        backgroundColor: COLORS.surfaceSecondary,
        padding: Spacing.md,
        borderRadius: Radius.md,
        marginTop: Spacing.md,
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.sm
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: Radius.full
    },
    clientInfo: {
        flex: 1
    },
    clientName: {
        fontFamily: FONTS.SEMIBOLD,
        color: COLORS.textPrimary
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    location: {
        marginLeft: 4,
        color: COLORS.textSecondary,
        fontFamily: FONTS.REGULAR,
        fontSize: 12
    },
    escrow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    escrowText: {
        color: COLORS.success,
        fontSize: 12,
        fontFamily: FONTS.MEDIUM
    },
    buttons: {
        flexDirection: "row",
        gap: Spacing.sm,
        marginTop: 14
    },
    chatBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.primary,
        padding: 12,
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
    viewBtn: {
        flex: 1,
        backgroundColor: COLORS.primary,
        padding: 12,
        borderRadius: Radius.md,
        alignItems: "center"
    },
    viewText: {
        color: COLORS.textInverse,
        fontFamily: FONTS.SEMIBOLD
    },
    resume: {
        marginTop: Spacing.md,
        color: COLORS.primary,
        fontFamily: FONTS.SEMIBOLD,
        textAlign: "right"
    },
    rejectedText: {
        marginTop: Spacing.md,
        color: COLORS.danger,
        fontFamily: FONTS.SEMIBOLD
    }
});