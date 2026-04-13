import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import LabelTextInput from "@/src/components/inputs/LabelTextInput";
import { ScreenWrapper } from "@/src/components/wrapper";
import useAuthApi from "@/src/hooks/apiHooks/useAuthApi";
import {
  showSnackbarSuccess
} from "@/src/redux/slices/snackbar.slice";
import { UserState } from "@/src/redux/slices/user.slice";
import { COLORS } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
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

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [errors, setErrors] = useState({ phone: "", otp: "" });

  const {requestOtp, verifyOtp, isLoading } = useAuthApi();

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSendOtp = async () => {
    if (!phone.trim()) {
      setErrors({ ...errors, phone: "Phone is required" });
      return;
    }
      const { data } = await requestOtp({ phone: phone.trim() });
      if (data?.success) {
        dispatch(showSnackbarSuccess({ message: data.message }));
        if (data.debugOtp) {
          Alert.alert("DEBUG OTP", data.debugOtp);
        }
        setStep("otp");
      }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setErrors({ ...errors, otp: "OTP is required" });
      return;
    }
      const isSuccess = await verifyOtp({
         phone: phone.trim(), otp: otp.trim()
      });
      if (isSuccess) {
        router.replace("/(tabs)");
      }
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.scrollContent} safeArea>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in with your phone number</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <LabelTextInput
          label="Phone Number"
          placeholder="Enter your phone"
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            if (errors.phone) setErrors({ ...errors, phone: "" });
          }}
          keyboardType="phone-pad"
          error={errors.phone}
          autoCapitalize="none"
          editable={step === "phone"}
        />

        {step === "otp" && (
          <LabelTextInput
            label="OTP"
            placeholder="Enter the OTP sent to your phone"
            value={otp}
            onChangeText={(text) => {
              setOtp(text);
              if (errors.otp) setErrors({ ...errors, otp: "" });
            }}
            keyboardType="number-pad"
            error={errors.otp}
          />
        )}
      </View>

      {/* Action Button */}
      <View style={styles.buttonContainer}>
        {step === "phone" ? (
          <PrimaryButton
            text="Send OTP"
            onPress={handleSendOtp}
            isLoading={signinLoading}
            disabled={signinLoading}
          />
        ) : (
          <PrimaryButton
            text="Verify & Login"
            onPress={handleVerifyOtp}
            isLoading={verifyLoading}
            disabled={verifyLoading}
          />
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "space-between",
  },

  header: {
    marginBottom: 30,
  },

  title: {
    fontSize: 28,
    fontFamily: FONTS.BOLD,
    color: COLORS.textPrimary,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  form: {
    gap: 16,
    marginVertical: 20,
  },
  buttonContainer: {
    marginVertical: 20,
  },
});
