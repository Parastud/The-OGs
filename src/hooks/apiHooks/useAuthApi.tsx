import { setAuthorizationStatus } from "@/src/redux/slices/auth.slice";
import {
  showSnackbarError,
  showSnackbarSuccess,
} from "@/src/redux/slices/snackbar.slice";
import { setUser } from "@/src/redux/slices/user.slice";
import { requestOtpService, verifyOtpService } from "@/src/services";
import { saveTokenToSecureStore } from "@/src/utils/localStorageKey";
import { getErrorMessage } from "@/src/utils/utils";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface useAuthApiReturnType {
  isLoading: boolean;
  requestOtp: (payload: { phone: string }) => any;
  verifyOtp: (payload: { phone: string; otp: string }) => any;
  lastError: string | null;
  clearError: () => void;
}

export default function useAuthApi(): useAuthApiReturnType {
  const dispatch = useDispatch();
  const [lastError, setLastError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Send OTP
  const requestOtp = async ({ phone }: { phone: string }) => {
    try {
      setIsLoading(true);
      const data = await requestOtpService({
        phone,
      });

      const { success, message, debugOtp } = data || {};

      if (success) {
        dispatch(
          showSnackbarSuccess({ message: message || "OTP sent successfully" }),
        );
        setLastError(null);
      }

      return { success, message, debugOtp };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));
      setLastError(errorMessage);

      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async ({ phone, otp }: { phone: string; otp: string }) => {
    try {
      setIsLoading(true);
      const data = await verifyOtpService({
        phone,
        otp,
      });

      const { success, message, token, user } = data || {};

      if (success) {
        if (token) {
          await saveTokenToSecureStore(token);
        }
        dispatch(setAuthorizationStatus(true));

        dispatch(
          setUser({
            fullname: user?.fullname || "",
            phone: user?.phone || "",
          }),
        );

        if (message) {
          dispatch(showSnackbarSuccess({ message }));
        }

        return true;
      }

      return false;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    requestOtp,
    verifyOtp,
    lastError,
    clearError: () => setLastError(null),
  };
}
