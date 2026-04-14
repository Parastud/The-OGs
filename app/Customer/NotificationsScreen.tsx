import { Menu, MessageCircle } from "lucide-react-native";
import { useCallback, useMemo, useState } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";

import {
  acknowledgeOfflineMessageNotificationsService,
  getOfflineMessageNotificationsService,
} from "@/src/services";

//
// 🔷 TYPES
//
type NotificationType = "message";

type Notification = {
  id: string;
  otherUserId: string;
  jobId?: string;
  conversationType: "job" | "direct";
  title: string;
  subtitle?: string;
  time: Date;
  type: NotificationType;
  color: string;
  action?: string;
  read: boolean;
  senderName?: string;
  count?: number;
};

type OfflineMessageNotificationApi = {
  roomId: string;
  senderId: string;
  senderName: string;
  senderRole: "customer" | "provider";
  conversationType: "job" | "direct";
  latestJobId: string | null;
  latestText: string;
  latestCreatedAt: string;
  count: number;
};

const timeAgo = (date: Date) => {
  const deltaMs = Date.now() - date.getTime();
  const mins = Math.floor(deltaMs / (60 * 1000));
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day ago`;
};

export default function NotificationsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState<
    Notification[]
  >([]);

  const loadOfflineNotifications = useCallback(async () => {
    setIsLoadingMessages(true);
    try {
      const response = await getOfflineMessageNotificationsService();
      const data: OfflineMessageNotificationApi[] = Array.isArray(
        response?.data,
      )
        ? response.data
        : [];

      const mapped: Notification[] = data.map((item) => ({
        id: `offline-msg-${item.roomId}`,
        otherUserId: item.senderId,
        jobId: item.latestJobId || undefined,
        conversationType: item.conversationType,
        title:
          item.count === 1
            ? `${item.senderName} sent you a message`
            : `${item.senderName} sent ${item.count} messages`,
        subtitle: item.latestText,
        time: new Date(item.latestCreatedAt),
        type: "message",
        color: "#2563EB",
        action: "Open chat →",
        read: false,
        senderName: item.senderName,
        count: item.count,
      }));

      setMessageNotifications(mapped);
    } catch {
      setMessageNotifications([]);
    } finally {
      setIsLoadingMessages(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadOfflineNotifications();
    }, [loadOfflineNotifications]),
  );

  const allNotifications = useMemo(() => {
    return [...messageNotifications].sort(
      (a, b) => b.time.getTime() - a.time.getTime(),
    );
  }, [messageNotifications]);

  const filteredNotifications = useMemo(() => {
    if (activeTab === "All") return allNotifications;
    return allNotifications.filter((item) => item.type === "message");
  }, [activeTab, allNotifications]);

  const todayNotifications = filteredNotifications.filter((item) => {
    const d = item.time;
    const now = new Date();
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  });

  const previousNotifications = filteredNotifications.filter((item) => {
    const d = item.time;
    const now = new Date();
    return !(
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  });

  const unreadCount = allNotifications.filter((item) => !item.read).length;

  const handleMarkAllRead = () => {
    acknowledgeOfflineMessageNotificationsService().catch(() => undefined);
    setMessageNotifications([]);
  };

  const handleOpenChat = (notification: Notification) => {
    router.push({
      pathname: "/Customer/ChatScreen",
      params: {
        otherUserId: notification.otherUserId,
        otherUserName: notification.senderName || "User",
        ...(notification.jobId ? { jobId: notification.jobId } : {}),
        ...(notification.conversationType === "direct"
          ? { conversationType: "direct" as const }
          : { jobTitle: "Job" }),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              /* Menu action */
            }}
          >
            <Menu size={22} color="#333" />
          </TouchableOpacity>
          <Text style={styles.logo}>Gigly</Text>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
            style={styles.avatar}
          />
        </View>

        {/* TITLE */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadPill}>{unreadCount}</Text>
          )}
        </View>
        <Text style={styles.subtitle}>
          {unreadCount > 0
            ? `${unreadCount} unread updates`
            : "You're all caught up"}
        </Text>

        <TouchableOpacity onPress={handleMarkAllRead}>
          <Text style={styles.markAll}>Mark all read</Text>
        </TouchableOpacity>

        {/* FILTER TABS */}
        <View style={styles.tabs}>
          {["All", "Messages"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
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

        {isLoadingMessages && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="small" color="#6C63FF" />
            <Text style={styles.loadingText}>Loading notifications...</Text>
          </View>
        )}

        {/* TODAY */}
        {!isLoadingMessages && todayNotifications.length > 0 && (
          <>
            <Text style={styles.section}>TODAY</Text>
            {todayNotifications.map((n) => (
              <NotificationCard
                key={n.id}
                data={n}
                onOpenChat={() => handleOpenChat(n)}
              />
            ))}
          </>
        )}

        {/* EARLIER */}
        {!isLoadingMessages && previousNotifications.length > 0 && (
          <>
            <Text style={styles.section}>EARLIER</Text>
            {previousNotifications.map((n) => (
              <NotificationCard
                key={n.id}
                data={n}
                onOpenChat={() => handleOpenChat(n)}
              />
            ))}
          </>
        )}

        {!isLoadingMessages && filteredNotifications.length === 0 && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptySub}>New updates will appear here.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

//
// 🔷 COMPONENTS
//
const NotificationCard = ({
  data,
  onOpenChat,
}: {
  data: Notification;
  onOpenChat: () => void;
}) => (
  <View style={[styles.card, { borderLeftColor: data.color }]}>
    <View style={styles.row}>
      <View style={styles.icon}>
        {data.type === "message" && <MessageCircle size={16} />}
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{data.title}</Text>
        {data.subtitle && <Text style={styles.cardSub}>{data.subtitle}</Text>}

        {data.action && (
          <TouchableOpacity onPress={onOpenChat}>
            <Text style={styles.action}>{data.action}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.metaWrap}>
        {typeof data.count === "number" && data.count > 1 && (
          <View style={styles.messageCountBadge}>
            <Text style={styles.messageCountText}>{data.count}</Text>
          </View>
        )}
        <Text style={styles.time}>{timeAgo(data.time)}</Text>
      </View>
    </View>
  </View>
);

//
// 🎨 STYLES
//
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6FA", paddingHorizontal: 16 },
  contentContainer: { paddingBottom: 112 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  logo: { fontWeight: "bold", fontSize: 18, color: "#6C63FF" },
  avatar: { width: 34, height: 34, borderRadius: 17 },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  title: { fontSize: 22, fontWeight: "800", color: "#111" },
  unreadPill: {
    minWidth: 26,
    paddingHorizontal: 8,
    height: 24,
    borderRadius: 12,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff",
    backgroundColor: "#6C63FF",
    fontWeight: "700",
  },
  subtitle: {
    color: "#666",
    fontSize: 13,
    marginTop: 2,
    marginBottom: 6,
  },
  markAll: {
    color: "#6C63FF",
    fontSize: 13,
    fontWeight: "500",
    alignSelf: "flex-end",
    marginBottom: 10,
  },

  tabs: { flexDirection: "row", gap: 8, marginBottom: 12 },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  activeTab: { backgroundColor: "#6C63FF" },
  tabText: { color: "#666", fontSize: 12 },
  activeTabText: { color: "#fff", fontWeight: "600" },

  section: {
    marginTop: 20,
    fontSize: 11,
    color: "#999",
    fontWeight: "600",
    letterSpacing: 0.8,
  },

  loadingBox: {
    marginTop: 20,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    fontSize: 12,
    color: "#555",
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
    alignItems: "flex-start",
    gap: 10,
  },

  icon: {
    marginRight: 0,
  },

  cardTitle: {
    fontWeight: "600",
    fontSize: 13,
    color: "#333",
  },
  cardSub: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },

  action: {
    color: "#6C63FF",
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
  },

  metaWrap: {
    alignItems: "flex-end",
  },

  messageCountBadge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  messageCountText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },

  time: {
    fontSize: 10,
    color: "#999",
  },

  emptyBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    marginTop: 20,
    alignItems: "center",
  },
  emptyTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: "#222",
  },
  emptySub: {
    marginTop: 4,
    fontSize: 12,
    color: "#777",
  },
});
