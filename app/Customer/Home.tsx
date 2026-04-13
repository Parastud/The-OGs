import { useRouter } from "expo-router";
import { Bell, PlusCircle, Search, ShieldCheck } from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getConsumerDashboardService } from "@/src/services";

type Provider = {
  id: string;
  name: string;
  category: string;
  skills: string[];
  startingPrice: number | null;
  location: string;
  yearsOfExperience: number | null;
  verified: boolean;
  imageUrl: string;
};

type ProviderSection = {
  title: string;
  category: string;
  providers: Provider[];
};

type ConsumerDashboard = {
  greeting: string;
  stats: {
    totalSpent: number;
    jobsDone: number;
    completion: number;
    activeJobs: number;
  };
  trustScore: {
    score: number;
    badges: string[];
  };
  topCategories: Array<{
    category: string;
    providers: Provider[];
  }>;
};

// ─── MOCK FALLBACK DATA ───────────────────────────────────────────────

const MOCK_DASHBOARD: ConsumerDashboard = {
  greeting: "Good morning, Arjun 👋",
  stats: {
    totalSpent: 4250,
    jobsDone: 12,
    completion: 92,
    activeJobs: 2,
  },
  trustScore: {
    score: 78,
    badges: ["Verified", "Trusted Buyer", "5+ Jobs"],
  },
  topCategories: [
    {
      category: "Plumber",
      providers: [
        {
          id: "p1",
          name: "Ramesh K.",
          category: "Plumber",
          skills: ["Pipe Repair"],
          startingPrice: 350,
          location: "Mathura",
          yearsOfExperience: 6,
          verified: true,
          imageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
        },
        {
          id: "p2",
          name: "Sunil T.",
          category: "Plumber",
          skills: ["Drainage"],
          startingPrice: 400,
          location: "Mathura",
          yearsOfExperience: 4,
          verified: false,
          imageUrl: "https://randomuser.me/api/portraits/men/11.jpg",
        },
        {
          id: "p3",
          name: "Vivek D.",
          category: "Plumber",
          skills: ["Installation"],
          startingPrice: 300,
          location: "Mathura",
          yearsOfExperience: 8,
          verified: true,
          imageUrl: "https://randomuser.me/api/portraits/men/12.jpg",
        },
      ],
    },
    {
      category: "Electrician",
      providers: [
        {
          id: "e1",
          name: "Manoj P.",
          category: "Electrician",
          skills: ["Wiring"],
          startingPrice: 500,
          location: "Mathura",
          yearsOfExperience: 10,
          verified: true,
          imageUrl: "https://randomuser.me/api/portraits/men/20.jpg",
        },
        {
          id: "e2",
          name: "Deepak S.",
          category: "Electrician",
          skills: ["Panels"],
          startingPrice: 450,
          location: "Mathura",
          yearsOfExperience: 5,
          verified: true,
          imageUrl: "https://randomuser.me/api/portraits/men/21.jpg",
        },
        {
          id: "e3",
          name: "Harish V.",
          category: "Electrician",
          skills: ["Repairs"],
          startingPrice: 380,
          location: "Mathura",
          yearsOfExperience: 3,
          verified: false,
          imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
        },
      ],
    },
    {
      category: "AC Technician",
      providers: [
        {
          id: "a1",
          name: "Vikram T.",
          category: "AC Technician",
          skills: ["Servicing"],
          startingPrice: 600,
          location: "Mathura",
          yearsOfExperience: 7,
          verified: true,
          imageUrl: "https://randomuser.me/api/portraits/men/30.jpg",
        },
        {
          id: "a2",
          name: "Santosh M.",
          category: "AC Technician",
          skills: ["Repair"],
          startingPrice: 550,
          location: "Mathura",
          yearsOfExperience: 5,
          verified: false,
          imageUrl: "https://randomuser.me/api/portraits/men/31.jpg",
        },
      ],
    },
    {
      category: "Home Cleaner",
      providers: [
        {
          id: "c1",
          name: "Priya R.",
          category: "Home Cleaner",
          skills: ["Deep Clean"],
          startingPrice: 650,
          location: "Mathura",
          yearsOfExperience: 3,
          verified: true,
          imageUrl: "https://randomuser.me/api/portraits/women/10.jpg",
        },
        {
          id: "c2",
          name: "Neha S.",
          category: "Home Cleaner",
          skills: ["Regular"],
          startingPrice: 400,
          location: "Mathura",
          yearsOfExperience: 2,
          verified: false,
          imageUrl: "https://randomuser.me/api/portraits/women/11.jpg",
        },
        {
          id: "c3",
          name: "Anita V.",
          category: "Home Cleaner",
          skills: ["Post-Reno"],
          startingPrice: 750,
          location: "Mathura",
          yearsOfExperience: 5,
          verified: true,
          imageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
        },
      ],
    },
    {
      category: "Tutor",
      providers: [
        {
          id: "t1",
          name: "Rohit A.",
          category: "Tutor",
          skills: ["Math", "Science"],
          startingPrice: 800,
          location: "Mathura",
          yearsOfExperience: 4,
          verified: true,
          imageUrl: "https://randomuser.me/api/portraits/men/40.jpg",
        },
        {
          id: "t2",
          name: "Kavya M.",
          category: "Tutor",
          skills: ["English"],
          startingPrice: 700,
          location: "Mathura",
          yearsOfExperience: 6,
          verified: true,
          imageUrl: "https://randomuser.me/api/portraits/women/40.jpg",
        },
      ],
    },
  ],
};

