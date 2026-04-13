import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import OtpInput from "@/src/components/inputs/OtpInput";
import { ScreenWrapper } from "@/src/components/wrapper";
import useAuthApi from "@/src/hooks/apiHooks/useAuthApi";
import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";
import { COLORS } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function VerifyOTP() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const { verifyOtp, isLoading } = useAuthApi();
  const { isLoading: isProfileLoading } = useProviderApi();

  const phone = String(params?.phone || "");
  const debugOtp = String(params?.debugOtp || "");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }

    setError("");

    const ok = await verifyOtp({ phone, otp });

    if (!ok) {
      setError("Invalid OTP. Please try again.");
      return;
    }

    // ✅ Just redirect
    router.replace("/");
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.container} safeArea>
      <View style={styles.header}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>OTP sent to {phone}</Text>
      </View>

      <View style={styles.otpSection}>
        {/* Debug OTP (optional) */}
        {!!debugOtp && (
          <View style={styles.debugContainer}>
            <Text style={styles.debugLabel}>Test OTP</Text>
            <Text style={styles.debugOtp}>{debugOtp}</Text>
          </View>
        )}

        <OtpInput value={otp} onChange={(val) => {
          setOtp(val);
          if (error) setError("");
        }} />

        {!!error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <PrimaryButton
          text="Verify OTP"
          onPress={handleVerifyOtp}
          isLoading={isLoading || isProfileLoading}
          disabled={isLoading || isProfileLoading || otp.length < 4}
        />

        <TouchableOpacity>
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