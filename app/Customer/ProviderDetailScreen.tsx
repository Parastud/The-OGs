import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProviderDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#111" />
        </TouchableOpacity>
        <Text style={styles.title}>Provider Profile</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.providerId}>Provider ID: {id || "N/A"}</Text>
        <Text style={styles.note}>
          Detailed profile view will be shown here.
        </Text>
      </View>
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
  content: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    gap: 8,
  },
  providerId: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },
  note: {
    fontSize: 13,
    color: "#666",
  },
});
