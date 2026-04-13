/* eslint-disable */
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import { ScreenWrapper } from "@/src/components/wrapper";
import useAuthApi from "@/src/hooks/apiHooks/useAuthApi";
import { showSnackbarSuccess } from "@/src/redux/slices/snackbar.slice";
import { UserState } from "@/src/redux/slices/user.slice";
import { COLORS } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

interface SigninResponse {
  signin: {
    success: boolean;
    message: string;
    debugOtp?: string;
  };
}

interface VerifyOtpResponse {
  verifyOtp: {
    success: boolean;
    message: string;
    token: string;
    user: UserState;
  };
}

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

// ─── Phone Step ───────────────────────────────────────────────────────────────
function PhoneStep({
  phone,
  setPhone,
  error,
  onSend,
  isLoading,
  onCreateAccount,
}: {
  phone: string;
  setPhone: (v: string) => void;
  error: string;
  onSend: () => void;
  isLoading: boolean;
  onCreateAccount: () => void;
}) {
  const [focused, setFocused] = useState(false);
  const isValid = phone.replace(/\s/g, "").length === 10;

  return (
    <>
      {/* Hero */}
      <View style={styles.heroWrap}>
        <View style={styles.logoRow}>
          <Text style={styles.logoText}>Gigly</Text>
          <Text style={styles.logoDiamond}> ✦</Text>
        </View>
        <Text style={styles.tagline}>Your Digital Concierge. Done.</Text>
      </View>

      {/* Form */}
      <View style={styles.formWrap}>
        <Text style={styles.fieldLabel}>PHONE NUMBER</Text>
        <View
          style={[
            styles.phoneRow,
            focused && styles.phoneRowFocused,
            !!error && styles.phoneRowError,
          ]}
        >
          <View style={styles.countryBadge}>
            <Text style={styles.countryText}>🇮🇳  +91</Text>
          </View>
          <View style={styles.phoneDivider} />
          <TextInput
            style={styles.phoneInput}
            placeholder="98765 43210"
            placeholderTextColor={COLORS.textSecondary}
            value={phone}
            onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, "").slice(0, 10))}
            keyboardType="phone-pad"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            maxLength={10}
          />
        </View>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        <Text style={styles.hintText}>
          We'll send a 6-digit OTP to verify your number.
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsWrap}>
        <PrimaryButton
          text="Send OTP  →"
          onPress={onSend}
          isLoading={isLoading}
          disabled={isLoading || !isValid}
        />

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={onCreateAccount}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryBtnText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to our{" "}
          <Text style={styles.termsLink}>Terms of Service</Text>
          {" "}and{" "}
          <Text style={styles.termsLink}>Privacy Policy</Text>.
        </Text>
      </View>
    </>
  );
}