const fallbackSections: ProviderSection[] = [
  { title: "Plumber", category: "Plumber", providers: [] },
  { title: "Electrician", category: "Electrician", providers: [] },
  { title: "AC Technician", category: "AC Technician", providers: [] },
  { title: "Home Cleaner", category: "Home Cleaner", providers: [] },
  { title: "Tutor", category: "Tutor", providers: [] },
];

export default function HomeScreen() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<ConsumerDashboard | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(3);

  async function loadDashboard(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    try {
      const response = await getConsumerDashboardService();
      if (response?.success && response?.data) {
        setDashboardData(response.data);
      } else {
        setDashboardData(MOCK_DASHBOARD);
      }
    } catch {
      setDashboardData(MOCK_DASHBOARD);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const providerSections = useMemo(() => {
    if (!dashboardData?.topCategories?.length) return fallbackSections;
    const sections = dashboardData.topCategories.map((s) => ({
      title: s.category,
      category: s.category,
      providers: s.providers,
    }));
    return sections.length >= 5
      ? sections.slice(0, 5)
      : [...sections, ...fallbackSections.slice(sections.length)].slice(0, 5);
  }, [dashboardData]);

  function handleBell() {
    setUnreadNotifs(0);
    router.push("/Customer/NotificationsScreen");
  }

  function handleSeeAll(category: string) {
    router.push({ pathname: "/Customer/SearchScreen", params: { category } });
  }

  function handleProviderPress(item: Provider) {
    router.push({
      pathname: "/Customer/ProviderDetailScreen",
      params: { id: item.id },
    });
  }

  function handleStatPress(label: string) {
    if (label === "Active") router.push("/Customer/MyJobsScreen");
    else if (label === "Jobs done") router.push("/Customer/MyJobsScreen");
    else Alert.alert(label, "Detailed breakdown coming soon.");
  }

  function handleTrustScore() {
    Alert.alert(
      "Trust Score",
      `Your score is ${dashboardData?.trustScore.score}/100.\n\nComplete more jobs and get reviews to improve it.`,
      [{ text: "OK" }],
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingState}>
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text style={styles.loadingText}>Loading dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadDashboard(true)}
            tintColor="#6C63FF"
            colors={["#6C63FF"]}
          />
        }
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.location}>📍 Mathura, UP</Text>
            <Text style={styles.logo}>Gigly</Text>
          </View>
          <TouchableOpacity onPress={handleBell} style={styles.bellWrap}>
            <Bell size={20} color="#333" />
            {unreadNotifs > 0 && (
              <View style={styles.bellBadge}>
                <Text style={styles.bellBadgeText}>
                  {unreadNotifs > 9 ? "9+" : unreadNotifs}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <TouchableOpacity
          style={styles.searchBox}
          activeOpacity={0.8}
          onPress={() => router.push("/Customer/SearchScreen")}
        >
          <Search size={18} color="#999" />
          <Text style={styles.searchText}>What do you need help with?</Text>
        </TouchableOpacity>

        {/* GREETING */}
        <View style={styles.greetingBlock}>
          <Text style={styles.greeting}>{dashboardData!.greeting}</Text>
          <Text style={styles.subtitle}>
            Here are the top provider categories matched for your area.
          </Text>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          {[
            {
              label: "Spent",
              value: `₹${dashboardData!.stats.totalSpent.toLocaleString("en-IN")}`,
            },
            { label: "Jobs done", value: `${dashboardData!.stats.jobsDone}` },
            {
              label: "Completion",
              value: `${dashboardData!.stats.completion}%`,
            },
            { label: "Active", value: `${dashboardData!.stats.activeJobs}` },
          ].map((s) => (
            <TouchableOpacity
              key={s.label}
              style={styles.statCard}
              onPress={() => handleStatPress(s.label)}
              activeOpacity={0.75}
            >
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={styles.statValue} numberOfLines={1}>
                {s.value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TRUST SCORE */}
        <TouchableOpacity
          style={styles.trustCard}
          onPress={handleTrustScore}
          activeOpacity={0.85}
        >
          <View style={styles.trustHeader}>
            <View style={styles.trustTitleRow}>
              <ShieldCheck size={18} color="#6C63FF" />
              <Text style={styles.trustTitle}>Trust Score</Text>
            </View>
            <Text style={styles.trustScore}>
              {dashboardData!.trustScore.score}/100
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(100, Math.max(0, dashboardData!.trustScore.score))}%`,
                },
              ]}
            />
          </View>
          <View style={styles.badgesRow}>
            {dashboardData!.trustScore.badges.map((badge) => (
              <View key={badge} style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>

        {/* PROVIDER SECTIONS */}
        {providerSections.map((section) => (
          <View key={section.title}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <TouchableOpacity onPress={() => handleSeeAll(section.category)}>
                <Text style={styles.link}>See all →</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={section.providers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ProviderCard
                  item={item}
                  onPress={() => handleProviderPress(item)}
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
              ListEmptyComponent={
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyEmoji}>🔍</Text>
                  <Text style={styles.emptyText}>No providers yet</Text>
                </View>
              }
            />
          </View>
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/Customer/PostJobScreen")}
        activeOpacity={0.85}
      >
        <PlusCircle color="#fff" size={28} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ─── COMPONENTS ──────────────────────────────────────────────────────

const ProviderCard = ({
  item,
  onPress,
}: {
  item: Provider;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={styles.providerCard}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.providerImgWrap}>
      <Image
        source={{
          uri:
            item.imageUrl ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=6C63FF&color=fff`,
        }}
        style={styles.avatar}
      />
      {item.verified && (
        <View style={styles.verifiedBadge}>
          <Text style={styles.verifiedText}>✓</Text>
        </View>
      )}
    </View>
    <Text style={styles.providerName} numberOfLines={1}>
      {item.name}
    </Text>
    <Text style={styles.providerMeta}>{item.category}</Text>
    <Text style={styles.rating}>
      {item.yearsOfExperience ?? 0} yrs exp •{" "}
      <Text style={{ color: item.verified ? "#16A34A" : "#999" }}>
        {item.verified ? "Verified" : "Member"}
      </Text>
    </Text>
    <Text style={styles.price}>
      FROM {item.startingPrice ? `₹${item.startingPrice}` : "—"}
    </Text>
  </TouchableOpacity>
);

// ─── STYLES ──────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB" },
  contentContainer: { paddingBottom: 112 },

  loadingState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: { color: "#666" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "flex-start",
  },
  location: { color: "#555", fontSize: 12 },
  logo: { fontWeight: "bold", fontSize: 18, color: "#111" },

  bellWrap: { position: "relative", padding: 4 },
  bellBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#EF4444",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  bellBadgeText: { color: "#fff", fontSize: 9, fontWeight: "700" },

  searchBox: {
    flexDirection: "row",
    backgroundColor: "#EFEFF4",
    marginHorizontal: 16,
    marginTop: 4,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  searchText: { marginLeft: 8, color: "#999" },

  greetingBlock: { paddingHorizontal: 16, marginTop: 14 },
  greeting: { fontSize: 20, fontWeight: "700", color: "#111" },
  subtitle: { marginTop: 6, color: "#666", lineHeight: 20 },

  statsRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  statCard: {
    flex: 1,
    minWidth: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  statLabel: { color: "#666", fontSize: 10 },
  statValue: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "700",
    color: "#111",
  },

  trustCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
  },
  trustHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trustTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  trustTitle: { fontSize: 15, fontWeight: "700", color: "#111" },
  trustScore: { fontSize: 15, fontWeight: "700", color: "#6C63FF" },
  progressTrack: {
    marginTop: 10,
    height: 8,
    backgroundColor: "#EEF0F6",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#6C63FF",
    borderRadius: 999,
  },
  badgesRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F4F2FF",
  },
  badgeText: { fontSize: 12, color: "#4F46E5" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#111" },
  link: { color: "#6C63FF", fontSize: 12 },

  providerCard: {
    backgroundColor: "#fff",
    padding: 12,
    marginLeft: 16,
    marginTop: 10,
    borderRadius: 14,
    width: 160,
  },
  providerImgWrap: { position: "relative", alignSelf: "flex-start" },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  verifiedText: { color: "#fff", fontSize: 9, fontWeight: "800" },
  providerName: {
    fontWeight: "600",
    marginTop: 8,
    color: "#111",
    fontSize: 13,
  },
  providerMeta: { fontSize: 11, color: "#666", marginTop: 2 },
  rating: { fontSize: 11, color: "#888", marginTop: 4 },
  price: { fontSize: 11, color: "#6C63FF", marginTop: 6, fontWeight: "600" },

  emptyCard: {
    marginLeft: 16,
    marginTop: 10,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "#fff",
    width: 180,
    alignItems: "center",
    gap: 6,
  },
  emptyEmoji: { fontSize: 28 },
  emptyText: { color: "#999", fontSize: 12 },

  fab: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#6C63FF",
    padding: 16,
    borderRadius: 50,
    shadowColor: "#6C63FF",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
});
