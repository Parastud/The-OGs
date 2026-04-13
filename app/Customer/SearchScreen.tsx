import { useRouter } from "expo-router";
import { ArrowLeft, Search, ShieldCheck } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { searchConsumerProvidersService } from "@/src/services";

type ProviderResult = {
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

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ProviderResult[]>([]);

  function handleProviderPress(item: ProviderResult) {
    router.push({
      pathname: "/Customer/ProviderDetailScreen",
      params: { id: item.id },
    });
  }

  useEffect(() => {
    const debounce = setTimeout(async () => {
      setIsLoading(true);
      const response = await searchConsumerProvidersService({
        q: query,
        limit: 30,
      });

      if (response?.success && Array.isArray(response?.data)) {
        setResults(response.data);
      } else {
        setResults([]);
      }

      setIsLoading(false);
    }, 350);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#111" />
        </TouchableOpacity>
        <Text style={styles.title}>Search Providers</Text>
      </View>

      <View style={styles.searchInputWrap}>
        <Search size={18} color="#888" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search by name, skill, category"
          placeholderTextColor="#999"
          style={styles.searchInput}
          autoFocus
        />
      </View>

      {isLoading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text style={styles.loadingText}>Searching providers...</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.82}
              onPress={() => handleProviderPress(item)}
            >
              <Image
                source={{
                  uri:
                    item.imageUrl ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=6C63FF&color=fff`,
                }}
                style={styles.avatar}
              />

              <View style={styles.content}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{item.name}</Text>
                  {item.verified ? (
                    <View style={styles.verifiedPill}>
                      <ShieldCheck size={12} color="#4F46E5" />
                      <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                  ) : null}
                </View>

                <Text style={styles.meta}>{item.category}</Text>
                <Text style={styles.meta}>
                  {item.location || "Location not added"}
                </Text>
                <Text style={styles.meta}>
                  {item.yearsOfExperience ?? 0} yrs exp • STARTS FROM{" "}
                  {item.startingPrice ? `₹${item.startingPrice}` : "—"}
                </Text>

                {item.skills?.length ? (
                  <Text style={styles.skills} numberOfLines={2}>
                    {item.skills.join(" • ")}
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyTitle}>No providers found</Text>
              <Text style={styles.emptySub}>
                Try searching by skill, category, or provider name.
              </Text>
            </View>
          }
        />
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
  searchInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 46,
    color: "#111",
  },
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  loadingText: { color: "#666" },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 40,
  },
  card: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  content: { flex: 1 },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    flexShrink: 1,
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
    marginTop: 2,
    color: "#555",
    fontSize: 12,
  },
  skills: {
    marginTop: 8,
    color: "#4F46E5",
    fontSize: 12,
    fontWeight: "500",
  },
  emptyWrap: {
    marginTop: 50,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  emptySub: {
    marginTop: 6,
    textAlign: "center",
    color: "#666",
  },
});
