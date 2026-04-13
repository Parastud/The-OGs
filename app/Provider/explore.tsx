import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Search, MapPin } from "lucide-react-native";

import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";
import { ScreenWrapper } from "@/src/components/wrapper";
import { COLORS } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";

type ExploreJob = {
  id: string;
  title: string;
  distance: string;
  price: string;
  match: number;
  imageUrl?: string;
  category?: string;
  hasBid?: boolean;
};

const ALL_CATEGORY = "All";

export default function Explore() {
  const { getAvailableJobs, getCategories, isLoading } = useProviderApi();
  const [jobs, setJobs] = useState<ExploreJob[]>([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchCategories = useCallback(async () => {
    const apiCategories = await getCategories();
    setCategories(
      Array.isArray(apiCategories)
        ? [ALL_CATEGORY, ...apiCategories]
        : [ALL_CATEGORY],
    );
  }, [getCategories]);

  const fetchJobs = useCallback(async () => {
    const data = await getAvailableJobs({
      search: query.trim() || undefined,
      category: activeCategory === ALL_CATEGORY ? undefined : activeCategory,
    });

    if (!Array.isArray(data)) {
      setJobs([]);
      return;
    }

    const normalizedJobs: ExploreJob[] = data.map((job: any) => ({
      id: String(job?.id || ""),
      title: String(job?.title || "Untitled Job"),
      distance: String(job?.distance || "2.4 km"),
      price: String(job?.price || "₹0 - ₹0"),
      match:
        typeof job?.match === "number"
          ? job.match
          : Number.parseInt(String(job?.match || "94"), 10) || 94,
      imageUrl: typeof job?.imageUrl === "string" ? job.imageUrl : undefined,
      category: typeof job?.category === "string" ? job.category : undefined,
      hasBid: Boolean(job?.hasBid),
    }));

    setJobs(normalizedJobs);
  }, [activeCategory, getAvailableJobs, query]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const visibleCategories = useMemo(() => {
    if (categories.length > 0) return categories;
    return [ALL_CATEGORY];
  }, [categories]);

  return (
    <ScreenWrapper onRefresh={fetchJobs}>
      {/* Header */}
      <LinearGradient colors={["#6D5DF6", "#8B7BFF"]} style={styles.header}>
        <Text style={styles.headerTitle}>Explore Jobs</Text>

        <Text style={styles.headerSubtitle}>Find work near you</Text>
      </LinearGradient>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBox}>
          <Search size={18} color="#888" />

          <TextInput
            placeholder="Search jobs..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            onSubmitEditing={fetchJobs}
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryRow}
      >
        {visibleCategories.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryChip,
              activeCategory === item && styles.categoryChipActive,
            ]}
            onPress={() => setActiveCategory(item)}
          >
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Jobs */}
      <View style={{ paddingBottom: 120 }}>
        {isLoading ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : jobs.length > 0 ? (
          jobs.map((item) => (
            <View key={item.id} style={styles.jobCard}>
              <View style={styles.jobTop}>
                <Image
                  source={{ uri: item.imageUrl || "https://picsum.photos/200" }}
                  style={styles.jobImage}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.jobTitle}>{item.title}</Text>
                  <View style={styles.jobMeta}>
                    <MapPin size={14} color="#888" />
                    <Text style={styles.distance}>{item.distance}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.jobFooter}>
                <Text style={styles.price}>{item.price}</Text>
                <View style={styles.badgesRow}>
                  {item.hasBid && (
                    <View style={styles.bidPlacedBadge}>
                      <Text style={styles.bidPlacedText}>Bid Placed</Text>
                    </View>
                  )}
                  <View style={styles.matchBadge}>
                    <Text style={styles.matchText}>{item.match}%</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.bidBtn}
                onPress={() =>
                  router.push({
                    pathname: "/Provider/job/[id]",
                    params: { id: item.id },
                  })
                }
              >
                <Text style={styles.bidText}>
                  {item.hasBid ? "View Bid" : "View & Bid"}
                </Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyTitle}>No jobs found</Text>
            <Text style={styles.emptySubTitle}>
              Try changing the category or search keyword.
            </Text>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 24,
    fontFamily: FONTS.BOLD,
    color: "#fff",
  },

  headerSubtitle: {
    color: "#fff",
    marginTop: 4,
  },

  searchWrapper: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    marginTop: -30,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#000",
  },

  filterBtn: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },

  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginVertical: 8,
    gap: 10,
  },

  categoryScroll: {
    marginBottom: 8,
    maxHeight: 56,
  },

  categoryChip: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },

  categoryChipActive: {
    backgroundColor: "#E7E2FF",
  },

  categoryText: {
    fontFamily: FONTS.SEMIBOLD,
  },

  jobCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },

  jobTop: {
    flexDirection: "row",
    gap: 12,
  },

  jobImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },

  jobTitle: {
    fontFamily: FONTS.SEMIBOLD,
    fontSize: 15,
  },

  jobMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },

  distance: {
    color: "#888",
  },

  jobFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  badgesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  price: {
    fontFamily: FONTS.BOLD,
    color: COLORS.primary,
  },

  matchBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  matchText: {
    color: "#16A34A",
    fontFamily: FONTS.SEMIBOLD,
  },

  bidPlacedBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  bidPlacedText: {
    color: "#1D4ED8",
    fontFamily: FONTS.SEMIBOLD,
    fontSize: 12,
  },

  bidBtn: {
    backgroundColor: COLORS.primary,
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  bidText: {
    color: "#fff",
    fontFamily: FONTS.SEMIBOLD,
  },

  loaderWrap: {
    marginTop: 40,
    alignItems: "center",
  },

  emptyWrap: {
    alignItems: "center",
    marginTop: 48,
    paddingHorizontal: 20,
  },

  emptyTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    color: "#232323",
  },

  emptySubTitle: {
    marginTop: 8,
    color: "#777",
    textAlign: "center",
  },
});
