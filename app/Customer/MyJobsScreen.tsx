import {
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Menu,
  MessageCircle
} from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Status = "In Progress" | "Completed" | "Pending";

type Job = {
  id: string;
  title: string;
  category: string;
  status: Status;
  provider: string;
  providerAvatar: string;
  rating: string;
  price: string;
  dueLabel: string;
};

const ALL_JOBS: Job[] = [
  {
    id: "1",
    title: "Deep Cleaning Service",
    category: "HOME MAINTENANCE",
    status: "In Progress",
    provider: "Rahul K.",
    providerAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: "4.8",
    price: "₹650",
    dueLabel: "Due today",
  },
  {
    id: "2",
    title: "Assemble IKEA Wardrobe",
    category: "CARPENTRY",
    status: "In Progress",
    provider: "Sarah M.",
    providerAvatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: "4.9",
    price: "₹1,200",
    dueLabel: "Due today",
  },
  {
    id: "3",
    title: "Fix Leaking Kitchen Tap",
    category: "PLUMBING",
    status: "Pending",
    provider: "Amit S.",
    providerAvatar: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: "4.6",
    price: "₹400",
    dueLabel: "Scheduled tomorrow",
  },
  {
    id: "4",
    title: "Painting Living Room",
    category: "PAINTING",
    status: "Pending",
    provider: "Priya V.",
    providerAvatar: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: "4.7",
    price: "₹2,500",
    dueLabel: "Scheduled 28 Oct",
  },
  {
    id: "5",
    title: "AC Service & Repair",
    category: "ELECTRICAL",
    status: "Completed",
    provider: "Vikram T.",
    providerAvatar: "https://randomuser.me/api/portraits/men/6.jpg",
    rating: "5.0",
    price: "₹850",
    dueLabel: "Completed 20 Oct",
  },
  {
    id: "6",
    title: "Garden Trimming",
    category: "GARDENING",
    status: "Completed",
    provider: "Neha R.",
    providerAvatar: "https://randomuser.me/api/portraits/women/7.jpg",
    rating: "4.8",
    price: "₹500",
    dueLabel: "Completed 18 Oct",
  },
];

const TAB_FILTERS: Record<string, Status[]> = {
  All: ["In Progress", "Pending", "Completed"],
  Active: ["In Progress"],
  Pending: ["Pending"],
  Completed: ["Completed"],
};

const STATUS_CONFIG: Record<Status, { color: string; bg: string; icon: any }> = {
  "In Progress": { color: "#6C63FF", bg: "#EDEBFF", icon: Clock },
  Pending: { color: "#F59E0B", bg: "#FEF3C7", icon: AlertCircle },
  Completed: { color: "#10B981", bg: "#D1FAE5", icon: CheckCircle },
};

const SORT_OPTIONS = ["Newest First", "Price: Low to High", "Price: High to Low", "Rating"];

