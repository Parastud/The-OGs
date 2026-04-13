import { showSnackbarError, showSnackbarSuccess } from '@/src/redux/slices/snackbar.slice';
import { setUser } from '@/src/redux/slices/user.slice';
import { requestOtpService, verifyOtpService } from '@/src/services';
import { saveTokenToSecureStore } from '@/src/utils/localStorageKey';
import { getErrorMessage } from '@/src/utils/utils';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface useAuthApiReturnType {
  isLoading: boolean;
  requestOtp: (payload: { phone: string }) => any;
  verifyOtp: (payload: { phone: string; otp: string }) => any;
}

export default function useAuthApi(): useAuthApiReturnType {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // Send OTP
  const requestOtp = async (payload: { phone: string }) => {
    setIsLoading(true);

    try {

      const { success, message, debugOtp } = await requestOtpService(payload);

      if (success) {
        dispatch(showSnackbarSuccess({ message }));
      }

      return { success, debugOtp };

    } catch (error) {

      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));

      return { success: false };

    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async (payload: { phone: string; otp: string }) => {

    setIsLoading(true);

    try {

      const { success, message, token, user } = await verifyOtpService(payload);

      if (success) {

        await saveTokenToSecureStore(token);

        dispatch(
          setUser({
            fullname: user.fullname,
            phone: user.phone,
          })
        );

        dispatch(showSnackbarSuccess({ message }));

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
  };
}