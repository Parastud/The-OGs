import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import OtpInput from "@/src/components/inputs/OtpInput";
import { ScreenWrapper } from "@/src/components/wrapper";
import useAuthApi from "@/src/hooks/apiHooks/useAuthApi";
import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";
import { COLORS } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OtpVerify from "react-native-otp-verify";

// Regex to extract a 4–6 digit OTP from an SMS body
const OTP_REGEX = /\b(\d{4,6})\b/;

export default function VerifyOTP() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const { verifyOtp, isLoading } = useAuthApi();
  const { isLoading: isProfileLoading } = useProviderApi();

  const phone = String(params?.phone || "");
  const debugOtp = String(params?.debugOtp || "");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const hasAutoSubmitted = useRef(false); // prevent double-submit

// ─── Android: SMS Retriever API ──────────────────────────────────────────
useEffect(() => {
    if (Platform.OS !== "android") return;

    let active = true;

    const startRetriever = async () => {
        try {
            const hash = await OtpVerify.getHash();
            console.log("App hash:", hash);

            await OtpVerify.startOtpListener((message: string) => {
                if (!active) return;

                const match = message?.match(OTP_REGEX);
                if (match?.[1]) {
                    const extracted = match[1];

                    // ✅ Set OTP and immediately trigger submit
                    // Don't rely on useEffect to catch this — call directly
                    setOtp(extracted);
                    setError("");

                    // Directly submit after a tick to let state settle
                    setTimeout(() => {
                        if (active) handleVerifyOtp(extracted);
                    }, 100);
                }
            });
        } catch (e) {
            console.warn("SMS Retriever error:", e);
        }
    };

    startRetriever();

    return () => {
        active = false;
        OtpVerify.removeListener();
    };
}, []); // ← handleVerifyOtp must be stable or use useCallback

// ─── Auto-submit once OTP is fully filled (for iOS / manual entry) ────────
useEffect(() => {
    const OTP_LENGTH = 4;

    if (otp.length === OTP_LENGTH && !hasAutoSubmitted.current) {
        hasAutoSubmitted.current = true;
        handleVerifyOtp(otp);
    }
}, [otp]);

// ─── Stable verify handler via useCallback ────────────────────────────────
const handleVerifyOtp = useCallback(async (otpValue = otp) => {
    if (!otpValue.trim()) {
        setError("OTP is required");
        return;
    }
    setError("");

    const ok = await verifyOtp({ phone, otp: otpValue });

    if (!ok) {
        hasAutoSubmitted.current = false;
        setError("Invalid OTP. Please try again.");
        return;
    }

    router.replace("/");
}, [otp, phone]); // include stable deps

  // ─── Auto-submit once OTP is fully filled ────────────────────────────────
  useEffect(() => {
    const OTP_LENGTH = 4; // adjust to match your OTP length

    if (otp.length === OTP_LENGTH && !hasAutoSubmitted.current) {
      hasAutoSubmitted.current = true;
      handleVerifyOtp(otp);
    }
  }, [otp]);

  return (
    <ScreenWrapper contentContainerStyle={styles.container} safeArea>
      <View style={styles.header}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>OTP sent to {phone}</Text>
      </View>

      <View style={styles.otpSection}>
        {!!debugOtp && (
          <View style={styles.debugContainer}>
            <Text style={styles.debugLabel}>Test OTP</Text>
            <Text style={styles.debugOtp}>{debugOtp}</Text>
          </View>
        )}

        <OtpInput
          value={otp}
          // ✅ iOS: triggers the native "From Messages" autofill banner
          textContentType="oneTimeCode"
          hasError={!!error}
          onChange={(val) => {
            setOtp(val);
            hasAutoSubmitted.current = false; // reset on manual edit
            if (error) setError("");
          }}
        />

        {!!error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          text="Verify OTP"
          onPress={() => handleVerifyOtp()}
          isLoading={isLoading || isProfileLoading}
          disabled={isLoading || isProfileLoading || otp.length < 4}
        />

        <TouchableOpacity onPress={() => {
          hasAutoSubmitted.current = false;
          setOtp("");
        }}>
          <Text style={styles.resendText}>
            Didn&apos;t receive OTP? <Text style={styles.resend}>Resend</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    marginTop: 20,
  },

  title: {
    fontSize: 28,
    fontFamily: FONTS.BOLD,
    color: COLORS.textPrimary,
  },

  subtitle: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
    marginTop: 6,
  },

  otpSection: {
    gap: 20,
    alignItems: "center",
    marginTop: 40,
  },

  debugContainer: {
    backgroundColor: COLORS.inputBackground,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },

  debugLabel: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },

  debugOtp: {
    fontSize: 24,
    fontFamily: FONTS.BOLD,
    letterSpacing: 6,
    marginTop: 4,
    color: COLORS.textPrimary,
  },

  errorText: {
    color: "#DC2626",
    fontSize: 13,
    fontFamily: FONTS.REGULAR,
  },

  footer: {
    marginTop: 60,
    gap: 20,
  },

  resendText: {
    textAlign: "center",
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },

  resend: {
    color: COLORS.primary,
    fontFamily: FONTS.BOLD,
  },
});