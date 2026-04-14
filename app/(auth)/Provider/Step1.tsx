import ProgressBar from "@/src/components/Bar/ProgressBar";
import ChipGroup from "@/src/components/chips/Chipgroup";
import StyledInput from "@/src/components/inputs/Styledinput";
import SectionLabel from "@/src/components/Sections/SectionLabel";
import useStep1, { EXPERIENCE_OPTIONS } from "@/src/hooks/Usestep1";
import { Colors } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

const BRAND = Colors.primary ?? "#3B30C4";
const GRAY_BG = "#F4F4F8";
const GRAY_BORDER = "#E2E2EC";
const GRAY_TEXT = "#9898AA";
const DARK = "#111118";

export default function ProviderOnboarding1() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const btnScale = useRef(new Animated.Value(1)).current;

  const {
    form,
    setName,
    setCity,
    setExperience,
    setBio,
    setPhone,
    handleCategorySelect,
    toggleSkill,
    toggleLanguage,
    categories,
    skills,
    languages,
    categoriesLoading,
    skillsLoading,
  } = useStep1();

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    city: "",
    category: "",
    experience: "",
  });

  useEffect(() => {
    const fullname = String(params?.fullname || "").trim();
    if (fullname) setName(fullname);
  }, [params?.fullname, setName]);

  const pickPhoto = () => {
    launchImageLibrary(
      { mediaType: "photo", quality: 0.8, selectionLimit: 1 },
      (response) => {
        if (response.didCancel || response.errorCode) return;
        const uri = response.assets?.[0]?.uri;
        if (uri) setPhotoUri(uri);
      }
    );
  };

  const validate = () => {
    const e = { name: "", phone: "", city: "", category: "", experience: "" };
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (form.phone.length < 10) e.phone = "Enter a valid 10-digit number";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.selectedCategory) e.category = "Please select a category";
    if (!form.experience) e.experience = "Please select your experience";
    setErrors(e);
    return !Object.values(e).some(Boolean);
  };

  const handleNext = () => {
    if (!validate()) return;

    Animated.sequence([
      Animated.timing(btnScale, { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.timing(btnScale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start(() => {
      router.push({
        pathname: "/Provider/Step2",
        params: {
          name: form.name,
          phone: form.phone,
          email: String(params?.email || ""),
          city: form.city,
          category: form.selectedCategory,
          skills: JSON.stringify(form.selectedSkills),
          languages: JSON.stringify(form.selectedLanguages),
          experience: form.experience,
          bio: form.bio,
          photoUri: "", // not sending to backend
        },
      });
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ProgressBar progress={0.5} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.step}>Step 1 of 2</Text>
          <Text style={styles.title}>Tell us about{"\n"}yourself</Text>
          <Text style={styles.subtitle}>
            Clients choose providers based on your profile — make it shine.
          </Text>
        </View>

        {/* Profile Photo */}
        <SectionLabel text="PROFILE PHOTO" />
        <TouchableOpacity style={styles.photoWrap} onPress={pickPhoto} activeOpacity={0.85}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photoImage} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoIcon}>📷</Text>
              <Text style={styles.photoLabel}>Tap to upload</Text>
              <Text style={styles.photoSub}>JPG or PNG · square crop</Text>
            </View>
          )}
          {photoUri && (
            <View style={styles.photoBadge}>
              <Text style={styles.photoBadgeText}>✏️ Change</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Full Name */}
        <SectionLabel text="FULL NAME" />
        <StyledInput
          placeholder="e.g. Ramesh Kumar"
          value={form.name}
          onChangeText={(v: string) => {
            setName(v);
            if (errors.name) setErrors((p) => ({ ...p, name: "" }));
          }}
        />
        {!!errors.name && <Text style={styles.errText}>{errors.name}</Text>}

        {/* Phone */}
        <SectionLabel text="PHONE NUMBER" />
        <StyledInput
          placeholder="e.g. 9876543210"
          value={form.phone}
          onChangeText={(t: string) => {
            setPhone(t.replace(/[^0-9]/g, "").slice(0, 10));
            if (errors.phone) setErrors((p) => ({ ...p, phone: "" }));
          }}
          keyboardType="phone-pad"
        />
        {!!errors.phone && <Text style={styles.errText}>{errors.phone}</Text>}

        {/* City */}
        <SectionLabel text="CITY / AREA YOU SERVE" />
        <StyledInput
          placeholder="e.g. Andheri West, Mumbai"
          value={form.city}
          onChangeText={(v: string) => {
            setCity(v);
            if (errors.city) setErrors((p) => ({ ...p, city: "" }));
          }}
        />
        {!!errors.city && <Text style={styles.errText}>{errors.city}</Text>}

        {/* Category */}
        <SectionLabel text="SERVICE CATEGORY (pick one)" />
        <ChipGroup
          options={categories}
          selected={form.selectedCategory ? [form.selectedCategory] : []}
          onToggle={(v: string) => {
            handleCategorySelect(v);
            if (errors.category) setErrors((p) => ({ ...p, category: "" }));
          }}
          loading={categoriesLoading}
        />
        {!!errors.category && <Text style={styles.errText}>{errors.category}</Text>}

        {/* Experience */}
        <SectionLabel text="YEARS OF EXPERIENCE" />
        <View style={styles.expRow}>
          {EXPERIENCE_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt}
              onPress={() => {
                setExperience(opt);
                if (errors.experience) setErrors((p) => ({ ...p, experience: "" }));
              }}
              activeOpacity={0.75}
              style={[styles.expChip, form.experience === opt && styles.expChipActive]}
            >
              <Text style={[styles.expLabel, form.experience === opt && styles.expLabelActive]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {!!errors.experience && <Text style={styles.errText}>{errors.experience}</Text>}

        {/* Skills */}
        <SectionLabel text="SKILLS / SPECIALISATIONS" />
        {!form.selectedCategory ? (
          <Text style={styles.emptyHint}>Select a category above to see relevant skills.</Text>
        ) : (
          <ChipGroup
            options={skills}
            selected={form.selectedSkills}
            onToggle={toggleSkill}
            loading={skillsLoading}
          />
        )}

        {/* Languages */}
        <SectionLabel text="LANGUAGES SPOKEN" />
        <ChipGroup
          options={languages}
          selected={form.selectedLanguages}
          onToggle={toggleLanguage}
        />

        {/* Bio */}
        <SectionLabel text="SHORT BIO" />
        <StyledInput
          placeholder="Tell clients what makes you the best choice…"
          value={form.bio}
          onChangeText={setBio}
          multiline
        />
        <Text style={styles.charCount}>{form.bio.length}/280</Text>

        {/* CTA */}
        <Animated.View style={[styles.ctaWrap, { transform: [{ scale: btnScale }] }]}>
          <TouchableOpacity style={styles.cta} onPress={handleNext} activeOpacity={0.85}>
            <Text style={styles.ctaText}>Continue →</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  scroll: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 32 },

  header: { marginBottom: 28 },
  step: { fontFamily: FONTS.BOLD, fontSize: 11, color: BRAND, letterSpacing: 1.5, marginBottom: 8 },
  title: { fontFamily: FONTS.BOLD, fontSize: 30, color: DARK, marginBottom: 10, lineHeight: 38 },
  subtitle: { fontFamily: FONTS.REGULAR, fontSize: 14, color: GRAY_TEXT, lineHeight: 22 },

  photoWrap: {
    alignSelf: "center",
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: "hidden",
    marginBottom: 8,
    backgroundColor: GRAY_BG,
    borderWidth: 2,
    borderColor: GRAY_BORDER,
    borderStyle: "dashed",
  },
  photoImage: { width: "100%", height: "100%" },
  photoPlaceholder: { flex: 1, alignItems: "center", justifyContent: "center", gap: 4 },
  photoIcon: { fontSize: 26 },
  photoLabel: { fontFamily: FONTS.BOLD, fontSize: 12, color: DARK },
  photoSub: { fontFamily: FONTS.REGULAR, fontSize: 10, color: GRAY_TEXT },
  photoBadge: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingVertical: 5,
    alignItems: "center",
  },
  photoBadgeText: { fontFamily: FONTS.BOLD, fontSize: 11, color: "#fff" },

  errText: { fontFamily: FONTS.REGULAR, fontSize: 12, color: "#DC2626", marginTop: 4, marginLeft: 2 },

  expRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  expChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: GRAY_BORDER,
    backgroundColor: "#fff",
  },
  expChipActive: { backgroundColor: BRAND, borderColor: BRAND },
  expLabel: { fontFamily: FONTS.REGULAR, fontSize: 13, color: DARK },
  expLabelActive: { color: "#fff", fontFamily: FONTS.BOLD },

  emptyHint: { fontFamily: FONTS.REGULAR, fontSize: 13, color: GRAY_TEXT, lineHeight: 20 },
  charCount: {
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    color: GRAY_TEXT,
    textAlign: "right",
    marginTop: 6,
  },

  ctaWrap: { marginTop: 32, marginBottom: 16 },
  cta: {
    backgroundColor: BRAND,
    borderRadius: 16,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: { fontFamily: FONTS.BOLD, fontSize: 16, color: "#fff", letterSpacing: 0.5 },
});