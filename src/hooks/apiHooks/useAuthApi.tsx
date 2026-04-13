import { setAuthorizationStatus } from '@/src/redux/slices/auth.slice';
import { showSnackbarError, showSnackbarSuccess } from '@/src/redux/slices/snackbar.slice';
import { setUser } from '@/src/redux/slices/user.slice';
import { SIGNIN_MUTATION, VERIFY_OTP_MUTATION } from '@/src/services/auth';
import { saveTokenToSecureStore } from '@/src/utils/localStorageKey';
import { getErrorMessage } from '@/src/utils/utils';
import { useMutation } from "@apollo/client/react";
import { useDispatch } from 'react-redux';

interface useAuthApiReturnType {
  isLoading: boolean;
  requestOtp: (payload: { phone: string }) => any;
  verifyOtp: (payload: { phone: string; otp: string }) => any;
}

export default function useAuthApi(): useAuthApiReturnType {

  const dispatch = useDispatch();

  const [signinMutation, { loading: signinLoading }] = useMutation(SIGNIN_MUTATION);
  const [verifyOtpMutation, { loading: verifyLoading }] = useMutation(VERIFY_OTP_MUTATION);

  const isLoading = signinLoading || verifyLoading;

  // ✅ Send OTP
  const requestOtp = async ({ phone }: { phone: string }) => {
    try {
      const { data } = await signinMutation({
        variables: { phone },
      });

      const { success, message, debugOtp } = data.signin;

      if (success) {
        dispatch(showSnackbarSuccess({ message }));
      }

      return { success, debugOtp };

    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));

      return { success: false };
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async ({ phone, otp }: { phone: string; otp: string }) => {
    try {
      const { data } = await verifyOtpMutation({
        variables: { phone, otp },
      });

      const { success, message, token, user } = data.verifyOtp;

      if (success) {

        await saveTokenToSecureStore(token);
        dispatch(setAuthorizationStatus(true));

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
    }
  };

  return {
    isLoading,
    requestOtp,
    verifyOtp,
  };
}