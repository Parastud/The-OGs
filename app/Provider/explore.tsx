import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

import { ScreenWrapper } from "@/src/components/wrapper";
import { COLORS } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";
import { MapPin, Search, SlidersHorizontal } from "lucide-react-native";
import { useDeferredValue, useEffect, useState } from "react";
import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";

const CATEGORIES = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "AC Repair",
  "Carpentry",
];

export default function ExploreScreen() {
  const { getAvailableJobs, isLoading } = useProviderApi();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    const loadJobs = async () => {
      const filters: any = {};
      if (activeCategory) filters.category = activeCategory;
      if (deferredSearchQuery) filters.search = deferredSearchQuery;

      const jobsData = await getAvailableJobs(filters);
      if (jobsData) {
        setJobs(jobsData);
      }
    };

    loadJobs();
  }, [activeCategory, deferredSearchQuery, getAvailableJobs]);

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
        <View
          style={[styles.searchBox, searchFocused && styles.searchBoxFocused]}
        >
          <Search size={17} color={COLORS.textTertiary} />
          <TextInput
            placeholder="Search jobs..."
            placeholderTextColor={COLORS.textTertiary}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
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
              <Text
                style={[
                  styles.categoryText,
                  active && styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Jobs List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : jobs.length > 0 ? (
        jobs.map((job) => (
          <View key={job.id} style={styles.jobCard}>
            <View style={styles.jobTop}>
              <Image source={{ uri: job.imageUrl }} style={styles.jobImage} />
              <View style={styles.jobInfo}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <View style={styles.jobDistance}>
                  <MapPin size={12} color={COLORS.textSecondary} />
                  <Text style={styles.distanceText}>{job.distance}</Text>
                </View>
              </View>
            </View>

            <View style={styles.jobFooter}>
              <Text style={styles.jobPrice}>{job.price}</Text>
              <View style={styles.matchBadge}>
                <Text style={styles.matchText}>{job.match}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.bidBtn} activeOpacity={0.7}>
              <Text style={styles.bidBtnText}>View & Bid</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No jobs available</Text>
          <Text style={styles.emptySubText}>
            Try a different category or search
          </Text>
        </View>
      )}
    </ScreenWrapper>
  );
}

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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.BOLD,
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
    marginVertical: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchBoxFocused: {
    borderColor: COLORS.primary,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoriesList: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 12,
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textSecondary,
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  jobCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  jobTop: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  jobImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceSecondary,
  },
  jobInfo: {
    flex: 1,
    justifyContent: "center",
  },
  jobTitle: {
    fontSize: 14,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  jobDistance: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  distanceText: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },
  jobFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  jobPrice: {
    fontSize: 13,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.primary,
  },
  matchBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  matchText: {
    fontSize: 11,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.success,
  },
  bidBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  bidBtnText: {
    fontSize: 13,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.white,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 13,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },
});
