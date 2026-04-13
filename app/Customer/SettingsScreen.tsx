import { removeTokenFromSecureStore } from "@/src/utils/localStorageKey";
import { useRouter } from "expo-router";
import {
  ChevronRight,
  CreditCard,
  FileText,
  Landmark,
  Link,
  Lock,
  Menu,
  ShieldCheck,
  User,
} from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState({
    bids: true,
    updates: true,
    messages: true,
  });
  const router = useRouter();

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
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your account and preferences</Text>

        {/* ACCOUNT */}
        <Section title="Account">
          <SettingItem
            icon={<User size={18} />}
            label="Logout"
            onPress={async () => {
              await removeTokenFromSecureStore();
              router.replace("/(auth)/Login");
            }}
          />
          <SettingItem
            icon={<User size={18} />}
            label="Edit Profile"
            onPress={() => {}}
          />
          <SettingItem
            icon={<Lock size={18} />}
            label="Change Password"
            onPress={() => {}}
          />
          <SettingItem
            icon={<Link size={18} />}
            label="Linked Accounts"
            onPress={() => {}}
          />
          <SettingItem
            icon={<ShieldCheck size={18} />}
            label="Verify Identity"
            badge="Priority"
          />
        </Section>

        {/* NOTIFICATIONS */}
        <Section title="Notifications">
          <ToggleItem
            label="New bids"
            value={notifications.bids}
            onChange={(v) => setNotifications({ ...notifications, bids: v })}
          />
          <ToggleItem
            label="Job updates"
            value={notifications.updates}
            onChange={(v) => setNotifications({ ...notifications, updates: v })}
          />
          <ToggleItem
            label="Messages"
            value={notifications.messages}
            onChange={(v) =>
              setNotifications({ ...notifications, messages: v })
            }
          />
        </Section>

        {/* PAYMENTS */}
        <Section title="Payments">
          <SettingItem
            icon={<CreditCard size={18} />}
            label="Payment methods"
          />
          <SettingItem icon={<Landmark size={18} />} label="Bank account" />
          <SettingItem
            icon={<FileText size={18} />}
            label="Transaction history"
          />
        </Section>

        {/* APP */}
        <Section title="App">
          <SettingItem label="Language" value="English (US)" />
          <SettingItem label="Location permissions" value="Always On" />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

//
// 🔷 COMPONENTS
//
const Section = ({ title, children }: { title: string; children: any }) => (
  <View style={{ marginTop: 20 }}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.card}>{children}</View>
  </View>
);

const SettingItem = ({ icon, label, value, badge, onPress }: any) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.row}>
      {icon}
      <Text style={styles.label}>{label}</Text>
    </View>

    <View style={styles.row}>
      {badge && <Text style={styles.badge}>{badge}</Text>}
      {value && <Text style={styles.value}>{value}</Text>}
      <ChevronRight size={16} color="#999" />
    </View>
  </TouchableOpacity>
);

const ToggleItem = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ true: "#6C63FF" }}
    />
  </View>
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
  },

  sectionTitle: {
    fontSize: 12,
    color: "#999",
    marginBottom: 6,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 6,
  },

  item: {
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  label: {
    fontSize: 14,
  },

  value: {
    color: "#666",
    marginRight: 6,
  },

  badge: {
    fontSize: 10,
    color: "#F59E0B",
    marginRight: 6,
  },
});
