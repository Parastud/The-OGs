import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import LabelTextInput from "@/src/components/inputs/LabelTextInput";
import { ScreenWrapper } from "@/src/components/wrapper";
import { setAuthorizationStatus } from "@/src/redux/slices/auth.slice";
import { setUser, UserState } from "@/src/redux/slices/user.slice";
import {
  showSnackbarSuccess,
  showSnackbarError,
} from "@/src/redux/slices/snackbar.slice";
import { saveTokenToSecureStore } from "@/src/utils/localStorageKey";
import { getErrorMessage } from "@/src/utils/utils";
import { COLORS } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client/react";
import { SIGNIN_MUTATION, VERIFY_OTP_MUTATION } from "@/src/graphql/mutations";
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

  const router = useRouter();
  const dispatch = useDispatch();

  const [signin, { loading: signinLoading }] = useMutation<SigninResponse>(SIGNIN_MUTATION);
  const [verifyOtp, { loading: verifyLoading }] =
    useMutation<VerifyOtpResponse>(VERIFY_OTP_MUTATION);

  const handleSendOtp = async () => {
    if (!phone.trim()) {
      setErrors({ ...errors, phone: "Phone is required" });
      return;
    }
    try {
      const { data } = await signin({ variables: { phone: phone.trim() } });
      if (data?.signin?.success) {
        dispatch(showSnackbarSuccess({ message: data.signin.message }));
        if (data.signin.debugOtp) {
          Alert.alert("DEBUG OTP", data.signin.debugOtp);
        }
        setStep("otp");
      }
    } catch (e) {
      dispatch(showSnackbarError({ message: getErrorMessage(e) }));
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setErrors({ ...errors, otp: "OTP is required" });
      return;
    }
    try {
      const { data } = await verifyOtp({
        variables: { phone: phone.trim(), otp: otp.trim() },
      });
      if (data?.verifyOtp?.success) {
        await saveTokenToSecureStore(data.verifyOtp.token);
        dispatch(setUser(data.verifyOtp.user));
        dispatch(setAuthorizationStatus(true));
        dispatch(showSnackbarSuccess({ message: data.verifyOtp.message }));
        router.replace("/(tabs)");
      }
    } catch (e) {
      dispatch(showSnackbarError({ message: getErrorMessage(e) }));
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
    marginVertical: 30,
  },
  title: {
    fontFamily: FONTS.BOLD,
    fontSize: 28,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONTS.REGULAR,
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
