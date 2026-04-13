import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import LabelTextInput from "@/src/components/inputs/LabelTextInput";
import { ScreenWrapper } from "@/src/components/wrapper";
import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";
import { COLORS } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BRAND = COLORS.primary ?? "#3B30C4";
const GRAY_BORDER = "#E2E2EC";

function DetailsStep({
  name,
  setName,
  phone,
  setPhone,
  errors,
  onNext,
  isLoading,
  onLogin,
}: {
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  errors: { name: string; phone: string };
  onNext: () => void;
  isLoading: boolean;
  onLogin: () => void;
}) {
  return (
    <>
      {/* Hero */}
      <View style={styles.heroWrap}>
        <View style={styles.topBar}>
          <Text style={styles.logoText}>Gigly</Text>
          <TouchableOpacity onPress={onLogin} activeOpacity={0.7}>
            <Text style={styles.closeBtn}>✕</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.heroTitle}>Create{"\n"}account</Text>
        <View style={styles.heroSubRow}>
          <Text style={styles.sparkle}>✦</Text>
          <Text style={styles.heroSubText}>
            Join the premier community for modern gig work.
          </Text>
        </View>
      </View>

      {/* Form */}
      <View style={styles.formWrap}>
        <LabelTextInput
          label="Full Name"
          placeholder="Arjun Sharma"
          value={name}
          onChangeText={setName}
          error={errors.name}
          autoCapitalize="words"
        />
        <LabelTextInput
          label="Phone Number"
          placeholder="98765 43210"
          value={phone}
          onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, "").slice(0, 10))}
          keyboardType="phone-pad"
          error={errors.phone}
        />
      </View>

      {/* Actions */}
      <View style={styles.actionsWrap}>
        <PrimaryButton
          text="Continue  →"
          onPress={onNext}
          isLoading={isLoading}
          disabled={isLoading}
        />
        <View style={styles.loginRow}>
          <Text style={styles.loginLabel}>ALREADY HAVE AN ACCOUNT?</Text>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={onLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginBtnText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ name: "", phone: "" });

  const { updateCustomerProfile, isLoading } = useProviderApi();

  const handleContinue = async () => {
    const newErrors = { name: "", phone: "" };

    if (!name.trim()) newErrors.name = "Full name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (phone.length < 10)
      newErrors.phone = "Enter a valid 10-digit number";

    if (newErrors.name || newErrors.phone) {
      setErrors(newErrors);
      return;
    }

    setErrors({ name: "", phone: "" });

    const res = await updateCustomerProfile({
      phone: phone.trim(),
      input: { fullname: name.trim() },
    });

    if (!res?.success) return;

    router.push({
      pathname: "/(auth)/VerifyOTP",
      params: {
        phone: phone.trim(),
        debugOtp: res?.debugOtp || "",
      },
    });
  };

  return (
    <ScreenWrapper safeArea>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.watermark}>Gigly</Text>

          <DetailsStep
            name={name}
            setName={(v) => {
              setName(v);
              if (errors.name) setErrors({ ...errors, name: "" });
            }}
            phone={phone}
            setPhone={(v) => {
              setPhone(v);
              if (errors.phone) setErrors({ ...errors, phone: "" });
            }}
            errors={errors}
            onNext={handleContinue}
            isLoading={isLoading}
            onLogin={() => router.replace("/(auth)/Login")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: "space-between",
    flexGrow: 1,
    minHeight: "100%",
  },

  watermark: {
    position: "absolute",
    fontSize: 110,
    fontFamily: FONTS.BOLD,
    color: "rgba(59,48,196,0.04)",
    top: "28%",
    alignSelf: "center",
    letterSpacing: -4,
    pointerEvents: "none",
  },

  heroWrap: { marginTop: 16 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  logoText: { fontFamily: FONTS.BOLD, fontSize: 22, color: BRAND },
  closeBtn: { fontSize: 18, color: COLORS.textSecondary },
  heroTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: 44,
    color: COLORS.textPrimary,
    lineHeight: 50,
    marginBottom: 14,
  },
  heroSubRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  sparkle: { fontSize: 18, color: BRAND, marginTop: 2 },
  heroSubText: {
    flex: 1,
    fontFamily: FONTS.REGULAR,
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },

  formWrap: { flex: 1, justifyContent: "center", gap: 16 },

  actionsWrap: { paddingBottom: 8 },
  loginRow: { alignItems: "center", marginTop: 24, gap: 12 },
  loginLabel: {
    fontFamily: FONTS.BOLD,
    fontSize: 11,
    color: COLORS.textSecondary,
    letterSpacing: 1.5,
  },
  loginBtn: {
    width: "100%",
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: GRAY_BORDER,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtnText: {
    fontFamily: FONTS.BOLD,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
});