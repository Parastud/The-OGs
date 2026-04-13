import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import LabelTextInput from "@/src/components/inputs/LabelTextInput";
import { ScreenWrapper } from "@/src/components/wrapper";
import useAuthApi from "@/src/hooks/apiHooks/useAuthApi";
import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";
import { COLORS } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BRAND = COLORS.primary ?? "#3B30C4";
const BRAND_LIGHT = "#EEEDFB";
const GRAY_BORDER = "#E2E2EC";
const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

// ─── Step 1: Details ──────────────────────────────────────────────────────────
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

// ─── Step 2: OTP ──────────────────────────────────────────────────────────────
function OtpStep({
  phone,
  onVerify,
  onBack,
  isLoading,
  error,
}: {
  phone: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
  isLoading: boolean;
  error: string;
}) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [activeIdx, setActiveIdx] = useState(0);
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Auto-focus
  const refCallback = (ref: TextInput | null, i: number) => {
    inputRefs.current[i] = ref;
    if (i === 0) setTimeout(() => ref?.focus(), 300);
  };

  // Countdown
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const shake = () =>
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 8,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -8,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 60,
        useNativeDriver: true,
      }),
    ]).start();

  // Shake when error arrives
  const prevError = useRef("");
  if (error && error !== prevError.current) {
    prevError.current = error;
    shake();
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
  }

  const handleChange = (text: string, idx: number) => {
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    const next = [...otp];
    next[idx] = digit;
    setOtp(next);
    if (digit && idx < OTP_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
      setActiveIdx(idx + 1);
    }
  };

  const handleKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[idx] && idx > 0) {
      const next = [...otp];
      next[idx - 1] = "";
      setOtp(next);
      inputRefs.current[idx - 1]?.focus();
      setActiveIdx(idx - 1);
    }
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setResendTimer(RESEND_SECONDS);
    startTimer();
    inputRefs.current[0]?.focus();
  };

  const filled = otp.filter(Boolean).length;
  const isReady = filled === OTP_LENGTH;

  return (
    <>
      {/* Header */}
      <View style={styles.heroWrap}>
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.7}
          style={styles.backBtn}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.otpTitle}>Verify number</Text>
        <Text style={styles.otpSubtitle}>
          We sent a 6-digit code to{"\n"}
          <Text style={styles.phoneHighlight}>+91 {phone}</Text>
          {"  "}
          <Text style={styles.changeLink} onPress={onBack}>
            Change
          </Text>
        </Text>
      </View>

      {/* OTP Boxes */}
      <View style={styles.formWrap}>
        <Animated.View
          style={[styles.otpRow, { transform: [{ translateX: shakeAnim }] }]}
        >
          {Array(OTP_LENGTH)
            .fill(0)
            .map((_, i) => (
              <TextInput
                key={i}
                ref={(r) => refCallback(r, i)}
                style={[
                  styles.otpBox,
                  otp[i] ? styles.otpBoxFilled : null,
                  activeIdx === i && !otp[i] ? styles.otpBoxActive : null,
                  !!error ? styles.otpBoxError : null,
                ]}
                value={otp[i]}
                onChangeText={(t) => handleChange(t, i)}
                onKeyPress={(e) => handleKeyPress(e, i)}
                onFocus={() => setActiveIdx(i)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
        </Animated.View>

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.progressDots}>
          {Array(OTP_LENGTH)
            .fill(0)
            .map((_, i) => (
              <View
                key={i}
                style={[
                  styles.progressDot,
                  i < filled && styles.progressDotFilled,
                ]}
              />
            ))}
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsWrap}>
        <PrimaryButton
          text="Verify & Continue"
          onPress={() => onVerify(otp.join(""))}
          isLoading={isLoading}
          disabled={isLoading || !isReady}
        />
        <View style={styles.resendRow}>
          <Text style={styles.resendLabel}>Didn&apos;t receive it? </Text>
          <TouchableOpacity
            onPress={handleResend}
            disabled={resendTimer > 0}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.resendLink,
                resendTimer > 0 && styles.resendDisabled,
              ]}
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function Register() {
  const params = useLocalSearchParams();
  const roleParam = String(params?.role || "").toLowerCase();
  const presetRole =
    roleParam === "customer" || roleParam === "provider"
      ? (roleParam as "customer" | "provider")
      : null;

  const [step, setStep] = useState<"details" | "otp">("details");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role] = useState<"customer" | "provider">(presetRole ?? "customer");
  const [errors, setErrors] = useState({ name: "", phone: "", otp: "" });

  const { requestOtp, verifyOtp, isLoading } = useAuthApi();
  const { updateCustomerProfile, isLoading: isProfileLoading } =
    useProviderApi();
  const router = useRouter();

  const proceedWithRole = async (selectedRole: "customer" | "provider") => {
    if (selectedRole === "provider") {
      router.replace({
        pathname: "/Provider/Step1",
        params: {
          fullname: name.trim(),
          phone: phone.trim(),
        },
      });
      return;
    }

    const { success, debugOtp } = await requestOtp({
      phone: phone.trim(),
      role: "customer",
    });

    if (!success) return;

    if (debugOtp) {
      Alert.alert("DEBUG OTP", debugOtp);
    }

    setErrors({ ...errors, otp: "" });
    setStep("otp");
  };

  // Step 1 -> 2: collect basic details first, no OTP yet
  const handleContinue = async () => {
    const newErrors = { name: "", phone: "", otp: "" };
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (phone.length < 10)
      newErrors.phone = "Enter a valid 10-digit number";
    if (newErrors.name || newErrors.phone) {
      setErrors(newErrors);
      return;
    }

    setErrors({ name: "", phone: "", otp: "" });
    await proceedWithRole(role);
  };

  // Customer OTP verification (provider OTP happens after full onboarding)
  const handleVerifyOtp = async (otp: string) => {
    if (!otp.trim()) {
      setErrors({ ...errors, otp: "OTP is required" });
      return;
    }
    const isSuccess = await verifyOtp({ phone: phone.trim(), otp: otp.trim() });
    if (isSuccess) {
      await updateCustomerProfile({
        phone: phone.trim(),
        input: { fullname: name.trim() },
      });
      setErrors({ ...errors, otp: "" });
      router.replace("/(tabs)");
    } else {
      setErrors({ ...errors, otp: "Incorrect OTP. Please try again." });
    }
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.scrollContent} safeArea>
      <Text style={styles.watermark}>Gigly</Text>

      {step === "details" && (
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
          isLoading={isLoading || isProfileLoading}
          onLogin={() => router.replace("/(auth)/Login")}
        />
      )}

      {step === "otp" && (
        <OtpStep
          phone={phone}
          onVerify={handleVerifyOtp}
          onBack={() => {
            setStep("details");
            setErrors({ ...errors, otp: "" });
          }}
          isLoading={isLoading || isProfileLoading}
          error={errors.otp}
        />
      )}
    </ScreenWrapper>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: "space-between",
    flex: 1,
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

  // ── Hero ──
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

  // ── Back ──
  backBtn: { marginBottom: 20 },
  backText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 15,
    color: COLORS.textSecondary,
  },

  // ── OTP header ──
  otpTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: 30,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  otpSubtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  phoneHighlight: { fontFamily: FONTS.BOLD, color: COLORS.textPrimary },
  changeLink: { fontFamily: FONTS.BOLD, color: BRAND, fontSize: 14 },

  // ── Form ──
  formWrap: { flex: 1, justifyContent: "center", gap: 16 },

  // ── OTP boxes ──
  otpRow: { flexDirection: "row", gap: 10, justifyContent: "center" },
  otpBox: {
    width: 48,
    height: 58,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: GRAY_BORDER,
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: 24,
    fontFamily: FONTS.BOLD,
    color: COLORS.textPrimary,
  },
  otpBoxActive: { borderColor: BRAND, backgroundColor: BRAND_LIGHT },
  otpBoxFilled: { borderColor: BRAND },
  otpBoxError: { borderColor: "#DC2626", backgroundColor: "#FEF2F2" },
  errorText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 13,
    color: "#DC2626",
    textAlign: "center",
    marginTop: 8,
  },
  progressDots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 16,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: GRAY_BORDER,
  },
  progressDotFilled: { backgroundColor: BRAND },

  // ── Actions ──
  actionsWrap: { paddingBottom: 8, gap: 0 },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  resendLabel: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  resendLink: { fontFamily: FONTS.BOLD, fontSize: 14, color: BRAND },
  resendDisabled: { color: COLORS.textSecondary },

  // ── Login link ──
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
