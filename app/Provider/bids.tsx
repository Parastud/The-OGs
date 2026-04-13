import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

import { Bell, MessageSquare } from "lucide-react-native";

import { ScreenWrapper } from "@/src/components/wrapper";
import { COLORS } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";
import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";

export default function BidsScreen() {
  const { getProviderBids, isLoading } = useProviderApi();
  const [activeTab, setActiveTab] = useState("accepted");
  const [bidsData, setBidsData] = useState({
    pending: [] as any[],
    accepted: [] as any[],
    rejected: [] as any[],
  });

  useEffect(() => {
    const loadBids = async () => {
      const pending = await getProviderBids("pending");
      const accepted = await getProviderBids("accepted");
      const rejected = await getProviderBids("rejected");

      setBidsData({
        pending: pending || [],
        accepted: accepted || [],
        rejected: rejected || [],
      });
    };

    loadBids();
  }, []);

  const data =
    activeTab === "pending"
      ? bidsData.pending
      : activeTab === "accepted"
        ? bidsData.accepted
        : bidsData.rejected;

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
          style={[styles.tabBtn, activeTab === "accepted" && styles.activeTab]}
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
          style={[styles.tabBtn, activeTab === "rejected" && styles.activeTab]}
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

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : data.length > 0 ? (
        data.map((item, idx) => (
          <View key={idx} style={styles.bidCard}>
            <View style={styles.bidHeader}>
              <View>
                <Text style={styles.bidTitle}>{item.title}</Text>
                <Text style={styles.bidUser}>From: {item.user}</Text>
              </View>
              <View style={[styles.statusBadge, getStatusColor(item.status)]}>
                <Text style={styles.statusText}>
                  {item.status.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.bidAmount}>
              <Text style={styles.amountLabel}>Your Bid:</Text>
              <Text style={styles.amountValue}>{item.bidAmount}</Text>
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
                  <MessageSquare size={16} color={COLORS.primary} />
                  <Text
                    style={[styles.actionBtnText, { color: COLORS.primary }]}
                  >
                    Message
                  </Text>
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
                  style={[styles.actionBtn, styles.chatBtn]}
                  onPress={() => handleResumeChat(item)}
                >
                  <MessageSquare size={16} color={COLORS.primary} />
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
          <Text style={styles.emptyText}>No {activeTab} bids</Text>
        </View>
      )}
    </ScreenWrapper>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return { backgroundColor: "#FFF3E0" };
    case "accepted":
      return { backgroundColor: "#E8F5E9" };
    case "rejected":
      return { backgroundColor: "#FFEBEE" };
    default:
      return { backgroundColor: "#F5F5F5" };
  }
};

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
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: 12,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textSecondary,
  },
  activeText: {
    color: COLORS.white,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  bidCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bidHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  bidTitle: {
    fontSize: 14,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  bidUser: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontFamily: FONTS.BOLD,
    color: COLORS.primary,
  },
  bidAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  amountLabel: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },
  amountValue: {
    fontSize: 16,
    fontFamily: FONTS.BOLD,
    color: COLORS.primary,
  },
  actionBtns: {
    flexDirection: "row",
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  startBtn: {
    backgroundColor: COLORS.primary,
  },
  viewBtn: {
    backgroundColor: COLORS.primary,
  },
  chatBtn: {
    backgroundColor: COLORS.surfaceSecondary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionBtnText: {
    fontSize: 12,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.white,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },
});