// ─── OTP Step ─────────────────────────────────────────────────────────────────
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

  useEffect(() => {
    setTimeout(() => inputRefs.current[0]?.focus(), 300);
  }, []);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [resendTimer]);

  useEffect(() => {
    if (error) shake();
  }, [error]);

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

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
    inputRefs.current[0]?.focus();
  };

  const filled = otp.filter(Boolean).length;
  const isReady = filled === OTP_LENGTH;

  return (
    <>
      {/* Header */}
      <View style={styles.heroWrap}>
        <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.otpTitle}>Enter OTP</Text>
        <Text style={styles.otpSubtitle}>
          We sent a 6-digit code to{"\n"}
          <Text style={styles.phoneHighlight}>+91 {phone}</Text>
          {"  "}
          <Text style={styles.changeLink} onPress={onBack}>
            Change
          </Text>
        </Text>
      </View>

      {/* OTP boxes */}
      <View style={styles.formWrap}>
        <Animated.View
          style={[styles.otpRow, { transform: [{ translateX: shakeAnim }] }]}
        >
          {Array(OTP_LENGTH)
            .fill(0)
            .map((_, i) => (
              <TextInput
                key={i}
                ref={(r) => { inputRefs.current[i] = r; }}
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

        {/* Progress */}
        <View style={styles.progressDots}>
          {Array(OTP_LENGTH)
            .fill(0)
            .map((_, i) => (
              <View
                key={i}
                style={[styles.progressDot, i < filled && styles.progressDotFilled]}
              />
            ))}
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsWrap}>
        <PrimaryButton
          text="Verify & Login"
          onPress={() => onVerify(otp.join(""))}
          isLoading={isLoading}
          disabled={isLoading || !isReady}
        />

        <View style={styles.resendRow}>
          <Text style={styles.resendLabel}>Didn't receive it? </Text>
          <TouchableOpacity onPress={handleResend} disabled={resendTimer > 0} activeOpacity={0.7}>
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
export default function Login() {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [errors, setErrors] = useState({ phone: "", otp: "" });

  const { requestOtp, verifyOtp, isLoading } = useAuthApi();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSendOtp = async () => {
    if (!phone.trim()) {
      setErrors({ ...errors, phone: "Phone number is required" });
      return;
    }
    const { data } = await requestOtp({ phone: phone.trim() });
    if (data?.success) {
      dispatch(showSnackbarSuccess({ message: data.message }));
      if (data.debugOtp) Alert.alert("DEBUG OTP", data.debugOtp);
      setErrors({ phone: "", otp: "" });
      setStep("otp");
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    if (!otp.trim()) {
      setErrors({ ...errors, otp: "OTP is required" });
      return;
    }
    const isSuccess = await verifyOtp({ phone: phone.trim(), otp: otp.trim() });
    if (isSuccess) {
      router.replace("/(tabs)");
    } else {
      setErrors({ ...errors, otp: "Incorrect OTP. Please try again." });
    }
  };

  return (
    <ScreenWrapper
      contentContainerStyle={styles.scrollContent}
      safeArea
    >
      {/* Watermark */}
      <Text style={styles.watermark}>Gigly</Text>

      {step === "phone" ? (
        <PhoneStep
          phone={phone}
          setPhone={(v) => {
            setPhone(v);
            if (errors.phone) setErrors({ ...errors, phone: "" });
          }}
          error={errors.phone}
          onSend={handleSendOtp}
          isLoading={isLoading}
          onCreateAccount={() => router.push("/(auth)/Roleselect")}
        />
      ) : (
        <OtpStep
          phone={phone}
          onVerify={handleVerifyOtp}
          onBack={() => {
            setStep("phone");
            setErrors({ phone: "", otp: "" });
          }}
          isLoading={isLoading}
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

  // Watermark
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

  // Logo / hero
  heroWrap: { marginTop: 20 },
  logoRow: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  logoText: { fontFamily: FONTS.BOLD, fontSize: 38, color: COLORS.primary, letterSpacing: -1 },
  logoDiamond: { fontFamily: FONTS.BOLD, fontSize: 22, color: COLORS.primary, marginTop: 4 },
  tagline: {
    fontFamily: FONTS.REGULAR,
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 8,
  },

  // Back
  backBtn: { marginBottom: 20 },
  backText: { fontFamily: FONTS.REGULAR, fontSize: 15, color: COLORS.textSecondary },

  // OTP header
  otpTitle: { fontFamily: FONTS.BOLD, fontSize: 30, color: COLORS.textPrimary, marginBottom: 10 },
  otpSubtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  phoneHighlight: { fontFamily: FONTS.BOLD, color: COLORS.textPrimary },
  changeLink: { fontFamily: FONTS.BOLD, color: COLORS.primary, fontSize: 14 },

  // Form area
  formWrap: { flex: 1, justifyContent: "center" },
  fieldLabel: {
    fontFamily: FONTS.BOLD,
    fontSize: 11,
    color: COLORS.textSecondary,
    letterSpacing: 1.4,
    marginBottom: 10,
  },

  // Phone input
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  phoneRowFocused: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  phoneRowError: { borderColor: "#DC2626", backgroundColor: "#FEF2F2" },
  countryBadge: { paddingHorizontal: 16, paddingVertical: 16 },
  countryText: { fontFamily: FONTS.BOLD, fontSize: 15, color: COLORS.textPrimary },
  phoneDivider: { width: 1, height: 28, backgroundColor: COLORS.border, marginRight: 12 },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontFamily: FONTS.REGULAR,
    fontSize: 16,
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },

  errorText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 13,
    color: "#DC2626",
    marginTop: 8,
  },
  hintText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 8,
    lineHeight: 18,
  },

  // OTP boxes
  otpRow: { flexDirection: "row", gap: 10, justifyContent: "center" },
  otpBox: {
    width: 48,
    height: 58,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: 24,
    fontFamily: FONTS.BOLD,
    color: COLORS.textPrimary,
  },
  otpBoxActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  otpBoxFilled: { borderColor: COLORS.primary },
  otpBoxError: { borderColor: "#DC2626", backgroundColor: "#FEF2F2" },

  progressDots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 16,
  },
  progressDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.border },
  progressDotFilled: { backgroundColor: COLORS.primary },

  // Actions area
  actionsWrap: { paddingBottom: 8 },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    gap: 12,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: {
    fontFamily: FONTS.BOLD,
    fontSize: 11,
    color: COLORS.textSecondary,
    letterSpacing: 1.5,
  },
  secondaryBtn: {
    borderRadius: 16,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: "#fff",
  },
  secondaryBtnText: {
    fontFamily: FONTS.BOLD,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  termsText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 20,
    lineHeight: 18,
  },
  termsLink: { color: COLORS.primary, fontFamily: FONTS.BOLD },

  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  resendLabel: { fontFamily: FONTS.REGULAR, fontSize: 14, color: COLORS.textSecondary },
  resendLink: { fontFamily: FONTS.BOLD, fontSize: 14, color: COLORS.primary },
  resendDisabled: { color: COLORS.textSecondary },
});