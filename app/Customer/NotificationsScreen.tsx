import {
  Bell,
  CheckCircle,
  Menu,
  MessageCircle,
  Star,
  Trash2,
} from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NotifType = "bid" | "payment" | "review";

type Notification = {
  id: string;
  title: string;
  subtitle?: string;
  time: string;
  type: NotifType;
  color: string;
  action?: string;
  read: boolean;
  group: "TODAY" | "YESTERDAY" | "EARLIER";
};

const INITIAL: Notification[] = [
  {
    id: "1",
    title: "Suresh accepted your bid",
    subtitle: "₹750 held in escrow",
    time: "2 min ago",
    type: "bid",
    color: "#16A34A",
    action: "Chat now →",
    read: false,
    group: "TODAY",
  },
  {
    id: "2",
    title: "Priya placed a bid on 'Design logo'",
    subtitle: "Bid: ₹1,200",
    time: "15 min ago",
    type: "bid",
    color: "#6C63FF",
    action: "View Bid →",
    read: false,
    group: "TODAY",
  },
  {
    id: "3",
    title: "Payout for 'Social Media Audit' processed",
    subtitle: "Will reflect in 24 hours",
    time: "2 hr ago",
    type: "payment",
    color: "#999",
    read: true,
    group: "TODAY",
  },
  {
    id: "4",
    title: "Rahul left you a 5-star review",
    subtitle: "Excellent work and very professional.",
    time: "1 day ago",
    type: "review",
    color: "#F59E0B",
    read: true,
    group: "YESTERDAY",
  },
  {
    id: "5",
    title: "Amit accepted your bid on 'Fix tap'",
    subtitle: "₹400 held in escrow",
    time: "Yesterday, 3 pm",
    type: "bid",
    color: "#16A34A",
    action: "Chat now →",
    read: true,
    group: "YESTERDAY",
  },
  {
    id: "6",
    title: "Payment of ₹850 released for 'AC Repair'",
    subtitle: "Credited to your wallet",
    time: "3 days ago",
    type: "payment",
    color: "#999",
    read: true,
    group: "EARLIER",
  },
  {
    id: "7",
    title: "Neha left you a 4-star review",
    subtitle: "Great work, will hire again!",
    time: "4 days ago",
    type: "review",
    color: "#F59E0B",
    read: true,
    group: "EARLIER",
  },
];

const TAB_TYPES: Record<string, NotifType[] | null> = {
  All: null,
  Bids: ["bid"],
  Payments: ["payment"],
  Reviews: ["review"],
};

const TYPE_CONFIG: Record<NotifType, { icon: any; label: string }> = {
  bid: { icon: MessageCircle, label: "Bid" },
  payment: { icon: CheckCircle, label: "Payment" },
  review: { icon: Star, label: "Review" },
};

const GROUPS: Array<"TODAY" | "YESTERDAY" | "EARLIER"> = ["TODAY", "YESTERDAY", "EARLIER"];

