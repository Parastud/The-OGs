import {
  CheckCircle,
  Clock,
  Filter,
  Menu,
  MessageCircle,
} from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useMemo, useState, useCallback } from "react";
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

import {
  completeConsumerJobService,
  getConsumerJobsService,
} from "@/src/services";

type Job = {
  id: string;
  title: string;
  category: string;
  status: "In Progress" | "Completed" | "Pending";
  provider: string;
  rating: string;
  price: string;
  dueDate?: string | null;
  imageUrl?: string;
};

type TabKey = "All" | "Active" | "Pending" | "Completed";

export default function MyJobsScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>("Active");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [completingJobId, setCompletingJobId] = useState<string | null>(null);

  const statusParam = useMemo(() => {
    if (activeTab === "Active") return "active" as const;
    if (activeTab === "Pending") return "pending" as const;
    if (activeTab === "Completed") return "completed" as const;
    return "all" as const;
  }, [activeTab]);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      const response = await getConsumerJobsService(statusParam);
      if (response?.success && Array.isArray(response?.data)) {
        setJobs(response.data);
      } else {
        setJobs([]);
      }
    } catch {
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await getConsumerJobsService(statusParam);
      if (response?.success && Array.isArray(response?.data)) {
        setJobs(response.data);
      } else {
        setJobs([]);
      }
    } catch {
      setJobs([]);
    } finally {
      setRefreshing(false);
    }
  }, [statusParam]);

  // Refetch jobs whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadJobs();
    }, [statusParam]),
  );

  // Also refetch when tab changes
  useEffect(() => {
    loadJobs();
  }, [statusParam]);

  const handleCompleteJob = async (jobId: string) => {
    Alert.alert("Mark as completed?", "This job will be moved to Completed.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Complete",
        style: "default",
        onPress: async () => {
          try {
            setCompletingJobId(jobId);
            const response = await completeConsumerJobService(jobId);

            if (!response?.success) {
              Alert.alert(
                "Unable to update",
                response?.message || "Try again.",
              );
              return;
            }

            setJobs((prev) => {
              if (activeTab === "Completed") return prev;

              if (activeTab === "All") {
                return prev.map((job) =>
                  job.id === jobId ? { ...job, status: "Completed" } : job,
                );
              }

              return prev.filter((job) => job.id !== jobId);
            });
          } catch {
            Alert.alert("Unable to update", "Failed to mark job as completed.");
          } finally {
            setCompletingJobId(null);
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
            onRefresh={handleRefresh}
            tintColor="#6C63FF"
            colors={["#6C63FF"]}
          />
        }
      >
        <View style={styles.header}>
          <Menu size={22} />
          <Text style={styles.logo}>Gigly</Text>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.title}>My Jobs</Text>

        <View style={styles.tabs}>
          {(["All", "Active", "Pending", "Completed"] as TabKey[]).map(
            (tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ),
          )}
          <Filter size={18} />
        </View>

        {isLoading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color="#6C63FF" />
            <Text style={styles.loadingText}>Loading your jobs...</Text>
          </View>
        ) : jobs.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyTitle}>No jobs found</Text>
            <Text style={styles.emptySub}>Try switching the tab filter.</Text>
          </View>
        ) : (
          jobs.map((job) => (
            <View key={job.id} style={styles.card}>
              <View style={styles.badge}>
                <Clock size={12} color="#6C63FF" />
                <Text style={styles.badgeText}>{job.status}</Text>
              </View>

              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.category}>{job.category.toUpperCase()}</Text>

              <View style={styles.providerRow}>
                <Image
                  source={{
                    uri:
                      job.imageUrl ||
                      "https://randomuser.me/api/portraits/men/2.jpg",
                  }}
                  style={styles.providerImg}
                />
                <View>
                  <Text style={styles.providerText}>{job.provider}</Text>
                  <Text style={styles.rating}>⭐ {job.rating}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.footer}>
                <View>
                  <Text style={styles.price}>{job.price}</Text>
                  <Text style={styles.sub}>
                    {job.dueDate
                      ? `Due ${new Date(job.dueDate).toLocaleDateString()}`
                      : "No deadline"}
                  </Text>
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity style={styles.chatBtn}>
                    <MessageCircle size={16} color="#6C63FF" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.doneBtn,
                      (job.status === "Completed" ||
                        completingJobId === job.id) &&
                        styles.doneBtnDisabled,
                    ]}
                    onPress={() => handleCompleteJob(job.id)}
                    disabled={
                      job.status === "Completed" || completingJobId === job.id
                    }
                  >
                    <CheckCircle size={16} color="#fff" />
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
    paddingBottom: 112,
  },

  loadingWrap: {
    marginTop: 40,
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    color: "#666",
    fontSize: 12,
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#6C63FF",
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 10,
  },

  tabs: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    gap: 8,
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  activeTab: {
    backgroundColor: "#6C63FF",
  },
  tabText: {
    fontSize: 12,
    color: "#666",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },

  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 4,
    backgroundColor: "#EDEBFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    color: "#6C63FF",
  },

  jobTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 8,
  },
  category: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },

  providerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  providerImg: {
    width: 34,
    height: 34,
    borderRadius: 20,
    marginRight: 8,
  },
  providerText: {
    fontWeight: "500",
  },
  rating: {
    fontSize: 11,
    color: "#666",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontSize: 18,
    fontWeight: "800",
  },
  sub: {
    fontSize: 11,
    color: "#999",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
  },

  chatBtn: {
    backgroundColor: "#F1F0FF",
    padding: 10,
    borderRadius: 10,
  },

  doneBtn: {
    backgroundColor: "#6C63FF",
    padding: 10,
    borderRadius: 10,
  },
  doneBtnDisabled: {
    opacity: 0.55,
  },
});
