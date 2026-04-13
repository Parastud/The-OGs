import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchX, Plus } from "lucide-react-native";

export default function EmptyStateScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>Gigly</Text>
        <View style={styles.avatar} />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {/* ILLUSTRATION */}
        <View style={styles.illustration}>
          <SearchX size={40} color="#6C63FF" />
        </View>

        {/* TEXT */}
        <Text style={styles.title}>No jobs here yet</Text>
        <Text style={styles.subtitle}>
          Try adjusting your filters or search for something else.
          Your next big opportunity is just a refined search away.
        </Text>

        {/* CTA BUTTON */}
        <TouchableOpacity style={styles.primaryBtn}>
          <Plus size={18} color="#fff" />
          <Text style={styles.primaryText}>Post a Job</Text>
        </TouchableOpacity>

        {/* SECONDARY */}
        <TouchableOpacity>
          <Text style={styles.secondaryText}>
            Reset all filters
          </Text>
        </TouchableOpacity>
      </View>

      {/* BOTTOM NAV */}
      <View style={styles.nav}>
        <NavItem label="Explore" active />
        <NavItem label="Jobs" />
        <NavItem label="Wallet" />
        <NavItem label="Profile" />
      </View>
    </SafeAreaView>
  );
}

//
// 🔷 COMPONENTS
//
const NavItem = ({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) => (
  <Text style={{ color: active ? "#6C63FF" : "#999" }}>
    {label}
  </Text>
);

//
// 🎨 STYLES
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontWeight: "700",
    color: "#6C63FF",
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: "#ddd",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  illustration: {
    backgroundColor: "#EDEBFF",
    padding: 30,
    borderRadius: 30,
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginTop: 8,
    paddingHorizontal: 20,
  },

  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6C63FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 20,
    gap: 6,
  },

  primaryText: {
    color: "#fff",
    fontWeight: "600",
  },

  secondaryText: {
    marginTop: 10,
    color: "#6C63FF",
  },

  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    borderTopWidth: 0.5,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
});