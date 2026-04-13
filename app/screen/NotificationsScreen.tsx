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
  Bell,
  MessageCircle,
  CheckCircle,
  Star,
} from "lucide-react-native";

//
// 🔷 TYPES
//
type Notification = {
  id: string;
  title: string;
  subtitle?: string;
  time: string;
  type: "bid" | "payment" | "review";
  color: string;
  action?: string;
};

//
// 🔷 DATA
//
const notifications: Notification[] = [
  {
    id: "1",
    title: "Suresh accepted your bid",
    subtitle: "₹750 held in escrow",
    time: "2 min ago",
    type: "bid",
    color: "#16A34A",
    action: "Chat now →",
  },
  {
    id: "2",
    title: "Priya placed a bid on 'Design logo'",
    subtitle: "Bid: ₹1,200",
    time: "15 min ago",
    type: "bid",
    color: "#6C63FF",
    action: "View Bid →",
  },
  {
    id: "3",
    title: "Payout for 'Social Media Audit' processed",
    subtitle: "Will reflect in 24 hours",
    time: "2 hr ago",
    type: "payment",
    color: "#999",
  },
  {
    id: "4",
    title: "Rahul left you a 5-star review",
    subtitle: "Excellent work and very professional.",
    time: "1 day ago",
    type: "review",
    color: "#F59E0B",
  },
];

export default function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Menu size={22} />
          <Text style={styles.logo}>Gigly</Text>
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/men/1.jpg",
            }}
            style={styles.avatar}
          />
        </View>

        {/* TITLE */}
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>
          Stay updated with your latest activity
        </Text>

        <TouchableOpacity>
          <Text style={styles.markAll}>Mark all read</Text>
        </TouchableOpacity>

        {/* FILTER TABS */}
        <View style={styles.tabs}>
          {["All", "Bids", "Jobs", "Payments"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
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
        </View>

        {/* TODAY */}
        <Text style={styles.section}>TODAY</Text>

        {notifications.slice(0, 3).map((n) => (
          <NotificationCard key={n.id} data={n} />
        ))}

        {/* YESTERDAY */}
        <Text style={styles.section}>YESTERDAY</Text>

        <NotificationCard data={notifications[3]} />
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.nav}>
        <NavItem label="Explore" />
        <NavItem label="My Jobs" />
        <NavItem label="Bids" />
        <NavItem label="Inbox" active />
        <NavItem label="Profile" />
      </View>
    </SafeAreaView>
  );
}

//
// 🔷 COMPONENTS
//
const NotificationCard = ({ data }: { data: Notification }) => (
  <View style={[styles.card, { borderLeftColor: data.color }]}>
    <View style={styles.row}>
      <View style={styles.icon}>
        {data.type === "bid" && <MessageCircle size={16} />}
        {data.type === "payment" && <CheckCircle size={16} />}
        {data.type === "review" && <Star size={16} />}
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{data.title}</Text>
        {data.subtitle && (
          <Text style={styles.cardSub}>{data.subtitle}</Text>
        )}

        {data.action && (
          <TouchableOpacity>
            <Text style={styles.action}>{data.action}</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.time}>{data.time}</Text>
    </View>
  </View>
);

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
    fontWeight: "bold",
    color: "#6C63FF",
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 10,
  },
  subtitle: {
    color: "#666",
    marginBottom: 6,
  },
  markAll: {
    color: "#6C63FF",
    alignSelf: "flex-end",
  },

  tabs: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  tab: {
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#6C63FF",
  },
  tabText: {
    color: "#666",
  },
  activeTabText: {
    color: "#fff",
  },

  section: {
    marginTop: 20,
    fontSize: 12,
    color: "#999",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginTop: 10,
    borderLeftWidth: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    marginRight: 10,
  },

  cardTitle: {
    fontWeight: "600",
  },
  cardSub: {
    fontSize: 12,
    color: "#666",
  },

  action: {
    color: "#6C63FF",
    marginTop: 4,
    fontSize: 12,
  },

  time: {
    fontSize: 10,
    color: "#999",
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