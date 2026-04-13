import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Menu,
  Filter,
  MessageCircle,
  CheckCircle,
  Clock,
} from "lucide-react-native";

type Job = {
  id: string;
  title: string;
  category: string;
  status: "In Progress" | "Completed" | "Pending";
  provider: string;
  rating: string;
  price: string;
};

const jobs: Job[] = [
  {
    id: "1",
    title: "Deep Cleaning Service",
    category: "HOME MAINTENANCE",
    status: "In Progress",
    provider: "Rahul K.",
    rating: "4.8",
    price: "₹650",
  },
  {
    id: "2",
    title: "Assemble IKEA Wardrobe",
    category: "CARPENTRY",
    status: "In Progress",
    provider: "Sarah M.",
    rating: "4.9",
    price: "₹1,200",
  },
];

export default function MyJobsScreen() {
  const [activeTab, setActiveTab] = useState("Active");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Menu size={22} />
          <Text style={styles.logo}>Gigly</Text>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
            style={styles.avatar}
          />
        </View>

        {/* TITLE */}
        <Text style={styles.title}>My Jobs</Text>

        {/* TABS */}
        <View style={styles.tabs}>
          {["All", "Active", "Pending", "Completed"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
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
          ))}
          <Filter size={18} />
        </View>

        {/* JOB CARDS */}
        {jobs.map((job) => (
          <View key={job.id} style={styles.card}>
            {/* STATUS BADGE */}
            <View style={styles.badge}>
              <Clock size={12} color="#6C63FF" />
              <Text style={styles.badgeText}>{job.status}</Text>
            </View>

            {/* TITLE */}
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.category}>{job.category}</Text>

            {/* PROVIDER */}
            <View style={styles.providerRow}>
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/men/2.jpg",
                }}
                style={styles.providerImg}
              />
              <View>
                <Text style={styles.providerText}>
                  {job.provider}
                </Text>
                <Text style={styles.rating}>
                  ⭐ {job.rating}
                </Text>
              </View>
            </View>

            {/* DIVIDER */}
            <View style={styles.divider} />

            {/* FOOTER */}
            <View style={styles.footer}>
              <View>
                <Text style={styles.price}>{job.price}</Text>
                <Text style={styles.sub}>Due today</Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.chatBtn}>
                  <MessageCircle size={16} color="#6C63FF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.doneBtn}>
                  <CheckCircle size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* NAV */}
      <View style={styles.nav}>
        <NavItem label="Explore" />
        <NavItem label="My Jobs" active />
        <NavItem label="Post" />
        <NavItem label="Inbox" />
        <NavItem label="Profile" />
      </View>
    </SafeAreaView>
  );
}

const NavItem = ({ label, active = false }: any) => (
  <Text style={{ color: active ? "#6C63FF" : "#999" }}>
    {label}
  </Text>
);

//
// 🎨 STYLES (EXPRESSIVE)
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

  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    borderTopWidth: 0.5,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
});