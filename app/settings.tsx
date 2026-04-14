import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  User,
  Bell,
  ShieldCheck,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react-native";
import { ScreenWrapper } from "@/src/components/wrapper";
import { FONTS } from "@/src/theme/fonts";
import { useState } from "react";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const renderSettingItem = (
    Icon: any,
    title: string,
    action?: any,
    isDanger?: boolean,
  ) => (
    <TouchableOpacity style={styles.settingItem} onPress={action}>
      <View style={[styles.iconBox, isDanger && styles.iconBoxDanger]}>
        <Icon size={20} color={isDanger ? "#EF4444" : "#6D5DF6"} />
      </View>
      <Text
        style={[styles.settingTitle, isDanger && styles.settingTitleDanger]}
      >
        {title}
      </Text>
      <ChevronRight size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScreenWrapper contentContainerStyle={styles.scrollContent}>
        {/* Dynamic Curved Header matches our Dashboard feel */}
        <LinearGradient
          colors={["#6D5DF6", "#8A6DFF", "#B088FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconWrap}
            >
              <ArrowLeft size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.brand}>Settings</Text>
            <View style={{ width: 38 }} />
          </View>
        </LinearGradient>

        <View style={styles.mainCard}>
          <Text style={[styles.sectionHeading, { marginTop: 0 }]}>Account</Text>
          {renderSettingItem(User, "Personal Information", () =>
            router.push("/Provider/personal-information"),
          )}
          {renderSettingItem(CreditCard, "Payment Methods")}

          <Text style={styles.sectionHeading}>Preferences</Text>
          <View style={styles.settingItem}>
            <View style={styles.iconBox}>
              <Bell size={20} color="#6D5DF6" />
            </View>
            <Text style={styles.settingTitle}>Push Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#D1D5DB", true: "#A78BFA" }}
              thumbColor={notificationsEnabled ? "#6D5DF6" : "#F3F4F6"}
            />
          </View>
          {renderSettingItem(ShieldCheck, "Privacy & Security")}

          <Text style={styles.sectionHeading}>Support</Text>
          {renderSettingItem(HelpCircle, "Help & Support")}

          <View style={styles.divider} />

          {renderSettingItem(LogOut, "Log Out", undefined, true)}
        </View>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  scrollContent: { paddingBottom: 100 },
  header: {
    height: 140,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 60,
    paddingHorizontal: 20,
    shadowColor: "#6D5DF6",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWrap: { padding: 8 },
  brand: { fontSize: 20, fontFamily: FONTS.BOLD, color: "#fff" },
  mainCard: {
    marginHorizontal: 20,
    marginTop: -25, // Overlap effect
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeading: {
    fontSize: 13,
    fontFamily: FONTS.BOLD,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 16,
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#ECEBFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  iconBoxDanger: { backgroundColor: "#FEE2E2" },
  settingTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: FONTS.SEMIBOLD,
    color: "#1F2937",
  },
  settingTitleDanger: { color: "#EF4444" },
  divider: { height: 1, backgroundColor: "#F3F4F6", marginVertical: 16 },
});