export default function MyJobsScreen() {
  const [activeTab, setActiveTab] = useState("Active");
  const [jobs, setJobs] = useState<Job[]>(ALL_JOBS);
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState("Newest First");

  const visibleJobs = (() => {
    const statuses = TAB_FILTERS[activeTab];
    const filtered = jobs.filter((j) => statuses.includes(j.status));
    if (sortBy === "Price: Low to High")
      return [...filtered].sort((a, b) => parseFloat(a.price.replace(/[₹,]/g, "")) - parseFloat(b.price.replace(/[₹,]/g, "")));
    if (sortBy === "Price: High to Low")
      return [...filtered].sort((a, b) => parseFloat(b.price.replace(/[₹,]/g, "")) - parseFloat(a.price.replace(/[₹,]/g, "")));
    if (sortBy === "Rating")
      return [...filtered].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    return filtered;
  })();

  const tabCounts = Object.fromEntries(
    Object.entries(TAB_FILTERS).map(([tab, statuses]) => [
      tab,
      jobs.filter((j) => statuses.includes(j.status)).length,
    ])
  );

  function markDone(id: string) {
    Alert.alert("Mark as Complete", "Confirm the job is finished?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes, Complete",
        onPress: () =>
          setJobs((prev) =>
            prev.map((j) =>
              j.id === id
                ? { ...j, status: "Completed", dueLabel: "Completed just now" }
                : j
            )
          ),
      },
    ]);
  }

  function openChat(provider: string) {
    Alert.alert("Chat", `Opening chat with ${provider}…`);
  }

  function cancelJob(id: string) {
    Alert.alert("Cancel Job", "Are you sure you want to cancel this job?", [
      { text: "No", style: "cancel" },
      {
        text: "Cancel Job",
        style: "destructive",
        onPress: () => setJobs((prev) => prev.filter((j) => j.id !== id)),
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => Alert.alert("Menu")}>
            <Menu size={22} color="#333" />
          </TouchableOpacity>
          <Text style={styles.logo}>Gigly</Text>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
            style={styles.avatar}
          />
        </View>

        {/* TITLE + COUNT */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>My Jobs</Text>
          <View style={styles.totalBadge}>
            <Text style={styles.totalBadgeText}>{jobs.length} total</Text>
          </View>
        </View>

        {/* TABS */}
        <View style={styles.tabs}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
            <View style={styles.tabsInner}>
              {["All", "Active", "Pending", "Completed"].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[styles.tab, activeTab === tab && styles.activeTab]}
                >
                  <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                    {tab}
                  </Text>
                  {tabCounts[tab] > 0 && (
                    <View style={[styles.tabCount, activeTab === tab && styles.tabCountActive]}>
                      <Text style={[styles.tabCountText, activeTab === tab && { color: "#6C63FF" }]}>
                        {tabCounts[tab]}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity
            style={[styles.filterBtn, showFilter && styles.filterBtnActive]}
            onPress={() => setShowFilter(true)}
          >
            <Filter size={15} color={showFilter ? "#6C63FF" : "#666"} />
          </TouchableOpacity>
        </View>

        {/* SORT LABEL */}
        {sortBy !== "Newest First" && (
          <View style={styles.sortLabel}>
            <Text style={styles.sortLabelText}>Sorted by: {sortBy}</Text>
            <TouchableOpacity onPress={() => setSortBy("Newest First")}>
              <Text style={styles.clearSort}>✕ Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* JOB CARDS */}
        {visibleJobs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>No {activeTab.toLowerCase()} jobs</Text>
            <Text style={styles.emptySubtext}>Jobs you post will appear here.</Text>
          </View>
        ) : (
          visibleJobs.map((job) => {
            const cfg = STATUS_CONFIG[job.status];
            const StatusIcon = cfg.icon;
            const isActive = job.status === "In Progress";
            const isPending = job.status === "Pending";

            return (
              <View key={job.id} style={styles.card}>
                {/* STATUS BADGE */}
                <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
                  <StatusIcon size={11} color={cfg.color} />
                  <Text style={[styles.badgeText, { color: cfg.color }]}>{job.status}</Text>
                </View>

                {/* TITLE */}
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.category}>{job.category}</Text>

                {/* PROVIDER */}
                <View style={styles.providerRow}>
                  <Image source={{ uri: job.providerAvatar }} style={styles.providerImg} />
                  <View>
                    <Text style={styles.providerText}>{job.provider}</Text>
                    <Text style={styles.rating}>⭐ {job.rating}</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                {/* FOOTER */}
                <View style={styles.footer}>
                  <View>
                    <Text style={styles.price}>{job.price}</Text>
                    <Text style={styles.sub}>{job.dueLabel}</Text>
                  </View>

                  <View style={styles.actions}>
                    {/* Chat — shown for active & pending */}
                    {(isActive || isPending) && (
                      <TouchableOpacity
                        style={styles.chatBtn}
                        onPress={() => openChat(job.provider)}
                      >
                        <MessageCircle size={16} color="#6C63FF" />
                      </TouchableOpacity>
                    )}

                    {/* Mark done — only for In Progress */}
                    {isActive && (
                      <TouchableOpacity
                        style={styles.doneBtn}
                        onPress={() => markDone(job.id)}
                      >
                        <CheckCircle size={16} color="#fff" />
                      </TouchableOpacity>
                    )}

                    {/* Cancel — only for Pending */}
                    {isPending && (
                      <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={() => cancelJob(job.id)}
                      >
                        <Text style={styles.cancelBtnText}>Cancel</Text>
                      </TouchableOpacity>
                    )}

                    {/* Review — only for Completed */}
                    {job.status === "Completed" && (
                      <TouchableOpacity
                        style={styles.reviewBtn}
                        onPress={() => Alert.alert("Leave a Review", `Rate your experience with ${job.provider}`)}
                      >
                        <Text style={styles.reviewBtnText}>Review</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* FILTER MODAL */}
      <Modal visible={showFilter} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFilter(false)}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Sort & Filter</Text>
            {SORT_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={styles.sortOption}
                onPress={() => { setSortBy(opt); setShowFilter(false); }}
              >
                <Text style={[styles.sortOptionText, sortBy === opt && { color: "#6C63FF", fontWeight: "600" }]}>
                  {opt}
                </Text>
                {sortBy === opt && <CheckCircle size={16} color="#6C63FF" />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6FA", paddingHorizontal: 16 },
  contentContainer: { paddingBottom: 112 },

  header: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginTop: 4,
  },
  logo: { fontWeight: "bold", fontSize: 18, color: "#6C63FF" },
  avatar: { width: 34, height: 34, borderRadius: 17 },

  titleRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12 },
  title: { fontSize: 24, fontWeight: "800", color: "#111" },
  totalBadge: {
    backgroundColor: "#EDEBFF", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10,
  },
  totalBadgeText: { fontSize: 11, color: "#6C63FF", fontWeight: "600" },

  tabs: { flexDirection: "row", alignItems: "center", marginTop: 12, gap: 8 },
  tabsInner: { flexDirection: "row", gap: 6 },
  tab: {
    flexDirection: "row", alignItems: "center", gap: 4,
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: 20, backgroundColor: "#eee",
  },
  activeTab: { backgroundColor: "#6C63FF" },
  tabText: { fontSize: 12, color: "#666" },
  activeTabText: { color: "#fff", fontWeight: "600" },
  tabCount: {
    backgroundColor: "#fff", borderRadius: 8,
    paddingHorizontal: 5, paddingVertical: 1, minWidth: 18, alignItems: "center",
  },
  tabCountActive: { backgroundColor: "#EDEBFF" },
  tabCountText: { fontSize: 10, color: "#999", fontWeight: "600" },
  filterBtn: {
    padding: 8, borderRadius: 10,
    backgroundColor: "#eee", alignItems: "center", justifyContent: "center",
  },
  filterBtnActive: { backgroundColor: "#EDEBFF" },

  sortLabel: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    marginTop: 10, paddingHorizontal: 2,
  },
  sortLabelText: { fontSize: 11, color: "#999" },
  clearSort: { fontSize: 11, color: "#6C63FF" },

  emptyState: { alignItems: "center", marginTop: 60, gap: 8 },
  emptyIcon: { fontSize: 40 },
  emptyText: { fontSize: 16, fontWeight: "700", color: "#333" },
  emptySubtext: { fontSize: 13, color: "#999" },

  card: {
    backgroundColor: "#fff", borderRadius: 16, padding: 16, marginTop: 14,
    shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, elevation: 4,
  },
  badge: {
    alignSelf: "flex-start", flexDirection: "row", gap: 4,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10,
  },
  badgeText: { fontSize: 10, fontWeight: "600" },
  jobTitle: { fontSize: 16, fontWeight: "700", marginTop: 8, color: "#111" },
  category: { fontSize: 11, color: "#999", marginTop: 2 },
  providerRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  providerImg: { width: 34, height: 34, borderRadius: 17, marginRight: 8 },
  providerText: { fontWeight: "500", color: "#333" },
  rating: { fontSize: 11, color: "#666", marginTop: 1 },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 10 },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  price: { fontSize: 18, fontWeight: "800", color: "#111" },
  sub: { fontSize: 11, color: "#999", marginTop: 1 },
  actions: { flexDirection: "row", gap: 8, alignItems: "center" },

  chatBtn: { backgroundColor: "#F1F0FF", padding: 10, borderRadius: 10 },
  doneBtn: { backgroundColor: "#6C63FF", padding: 10, borderRadius: 10 },
  cancelBtn: {
    paddingHorizontal: 14, paddingVertical: 9, borderRadius: 10,
    borderWidth: 1, borderColor: "#FCA5A5", backgroundColor: "#FEF2F2",
  },
  cancelBtnText: { fontSize: 13, color: "#EF4444", fontWeight: "500" },
  reviewBtn: {
    paddingHorizontal: 14, paddingVertical: 9, borderRadius: 10,
    backgroundColor: "#D1FAE5",
  },
  reviewBtnText: { fontSize: 13, color: "#059669", fontWeight: "500" },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  modalSheet: {
    backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 20, paddingBottom: 36,
  },
  modalHandle: {
    width: 36, height: 4, backgroundColor: "#ddd",
    borderRadius: 2, alignSelf: "center", marginBottom: 16,
  },
  modalTitle: { fontSize: 16, fontWeight: "700", marginBottom: 14, color: "#111" },
  sortOption: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#F1F1F1",
  },
  sortOptionText: { fontSize: 14, color: "#333" },
});
