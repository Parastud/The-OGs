import { ACCOUNT_DELETION_URL, PRIVACY_POLICY_URL } from "@/app.env";
import { removeTokenFromSecureStore } from "@/src/utils/localStorageKey";
import { useRouter } from "expo-router";
import {
  Bell,
  ChevronRight,
  CreditCard,
  FileText,
  Globe,
  Landmark,
  Link,
  LogOut,
  MapPin,
  Menu,
  ShieldCheck,
  Trash2,
  User,
} from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LANGUAGES = ["English (US)", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi"];
const LOCATION_OPTIONS = ["Always On", "While Using App", "Never"];

export default function SettingsScreen() {
  const router = useRouter();

  const [notifications, setNotifications] = useState({
    bids: true,
    updates: true,
    messages: true,
  });

  const [language, setLanguage] = useState("English (US)");
  const [locationPerm, setLocationPerm] = useState("Always On");

  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const [profileName, setProfileName] = useState("Arjun Mehta");
  const [profileEmail, setProfileEmail] = useState("arjun@example.com");
  const [profilePhone, setProfilePhone] = useState("+91 98765 43210");
  const [draftName, setDraftName] = useState(profileName);
  const [draftEmail, setDraftEmail] = useState(profileEmail);
  const [draftPhone, setDraftPhone] = useState(profilePhone);

  function toggleNotif(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleLogout() {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          await removeTokenFromSecureStore();
          router.replace("/(auth)/Login");
        },
      },
    ]);
  }

  function handleDeleteAccount() {
    openExternalUrl(ACCOUNT_DELETION_URL);
  }

  async function openExternalUrl(url: string) {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  }

  function saveProfile() {
    if (!draftName.trim()) {
      Alert.alert("Name cannot be empty.");
      return;
    }
    setProfileName(draftName.trim());
    setProfileEmail(draftEmail.trim());
    setProfilePhone(draftPhone.trim());
    setShowEditProfile(false);
    Alert.alert("Profile updated!");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
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

        {/* PROFILE CARD */}
        <TouchableOpacity
          style={styles.profileCard}
          onPress={() => {
            setDraftName(profileName);
            setDraftEmail(profileEmail);
            setDraftPhone(profilePhone);
            setShowEditProfile(true);
          }}
        >
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
            style={styles.profileAvatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>{profileName}</Text>
            <Text style={styles.profileEmail}>{profileEmail}</Text>
            <Text style={styles.profilePhone}>{profilePhone}</Text>
          </View>
          <ChevronRight size={18} color="#999" />
        </TouchableOpacity>

        {/* ACCOUNT */}
        <Section title="Account">
          <SettingItem
            icon={<User size={17} color="#6C63FF" />}
            label="Edit Profile"
            onPress={() => {
              setDraftName(profileName);
              setDraftEmail(profileEmail);
              setDraftPhone(profilePhone);
              setShowEditProfile(true);
            }}
          />
          <Divider />
          <SettingItem
            icon={<Link size={17} color="#6C63FF" />}
            label="Linked Accounts"
            onPress={() =>
              Alert.alert("Linked Accounts", "Google and Facebook linking coming soon.")
            }
          />
          <Divider />
          <SettingItem
            icon={<ShieldCheck size={17} color="#F59E0B" />}
            label="Verify Identity"
            badge="Priority"
            onPress={() =>
              Alert.alert("Verify Identity", "Upload a government ID to get verified.")
            }
          />
        </Section>

        {/* NOTIFICATIONS */}
        <Section title="Notifications">
          <ToggleItem
            icon={<Bell size={17} color="#6C63FF" />}
            label="New bids"
            value={notifications.bids}
            onChange={() => toggleNotif("bids")}
          />
          <Divider />
          <ToggleItem
            icon={<Bell size={17} color="#6C63FF" />}
            label="Job updates"
            value={notifications.updates}
            onChange={() => toggleNotif("updates")}
          />
          <Divider />
          <ToggleItem
            icon={<Bell size={17} color="#6C63FF" />}
            label="Messages"
            value={notifications.messages}
            onChange={() => toggleNotif("messages")}
          />
        </Section>

        {/* PAYMENTS */}
        <Section title="Payments">
          <SettingItem
            icon={<CreditCard size={17} color="#6C63FF" />}
            label="Payment methods"
            onPress={() =>
              Alert.alert("Payment Methods", "Manage your saved cards and UPI.")
            }
          />
          <Divider />
          <SettingItem
            icon={<Landmark size={17} color="#6C63FF" />}
            label="Bank account"
            onPress={() =>
              Alert.alert("Bank Account", "Add or update your bank details for payouts.")
            }
          />
          <Divider />
          <SettingItem
            icon={<FileText size={17} color="#6C63FF" />}
            label="Transaction history"
            onPress={() => Alert.alert("Transactions", "View your full payment history.")}
          />
        </Section>

        {/* APP */}
        <Section title="App">
          <SettingItem
            icon={<FileText size={17} color="#6C63FF" />}
            label="Privacy Policy"
            onPress={() => openExternalUrl(PRIVACY_POLICY_URL)}
          />
          <Divider />
          <SettingItem
            icon={<Globe size={17} color="#6C63FF" />}
            label="Language"
            value={language}
            onPress={() => setShowLanguagePicker(true)}
          />
          <Divider />
          <SettingItem
            icon={<MapPin size={17} color="#6C63FF" />}
            label="Location permissions"
            value={locationPerm}
            onPress={() => setShowLocationPicker(true)}
          />
        </Section>

        {/* DANGER ZONE */}
        <Section title="Danger Zone">
          <SettingItem
            icon={<LogOut size={17} color="#EF4444" />}
            label="Log Out"
            labelStyle={{ color: "#EF4444" }}
            onPress={handleLogout}
            hideChevron
          />
          <Divider />
          <SettingItem
            icon={<Trash2 size={17} color="#EF4444" />}
            label="Delete Account"
            labelStyle={{ color: "#EF4444" }}
            onPress={handleDeleteAccount}
            hideChevron
          />
        </Section>

        <Text style={styles.version}>Gigly v1.0.0</Text>
      </ScrollView>

      {/* LANGUAGE PICKER */}
      <PickerModal
        visible={showLanguagePicker}
        title="Select Language"
        options={LANGUAGES}
        selected={language}
        onSelect={(v) => { setLanguage(v); setShowLanguagePicker(false); }}
        onClose={() => setShowLanguagePicker(false)}
      />

      {/* LOCATION PICKER */}
      <PickerModal
        visible={showLocationPicker}
        title="Location Permissions"
        options={LOCATION_OPTIONS}
        selected={locationPerm}
        onSelect={(v) => { setLocationPerm(v); setShowLocationPicker(false); }}
        onClose={() => setShowLocationPicker(false)}
      />

      {/* EDIT PROFILE MODAL */}
      <Modal visible={showEditProfile} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Handle />
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              value={draftName}
              onChangeText={setDraftName}
              placeholder="Full name"
            />

            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={draftEmail}
              onChangeText={setDraftEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              style={styles.textInput}
              value={draftPhone}
              onChangeText={setDraftPhone}
              placeholder="Phone number"
              keyboardType="phone-pad"
            />

            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowEditProfile(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────

const Section = ({ title, children }: { title: string; children: any }) => (
  <View style={{ marginTop: 22 }}>
    <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
    <View style={styles.card}>{children}</View>
  </View>
);

const Divider = () => <View style={styles.divider} />;
const Handle = () => <View style={styles.handle} />;

const SettingItem = ({
  icon, label, value, badge, onPress, labelStyle, hideChevron,
}: {
  icon?: any; label: string; value?: string; badge?: string;
  onPress?: () => void; labelStyle?: any; hideChevron?: boolean;
}) => (
  <TouchableOpacity style={styles.item} onPress={onPress} disabled={!onPress}>
    <View style={styles.row}>
      {icon && <View style={styles.iconWrap}>{icon}</View>}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
    <View style={styles.row}>
      {badge && (
        <View style={styles.badgeWrap}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
      {value && <Text style={styles.valueText}>{value}</Text>}
      {!hideChevron && <ChevronRight size={15} color="#ccc" />}
    </View>
  </TouchableOpacity>
);

const ToggleItem = ({
  icon, label, value, onChange,
}: {
  icon?: any; label: string; value: boolean; onChange: () => void;
}) => (
  <View style={styles.item}>
    <View style={styles.row}>
      {icon && <View style={styles.iconWrap}>{icon}</View>}
      <Text style={styles.label}>{label}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ false: "#ddd", true: "#6C63FF" }}
      thumbColor="#fff"
    />
  </View>
);

const PickerModal = ({
  visible, title, options, selected, onSelect, onClose,
}: {
  visible: boolean; title: string; options: string[];
  selected: string; onSelect: (v: string) => void; onClose: () => void;
}) => (
  <Modal visible={visible} transparent animationType="slide">
    <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
      <View style={styles.modalSheet}>
        <Handle />
        <Text style={styles.modalTitle}>{title}</Text>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={styles.pickerOption}
            onPress={() => onSelect(opt)}
          >
            <Text
              style={[
                styles.pickerOptionText,
                opt === selected && { color: "#6C63FF", fontWeight: "600" },
              ]}
            >
              {opt}
            </Text>
            {opt === selected && <View style={styles.selectedDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  </Modal>
);

// ─── STYLES ──────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6FA", paddingHorizontal: 16 },

  header: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginTop: 4,
  },
  logo: { fontWeight: "700", fontSize: 18, color: "#6C63FF" },
  avatar: { width: 34, height: 34, borderRadius: 17 },

  profileCard: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: "#fff", borderRadius: 16, padding: 16, marginTop: 16,
    shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 8, elevation: 3,
  },
  profileAvatar: { width: 52, height: 52, borderRadius: 26 },
  profileName: { fontSize: 15, fontWeight: "700", color: "#111" },
  profileEmail: { fontSize: 12, color: "#666", marginTop: 2 },
  profilePhone: { fontSize: 12, color: "#999", marginTop: 1 },

  sectionTitle: {
    fontSize: 10, color: "#aaa", fontWeight: "600",
    letterSpacing: 0.9, marginBottom: 6,
  },

  card: {
    backgroundColor: "#fff", borderRadius: 14, paddingVertical: 2,
    shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 6, elevation: 2,
  },

  item: {
    paddingHorizontal: 14, paddingVertical: 13,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
  },

  row: { flexDirection: "row", alignItems: "center", gap: 10 },

  iconWrap: {
    width: 32, height: 32, borderRadius: 8,
    backgroundColor: "#F4F4FF", alignItems: "center", justifyContent: "center",
  },

  label: { fontSize: 14, color: "#222" },

  valueText: { fontSize: 13, color: "#999", marginRight: 4 },

  badgeWrap: {
    backgroundColor: "#FEF3C7", paddingHorizontal: 7,
    paddingVertical: 2, borderRadius: 8, marginRight: 6,
  },
  badgeText: { fontSize: 10, color: "#D97706", fontWeight: "600" },

  divider: { height: 0.5, backgroundColor: "#F0F0F0", marginHorizontal: 14 },

  version: { textAlign: "center", color: "#ccc", fontSize: 11, marginTop: 28 },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#fff", borderTopLeftRadius: 20,
    borderTopRightRadius: 20, padding: 20, paddingBottom: 36,
  },
  handle: {
    width: 36, height: 4, backgroundColor: "#ddd",
    borderRadius: 2, alignSelf: "center", marginBottom: 16,
  },
  modalTitle: { fontSize: 16, fontWeight: "700", color: "#111", marginBottom: 16 },

  inputLabel: { fontSize: 11, color: "#999", marginBottom: 5, marginTop: 10, fontWeight: "600" },
  textInput: {
    backgroundColor: "#F4F6FA", borderRadius: 10,
    padding: 11, fontSize: 14, color: "#111",
    borderWidth: 1, borderColor: "transparent",
  },

  modalBtns: { flexDirection: "row", gap: 10, marginTop: 20 },
  cancelBtn: {
    flex: 1, padding: 12, borderRadius: 10,
    backgroundColor: "#F4F6FA", alignItems: "center",
  },
  cancelBtnText: { color: "#666", fontWeight: "500" },
  saveBtn: {
    flex: 1, padding: 12, borderRadius: 10,
    backgroundColor: "#6C63FF", alignItems: "center",
  },
  saveBtnText: { color: "#fff", fontWeight: "600" },

  pickerOption: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", paddingVertical: 14,
    borderBottomWidth: 0.5, borderBottomColor: "#F0F0F0",
  },
  pickerOptionText: { fontSize: 14, color: "#333" },
  selectedDot: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: "#6C63FF",
  },
});