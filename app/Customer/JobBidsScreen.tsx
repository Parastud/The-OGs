import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  X,
  IndianRupee,
  MessageCircle,
} from "lucide-react-native";

import { getConsumerJobBidsService } from "@/src/services";
import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";

type Bid = {
  id: string;
  providerId: string;
  providerName: string;
  providerImageUrl: string;
  verified: boolean;
  bidAmount: number;
  bidMessage: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  createdAt: string;
};

type JobMeta = {
  id: string;
  title: string;
  category: string;
  status: string;
  budget?: { min?: number; max?: number };
};

export default function JobBidsScreen() {
  const params = useLocalSearchParams<{ jobId?: string; title?: string }>();

  const jobId = useMemo(() => {
    const raw = params.jobId;
    if (Array.isArray(raw)) return raw[0] || "";
    return raw || "";
  }, [params.jobId]);

  const fallbackTitle = useMemo(() => {
    const raw = params.title;
    if (Array.isArray(raw)) return raw[0] || "";
    return raw || "";
  }, [params.title]);

  const [job, setJob] = useState<JobMeta | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { acceptConsumerBid, rejectConsumerBid } = useProviderApi();

  const loadBids = useCallback(async () => {
    if (!jobId) {
      setIsLoading(false);
      setBids([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await getConsumerJobBidsService(jobId);
      if (response?.success && response?.data) {
        setJob(response.data.job || null);
        setBids(Array.isArray(response.data.bids) ? response.data.bids : []);
      } else {
        setBids([]);
      }
    } catch {
      setBids([]);
    } finally {
      setIsLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    loadBids();
  }, [loadBids]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadBids();
    setRefreshing(false);
  }, [loadBids]);

  const handleAcceptBid = (bid: Bid) => {
    Alert.alert("Accept Bid", `Accept bid from ${bid.providerName}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Accept",
        onPress: async () => {
          const response = await acceptConsumerBid({
            jobId,
            bidId: bid.id,
          });
          if (response?.success) {
            await loadBids();
          }
        },
      },
    ]);
  };

  const handleRejectBid = (bid: Bid) => {
    Alert.alert("Reject Bid", `Reject bid from ${bid.providerName}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reject",
        style: "destructive",
        onPress: async () => {
          const response = await rejectConsumerBid({
            jobId,
            bidId: bid.id,
          });
          if (response?.success) {
            await loadBids();
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6C63FF"
            colors={["#6C63FF"]}
          />
        }
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={22} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Job Bids</Text>
          <View style={{ width: 22 }} />
        </View>

        <Text style={styles.title}>{job?.title || fallbackTitle || "Job"}</Text>
        <Text style={styles.subTitle}>{bids.length} bids received</Text>

        {isLoading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color="#6C63FF" />
            <Text style={styles.loadingText}>Loading bids...</Text>
          </View>
        ) : bids.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyTitle}>No bids yet</Text>
            <Text style={styles.emptySub}>
              Providers will appear here once they bid.
            </Text>
          </View>
        ) : (
          bids.map((bid) => (
            <View key={bid.id} style={styles.card}>
              <View style={styles.topRow}>
                <View style={styles.providerRow}>
                  <Image
                    source={{
                      uri:
                        bid.providerImageUrl ||
                        "https://randomuser.me/api/portraits/men/20.jpg",
                    }}
                    style={styles.avatar}
                  />
                  <View>
                    <View style={styles.nameRow}>
                      <Text style={styles.providerName}>
                        {bid.providerName}
                      </Text>
                      {bid.verified && <BadgeCheck size={14} color="#2563EB" />}
                    </View>
                    <Text style={styles.statusText}>
                      {bid.status.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.pricePill}>
                  <IndianRupee size={14} color="#6C63FF" />
                  <Text style={styles.priceText}>
                    {Number(bid.bidAmount).toLocaleString("en-IN")}
                  </Text>
                </View>
              </View>

              <Text style={styles.messageText}>
                {bid.bidMessage?.trim() || "No message added by provider."}
              </Text>

              <View style={styles.footerRow}>
                <Text style={styles.dateText}>
                  {new Date(bid.createdAt).toLocaleDateString()}
                </Text>

                <View style={styles.actionsRight}>
                  {bid.status === "pending" && (
                    <>
                      <TouchableOpacity
                        style={styles.acceptBtn}
                        onPress={() => handleAcceptBid(bid)}
                      >
                        <Check size={14} color="#0F766E" />
                        <Text style={styles.acceptText}>Accept</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => handleRejectBid(bid)}
                      >
                        <X size={14} color="#B91C1C" />
                        <Text style={styles.deleteText}>Reject</Text>
                      </TouchableOpacity>
                    </>
                  )}

                  <TouchableOpacity
                    style={styles.chatBtn}
                    onPress={() =>
                      router.push({
                        pathname: "/Customer/ChatScreen",
                        params: {
                          jobId: String(job?.id || jobId),
                          otherUserId: String(bid.providerId),
                          otherUserName: String(bid.providerName),
                          jobTitle: String(
                            job?.title || fallbackTitle || "Job",
                          ),
                        },
                      })
                    }
                  >
                    <MessageCircle size={16} color="#6C63FF" />
                    <Text style={styles.chatText}>Chat</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  title: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },
  subTitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },
  loadingWrap: {
    marginTop: 44,
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    fontSize: 12,
    color: "#666",
  },
  emptyWrap: {
    marginTop: 44,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  emptySub: {
    marginTop: 6,
    fontSize: 12,
    color: "#777",
  },
  card: {
    marginTop: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  providerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  providerName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  statusText: {
    marginTop: 2,
    fontSize: 10,
    color: "#6B7280",
    fontWeight: "600",
  },
  pricePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#ECEBFF",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  priceText: {
    color: "#6C63FF",
    fontWeight: "700",
    fontSize: 13,
  },
  messageText: {
    marginTop: 12,
    fontSize: 13,
    color: "#374151",
    lineHeight: 18,
  },
  footerRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionsRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  acceptBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#A7F3D0",
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: "#ECFEFF",
  },
  acceptText: {
    color: "#0F766E",
    fontSize: 12,
    fontWeight: "600",
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: "#FEF2F2",
  },
  deleteText: {
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "600",
  },
  dateText: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  chatBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#D9D6FF",
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: "#F7F6FF",
  },
  chatText: {
    color: "#6C63FF",
    fontSize: 12,
    fontWeight: "600",
  },
});