export default function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState("All");
  const [notifs, setNotifs] = useState<Notification[]>(INITIAL);

  const unreadCount = notifs.filter((n) => !n.read).length;

  const filtered = (() => {
    const types = TAB_TYPES[activeTab];
    return types ? notifs.filter((n) => types.includes(n.type)) : notifs;
  })();

  function markRead(id: string) {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function dismiss(id: string) {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  }

  function clearAll() {
    Alert.alert("Clear All", "Remove all notifications?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: () => setNotifs([]),
      },
    ]);
  }

  function handleAction(n: Notification) {
    markRead(n.id);
    if (n.type === "bid") Alert.alert(n.action ?? "Action", `Opening for: ${n.title}`);
  }

  const tabCounts = Object.fromEntries(
    Object.entries(TAB_TYPES).map(([tab, types]) => [
      tab,
      types
        ? notifs.filter((n) => types.includes(n.type) && !n.read).length
        : unreadCount,
    ])
  );

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

        {/* TITLE ROW */}
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.subtitle}>Stay updated with your latest activity</Text>
          </View>
          {unreadCount > 0 && (
            <View style={styles.unreadBubble}>
              <Bell size={12} color="#6C63FF" />
              <Text style={styles.unreadText}>{unreadCount}</Text>
            </View>
          )}
        </View>

        {/* ACTIONS ROW */}
        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={markAllRead} disabled={unreadCount === 0}>
            <Text style={[styles.actionLink, unreadCount === 0 && { color: "#ccc" }]}>
              Mark all read
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearAll} disabled={notifs.length === 0}>
            <Text style={[styles.actionLink, { color: "#EF4444" }, notifs.length === 0 && { color: "#ccc" }]}>
              Clear all
            </Text>
          </TouchableOpacity>
        </View>

        {/* FILTER TABS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
          <View style={styles.tabs}>
            {["All", "Bids", "Payments", "Reviews"].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab}
                </Text>
                {tabCounts[tab] > 0 && (
                  <View style={[styles.tabBadge, activeTab === tab && styles.tabBadgeActive]}>
                    <Text style={[styles.tabBadgeText, activeTab === tab && { color: "#6C63FF" }]}>
                      {tabCounts[tab]}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyText}>No notifications</Text>
            <Text style={styles.emptySubtext}>You're all caught up!</Text>
          </View>
        )}

        {/* GROUPED NOTIFICATIONS */}
        {GROUPS.map((group) => {
          const items = filtered.filter((n) => n.group === group);
          if (!items.length) return null;
          return (
            <View key={group}>
              <Text style={styles.section}>{group}</Text>
              {items.map((n) => {
                const cfg = TYPE_CONFIG[n.type];
                const Icon = cfg.icon;
                return (
                  <TouchableOpacity
                    key={n.id}
                    onPress={() => markRead(n.id)}
                    activeOpacity={0.85}
                  >
                    <View style={[styles.card, { borderLeftColor: n.color }, !n.read && styles.cardUnread]}>
                      <View style={styles.cardInner}>
                        {/* ICON */}
                        <View style={[styles.iconWrap, { backgroundColor: n.color + "20" }]}>
                          <Icon size={15} color={n.color} />
                        </View>

                        {/* CONTENT */}
                        <View style={{ flex: 1 }}>
                          <View style={styles.cardTopRow}>
                            <Text style={[styles.cardTitle, !n.read && styles.cardTitleUnread]} numberOfLines={2}>
                              {n.title}
                            </Text>
                            {!n.read && <View style={styles.unreadDot} />}
                          </View>

                          {n.subtitle && (
                            <Text style={styles.cardSub}>{n.subtitle}</Text>
                          )}

                          <View style={styles.cardFooter}>
                            <Text style={styles.time}>{n.time}</Text>
                            {n.action && (
                              <TouchableOpacity onPress={() => handleAction(n)}>
                                <Text style={[styles.action, { color: n.color }]}>{n.action}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>

                        {/* DISMISS */}
                        <TouchableOpacity
                          onPress={() => dismiss(n.id)}
                          style={styles.dismissBtn}
                          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
                        >
                          <Trash2 size={13} color="#ccc" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
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

  titleRow: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "flex-start", marginTop: 12,
  },
  title: { fontSize: 22, fontWeight: "800", color: "#111" },
  subtitle: { color: "#666", fontSize: 13, marginTop: 2 },
  unreadBubble: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: "#EDEBFF", paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 20, marginTop: 4,
  },
  unreadText: { fontSize: 12, color: "#6C63FF", fontWeight: "700" },

  actionsRow: {
    flexDirection: "row", justifyContent: "space-between",
    marginTop: 10,
  },
  actionLink: { fontSize: 13, color: "#6C63FF", fontWeight: "500" },

  tabs: { flexDirection: "row", gap: 8 },
  tab: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: "#eee", paddingHorizontal: 12,
    paddingVertical: 7, borderRadius: 20,
  },
  activeTab: { backgroundColor: "#6C63FF" },
  tabText: { color: "#666", fontSize: 12 },
  activeTabText: { color: "#fff", fontWeight: "600" },
  tabBadge: {
    backgroundColor: "#fff", borderRadius: 8,
    paddingHorizontal: 5, minWidth: 18, alignItems: "center",
  },
  tabBadgeActive: { backgroundColor: "#EDEBFF" },
  tabBadgeText: { fontSize: 10, color: "#999", fontWeight: "600" },

  section: { marginTop: 22, fontSize: 11, color: "#999", fontWeight: "600", letterSpacing: 0.8 },

  card: {
    backgroundColor: "#fff", borderRadius: 14,
    padding: 14, marginTop: 10, borderLeftWidth: 4,
  },
  cardUnread: { backgroundColor: "#FAFAFE" },
  cardInner: { flexDirection: "row", alignItems: "flex-start", gap: 10 },

  iconWrap: {
    width: 34, height: 34, borderRadius: 10,
    alignItems: "center", justifyContent: "center", marginTop: 1,
  },

  cardTopRow: { flexDirection: "row", alignItems: "flex-start", gap: 6, flex: 1 },
  cardTitle: { fontSize: 13, fontWeight: "500", color: "#444", flex: 1, lineHeight: 18 },
  cardTitleUnread: { fontWeight: "700", color: "#111" },
  unreadDot: {
    width: 7, height: 7, borderRadius: 4,
    backgroundColor: "#6C63FF", marginTop: 5,
  },
  cardSub: { fontSize: 12, color: "#888", marginTop: 3 },
  cardFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 6 },
  time: { fontSize: 10, color: "#bbb" },
  action: { fontSize: 12, fontWeight: "600" },

  dismissBtn: { padding: 2, marginTop: 2 },

  emptyState: { alignItems: "center", marginTop: 60, gap: 8 },
  emptyIcon: { fontSize: 40 },
  emptyText: { fontSize: 16, fontWeight: "700", color: "#333" },
  emptySubtext: { fontSize: 13, color: "#999" },
});