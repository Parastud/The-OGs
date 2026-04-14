import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, MessageCircle, ShieldCheck } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getConsumerProviderDetailsService } from "@/src/services";

type ProviderDetails = {
  id: string;
  name: string;
  category: string;
  bio: string;
  imageUrl: string;
  location: string;
  verified: boolean;
  yearsOfExperience: number | null;
  startingPrice: number | null;
  skills: string[];
  languagesSpoken: string[];
  aiScore?: number | null;
  aiFeedback?: string;
  availability: {
    availableDays: string[];
    preferredWorkHours: string[];
  };
  stats: {
    completedJobs: number;
    totalBids: number;
    acceptedBids: number;
    acceptanceRate: number;
  };
};

export default function ProviderDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<ProviderDetails | null>(null);

  const loadProviderDetails = useCallback(async () => {
    if (!id) {
      setError("Provider ID is missing.");
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      const response = await getConsumerProviderDetailsService(id);
      if (response?.success && response?.data) {
        setProvider(response.data);
        return;
      }

      setError(response?.message || "Could not load provider details.");
    } catch {
      setError("Could not load provider details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProviderDetails();
  }, [loadProviderDetails]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#111" />
        </TouchableOpacity>
        <Text style={styles.title}>Provider Profile</Text>
      </View>

      {isLoading ? (
        <View style={styles.centerWrap}>
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text style={styles.stateText}>Loading provider details...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerWrap}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={loadProviderDetails}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : provider ? (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileCard}>
            <Image
              source={{
                uri:
                  provider.imageUrl ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=6C63FF&color=fff`,
              }}
              style={styles.avatar}
            />

            <View style={styles.profileTextWrap}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{provider.name}</Text>
                {provider.verified ? (
                  <View style={styles.verifiedPill}>
                    <ShieldCheck size={12} color="#4F46E5" />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                ) : null}
              </View>

              <Text style={styles.meta}>
                {provider.category || "General Services"}
              </Text>
              <Text style={styles.meta}>
                {provider.location || "Location not shared"}
              </Text>
              <Text style={styles.meta}>
                {provider.yearsOfExperience ?? 0} yrs exp • Starts from{" "}
                {provider.startingPrice
                  ? `INR ${provider.startingPrice}`
                  : "N/A"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.chatCta}
            onPress={() =>
              router.push({
                pathname: "/Customer/ChatScreen",
                params: {
                  otherUserId: provider.id,
                  otherUserName: provider.name,
                  conversationType: "direct",
                },
              })
            }
          >
            <MessageCircle size={18} color="#fff" />
            <Text style={styles.chatCtaText}>Message provider</Text>
          </TouchableOpacity>

          <View style={styles.aiCard}>
            <View style={styles.aiHeader}>
              <View style={styles.aiBadge}>
                <Text style={styles.aiBadgeText}>AI</Text>
              </View>
              <View style={styles.aiHeaderTextWrap}>
                <Text style={styles.aiTitle}>AI Score & Feedback</Text>
                <Text style={styles.aiSubtitle}>
                  Generated once and stored for future visits
                </Text>
              </View>
              <Text style={styles.aiScoreValue}>
                {provider.aiScore ?? "--"}/100
              </Text>
            </View>

            <View style={styles.aiProgressTrack}>
              <View
                style={[
                  styles.aiProgressFill,
                  { width: `${provider.aiScore ?? 0}%` },
                ]}
              />
            </View>

            <Text style={styles.aiFeedbackText}>
              {provider.aiFeedback ||
                "AI feedback will appear here after the first profile analysis."}
            </Text>
          </View>

          {provider.bio ? (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.bodyText}>{provider.bio}</Text>
            </View>
          ) : null}

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Highlights</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {provider.stats.completedJobs}
                </Text>
                <Text style={styles.statLabel}>Jobs Done</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {provider.stats.acceptanceRate}%
                </Text>
                <Text style={styles.statLabel}>Acceptance</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{provider.stats.totalBids}</Text>
                <Text style={styles.statLabel}>Total Bids</Text>
              </View>
            </View>
          </View>

          {provider.skills?.length ? (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <Text style={styles.bodyText}>{provider.skills.join(" • ")}</Text>
            </View>
          ) : null}

          {provider.languagesSpoken?.length ? (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Languages</Text>
              <Text style={styles.bodyText}>
                {provider.languagesSpoken.join(", ")}
              </Text>
            </View>
          ) : null}

          {provider.availability.availableDays?.length ||
          provider.availability.preferredWorkHours?.length ? (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Availability</Text>
              {provider.availability.availableDays?.length ? (
                <Text style={styles.bodyText}>
                  Days: {provider.availability.availableDays.join(", ")}
                </Text>
              ) : null}
              {provider.availability.preferredWorkHours?.length ? (
                <Text style={styles.bodyText}>
                  Hours: {provider.availability.preferredWorkHours.join(", ")}
                </Text>
              ) : null}
            </View>
          ) : null}
        </ScrollView>
      ) : (
        <View style={styles.centerWrap}>
          <Text style={styles.stateText}>No provider data found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  centerWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 12,
  },
  stateText: {
    color: "#666",
  },
  errorText: {
    color: "#B42318",
    textAlign: "center",
  },
  retryBtn: {
    backgroundColor: "#111827",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
    gap: 12,
  },
  chatCta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#6C63FF",
    borderRadius: 14,
    paddingVertical: 14,
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },
  chatCtaText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  aiCard: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  aiBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6C63FF",
  },
  aiBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },
  aiHeaderTextWrap: {
    flex: 1,
    gap: 2,
  },
  aiTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  aiSubtitle: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  aiScoreValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  aiProgressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "#374151",
    overflow: "hidden",
  },
  aiProgressFill: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "#6C63FF",
  },
  aiFeedbackText: {
    color: "#E5E7EB",
    fontSize: 13,
    lineHeight: 20,
  },
  profileCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  profileTextWrap: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },
  verifiedPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: "#EEF2FF",
  },
  verifiedText: {
    fontSize: 11,
    color: "#4F46E5",
    fontWeight: "600",
  },
  meta: {
    color: "#5A5A5A",
    fontSize: 12,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111",
  },
  bodyText: {
    color: "#444",
    fontSize: 13,
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    gap: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  statLabel: {
    fontSize: 11,
    color: "#666",
  },
});
