/* eslint-disable */
import ProfilePhotoUpload from "@/src/components/avatar/Profilephotoupload";
import ProgressBar from "@/src/components/Bar/ProgressBar";
import ChipGroup from "@/src/components/chips/Chipgroup";
import StyledInput from "@/src/components/inputs/Styledinput";
import SectionLabel from "@/src/components/Sections/SectionLabel";
import useStep1, { EXPERIENCE_OPTIONS } from "@/src/hooks/Usestep1";
import { Colors } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
    setPhotoUri,
    handleCategorySelect,
    toggleSkill,
    toggleLanguage,
    categories,
    skills,
    languages,
    categoriesLoading,
    skillsLoading,
  } = useStep1();

  useEffect(() => {
    const fullname = String(params?.fullname || "").trim();
    if (fullname) {
      setName(fullname);
    }
  }, [params?.fullname, setName]);

  const handleNext = () => {
    Animated.sequence([
      Animated.timing(btnScale, {
        toValue: 0.95,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(btnScale, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push({
        pathname: "/Provider/Step2",
        params: {
          name: form.name,
          phone: String(params?.phone || ""),
          city: form.city,
          category: form.selectedCategory,
          skills: JSON.stringify(form.selectedSkills),
          languages: JSON.stringify(form.selectedLanguages),
          experience: form.experience,
          bio: form.bio,
          photoUri: form.photoUri ?? "",
        },
      });
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
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
          <Text style={styles.title}>Tell us about yourself</Text>
          <Text style={styles.subtitle}>
            Clients choose providers based on your profile — make it shine.
          </Text>
        </View>

        {/* Profile photo */}
        <SectionLabel text="PROFILE PHOTO" />
        <ProfilePhotoUpload
          uri={form.photoUri}
          onPress={() => {
            /* wire image picker here */
          }}
        />

        {/* Full name */}
        <SectionLabel text="FULL NAME" />
        <StyledInput
          placeholder="e.g. Ramesh Kumar"
          value={form.name}
          onChangeText={setName}
        />

        {/* City */}
        <SectionLabel text="CITY / AREA YOU SERVE" />
        <StyledInput
          placeholder="e.g. Andheri West, Mumbai"
          value={form.city}
          onChangeText={setCity}
        />

        {/* Category — from backend */}
        <SectionLabel text="SERVICE CATEGORY (pick one)" />
        <ChipGroup
          options={categories}
          selected={form.selectedCategory ? [form.selectedCategory] : []}
          onToggle={handleCategorySelect}
          loading={categoriesLoading}
        />

        {/* Experience */}
        <SectionLabel text="YEARS OF EXPERIENCE" />
        <View style={styles.expRow}>
          {EXPERIENCE_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt}
              onPress={() => setExperience(opt)}
              activeOpacity={0.75}
              style={[
                styles.expChip,
                form.experience === opt && styles.expChipActive,
              ]}
            >
              <Text
                style={[
                  styles.expLabel,
                  form.experience === opt && styles.expLabelActive,
                ]}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Skills — from backend, driven by selected category */}
        <SectionLabel text="SKILLS / SPECIALISATIONS" />
        {!form.selectedCategory ? (
          <Text style={styles.emptyHint}>
            Select a category above to see relevant skills.
          </Text>
        ) : (
          <ChipGroup
            options={skills}
            selected={form.selectedSkills}
            onToggle={toggleSkill}
            loading={skillsLoading}
          />
        )}

        {/* Languages — static */}
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
        <Animated.View
          style={[styles.ctaWrap, { transform: [{ scale: btnScale }] }]}
        >
          <TouchableOpacity
            style={styles.cta}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>Continue →</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  scroll: { paddingHorizontal: 24, paddingTop: 20 },
  header: { marginBottom: 4 },
  step: {
    fontFamily: FONTS.BOLD,
    fontSize: 11,
    color: Colors.primary,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  title: {
    fontFamily: FONTS.BOLD,
    fontSize: 26,
    color: Colors.textPrimary,
    marginBottom: 8,
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: Colors.textTertiary,
    lineHeight: 22,
  },
  expRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  expChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E2E2EC",
    backgroundColor: "#fff",
  },
  expChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  expLabel: {
    fontFamily: FONTS.REGULAR,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  expLabelActive: { color: "#fff", fontFamily: FONTS.BOLD },
  emptyHint: {
    fontFamily: FONTS.REGULAR,
    fontSize: 13,
    color: Colors.textTertiary,
    lineHeight: 20,
  },
  charCount: {
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    color: Colors.textTertiary,
    textAlign: "right",
    marginTop: 6,
  },
  ctaWrap: { marginTop: 32, marginBottom: 40 },
  cta: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    fontFamily: FONTS.BOLD,
    fontSize: 16,
    color: "#fff",
    letterSpacing: 0.5,
  },
});
