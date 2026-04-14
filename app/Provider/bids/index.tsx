import { useCallback, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Bell, MessageSquare } from "lucide-react-native";

import { ScreenWrapper } from "@/src/components/wrapper";
import { FONTS } from "@/src/theme/fonts";
import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";

export default function BidsScreen() {
  const { getProviderBids } = useProviderApi();
  const [activeTab, setActiveTab] = useState("accepted");
  const [isFetching, setIsFetching] = useState(true);
  const [bidsData, setBidsData] = useState({
    pending: [] as any[],
    accepted: [] as any[],
    rejected: [] as any[],
  });

  const loadBids = useCallback(async () => {
    setIsFetching(true);
    const [pending, accepted, rejected] = await Promise.all([
      getProviderBids("pending"),
      getProviderBids("accepted"),
      getProviderBids("rejected"),
    ]);

    setBidsData({
      pending: pending || [],
      accepted: accepted || [],
      rejected: rejected || [],
    });
    setIsFetching(false);
  }, [getProviderBids]);

  useFocusEffect(
    useCallback(() => {
      loadBids();
    }, [loadBids]),
  );

  const data =
    activeTab === "pending"
      ? bidsData.pending
      : activeTab === "accepted"
        ? bidsData.accepted
        : bidsData.rejected;

  const handleChat = (item: any) => {
    if (!item?.jobId || !item?.customerId) {
      Alert.alert("Error", "Chat details are missing for this bid.");
      return;
    }

    router.push({
      pathname: "/Provider/ChatScreen",
      params: {
        jobId: String(item.jobId),
        otherUserId: String(item.customerId),
        otherUserName: String(item.customerName || "Customer"),
        jobTitle: String(item.title || "Job"),
      },
    });
  };

  const handleViewJob = (item: any) => {
    if (!item?.jobId) {
      Alert.alert("Error", "Job ID not found for this bid.");
      return;
    }

    router.push({
      pathname: "/Provider/bids/job/[id]",
      params: { id: String(item.jobId) },
    });
  };

  const handleResumeChat = (item: any) => {
    handleChat(item);
  };

  return (
    <View style={styles.container}>
      <ScreenWrapper
        contentContainerStyle={styles.scrollContent}
        onRefresh={loadBids}
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
              <Text style={styles.headerSubtitle}>My Bids</Text>
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

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "pending" && styles.activeTab]}
            onPress={() => setActiveTab("pending")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "pending" && styles.activeText,
              ]}
            >
              Pending ({bidsData.pending.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === "accepted" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("accepted")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "accepted" && styles.activeText,
              ]}
            >
              Accepted ({bidsData.accepted.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === "rejected" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("rejected")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "rejected" && styles.activeText,
              ]}
            >
              Rejected ({bidsData.rejected.length})
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 16 }}>
          {isFetching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#6D5DF6" />
            </View>
          ) : data.length > 0 ? (
            data.map((item) => (
              <View key={String(item.id)} style={styles.bidCard}>
                <View style={styles.bidHeader}>
                  <View style={{ flex: 1, paddingRight: 12 }}>
                    <Text style={styles.bidTitle}>{item.title}</Text>
                    <Text style={styles.bidUser}>From: {item.user}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(item.status).bg },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusColor(item.status).text },
                      ]}
                    >
                      {item.status.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.bidAmount}>
                  <Text style={styles.amountLabel}>Your Bid:</Text>
                  <Text style={styles.amountValue}>
                    ₹{Number(item.bidAmount || 0).toLocaleString("en-IN")}
                  </Text>
                </View>

                {activeTab === "accepted" ? (
                  <View style={styles.actionBtns}>
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.startBtn]}
                      onPress={() => handleViewJob(item)}
                    >
                      <Text style={styles.actionBtnText}>Start Work</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.chatBtn]}
                      onPress={() => handleChat(item)}
                    >
                      <MessageSquare size={18} color="#4B5563" />
                      <Text style={styles.chatBtnText}>Message</Text>
                    </TouchableOpacity>
                  </View>
                ) : activeTab === "pending" ? (
                  <View style={styles.actionBtns}>
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.viewBtn]}
                      onPress={() => handleViewJob(item)}
                    >
                      <Text style={styles.actionBtnText}>View Job</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.actionBtn,
                        styles.chatBtn,
                        { flex: 0, paddingHorizontal: 20 },
                      ]}
                      onPress={() => handleResumeChat(item)}
                    >
                      <MessageSquare size={18} color="#4B5563" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.actionBtns}>
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.viewBtn]}
                      onPress={() => handleViewJob(item)}
                    >
                      <Text style={styles.actionBtnText}>View Job</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No {activeTab} bids found.</Text>
            </View>
          )}
        </View>
      </ScreenWrapper>
    </View>
  );
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return { bg: "#FEF3C7", text: "#D97706" };
    case "accepted":
      return { bg: "#D1FAE5", text: "#059669" };
    case "rejected":
      return { bg: "#FEE2E2", text: "#DC2626" };
    default:
      return { bg: "#F3F4F6", text: "#4B5563" };
  }
};

/* -------------------- Styles -------------------- */
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
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -25, // Overlapping the header seamlessly
    borderRadius: 16,
    padding: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 10,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#ECEBFF",
  },
  tabText: {
    fontSize: 13,
    fontFamily: FONTS.SEMIBOLD,
    color: "#6B7280",
  },
  activeText: {
    color: "#6D5DF6",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  bidCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  bidHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  bidTitle: {
    fontSize: 16,
    fontFamily: FONTS.SEMIBOLD,
    color: "#1F2937",
    marginBottom: 4,
  },
  bidUser: {
    fontSize: 13,
    fontFamily: FONTS.REGULAR,
    color: "#6B7280",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontFamily: FONTS.BOLD,
  },
  bidAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  amountLabel: {
    fontSize: 13,
    fontFamily: FONTS.REGULAR,
    color: "#6B7280",
  },
  amountValue: {
    fontSize: 18,
    fontFamily: FONTS.BOLD,
    color: "#6D5DF6",
  },
  actionBtns: {
    flexDirection: "row",
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  startBtn: {
    backgroundColor: "#6D5DF6",
  },
  viewBtn: {
    backgroundColor: "#6D5DF6",
  },
  chatBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  actionBtnText: {
    fontSize: 14,
    fontFamily: FONTS.SEMIBOLD,
    color: "#fff",
  },
  chatBtnText: {
    fontSize: 14,
    fontFamily: FONTS.SEMIBOLD,
    color: "#4B5563",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: "#9CA3AF",
  },
});
