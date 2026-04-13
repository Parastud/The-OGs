import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ArrowLeft, Save } from "lucide-react-native";

import { ScreenWrapper } from "@/src/components/wrapper";
import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";
import { FONTS } from "@/src/theme/fonts";

type ProviderProfile = {
  fullname?: string;
  email?: string;
  location?: string;
  bio?: string;
  profilePhotoUrl?: string;
};

export default function PersonalInformationScreen() {
  const { getProviderProfile, updateProfileData, isLoading } = useProviderApi();

  const [profile, setProfile] = useState<ProviderProfile | null>(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadProfile = useCallback(async () => {
    const data = await getProviderProfile();
    if (!data) return;

    const normalized: ProviderProfile = {
      fullname: String(data.fullname || ""),
      email: String(data.email || ""),
      location: String(data.location || ""),
      bio: String(data.bio || ""),
      profilePhotoUrl: String(data.profilePhotoUrl || ""),
    };

    setProfile(normalized);
    setFullname(normalized.fullname || "");
    setEmail(normalized.email || "");
    setLocation(normalized.location || "");
    setBio(normalized.bio || "");
    setProfilePhotoUrl(normalized.profilePhotoUrl || "");
  }, [getProviderProfile]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const validate = () => {
    if (!fullname.trim()) {
      Alert.alert("Validation", "Full name is required.");
      return false;
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert("Validation", "Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const onSave = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    const response = await updateProfileData({
      fullname: fullname.trim(),
      email: email.trim() || undefined,
      cityArea: location.trim() || undefined,
      bio: bio.trim() || undefined,
      profilePhotoUrl: profilePhotoUrl.trim() || undefined,
    });
    setIsSubmitting(false);

    if (!response?.success) return;

    router.back();
  };

  return (
    <View style={styles.container}>
      <ScreenWrapper
        contentContainerStyle={styles.scrollContent}
        onRefresh={loadProfile}
      >
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
            <Text style={styles.brand}>Personal Information</Text>
            <View style={{ width: 38 }} />
          </View>
        </LinearGradient>

        {!profile && isLoading ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color="#6D5DF6" />
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={fullname}
              onChangeText={setFullname}
              placeholder="Enter full name"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="City, Area"
            />

            <Text style={styles.label}>Profile Photo URL</Text>
            <TextInput
              style={styles.input}
              value={profilePhotoUrl}
              onChangeText={setProfilePhotoUrl}
              placeholder="https://..."
              autoCapitalize="none"
            />

            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about yourself"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={[styles.saveBtn, isSubmitting && styles.saveBtnDisabled]}
              onPress={onSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Save size={18} color="#fff" />
                  <Text style={styles.saveBtnText}>Save Changes</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    height: 140,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWrap: {
    padding: 8,
  },
  brand: {
    fontSize: 20,
    fontFamily: FONTS.BOLD,
    color: "#fff",
  },
  loaderWrap: {
    marginTop: 60,
    alignItems: "center",
  },
  card: {
    marginHorizontal: 20,
    marginTop: -25,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.SEMIBOLD,
    color: "#374151",
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: "#111827",
    fontFamily: FONTS.REGULAR,
    backgroundColor: "#fff",
  },
  textArea: {
    minHeight: 100,
  },
  saveBtn: {
    marginTop: 22,
    backgroundColor: "#6D5DF6",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  saveBtnDisabled: {
    opacity: 0.6,
  },
  saveBtnText: {
    fontSize: 15,
    fontFamily: FONTS.BOLD,
    color: "#fff",
  },
});
