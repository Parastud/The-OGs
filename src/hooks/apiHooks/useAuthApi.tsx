import { showSnackbarError, showSnackbarSuccess } from '@/src/redux/slices/snackbar.slice';
import { setUser } from '@/src/redux/slices/user.slice';
import { loginUserService, registerUserService, requestOtpService, verifyOtpService } from '@/src/services';
import { LoginUser, RegisterUser } from '@/src/types/auth.types';
import { saveTokenToSecureStore } from '@/src/utils/localStorageKey';
import { getErrorMessage } from '@/src/utils/utils';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface useAuthApiReturnType {
  isLoading: boolean;
  loginUser: (payload: LoginUser) => any;
  registerUser: (payload: RegisterUser) => any;
  requestOtp: (payload: { email: string }) => any;
  verifyOtp: (payload: { email: string, otp: string, password: string }) => any;
}

export default function useAuthApi(): useAuthApiReturnType {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (payload: LoginUser) => {
    setIsLoading(true);
    try {
      const { message, token, user, success } = await loginUserService(payload);
      if (success) {
        await saveTokenToSecureStore(token);
        dispatch(setUser({ fullname: user.fullname, email: user.email }));
        dispatch(showSnackbarSuccess({ message }));
        return true
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));
    } finally {
      setIsLoading(false);
    }
  }

  const registerUser = async (payload: RegisterUser) => {
    setIsLoading(true);
    try {
      const { message, token, user, success } = await registerUserService(payload);
      if (success) {
        await saveTokenToSecureStore(token);
        dispatch(setUser({ fullname: user.fullname, email: user.email }));
        dispatch(showSnackbarSuccess({ message }));
        return true
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));
      return false
    } finally {
      setIsLoading(false);
    }
  }

  const requestOtp = async (payload: { email: string }) => {
    setIsLoading(true);
    try {
      const { message, success, debugOtp } = await requestOtpService(payload);
      if (success) {
        dispatch(showSnackbarSuccess({ message }));
        return { success, debugOtp }
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));
      return false
    } finally {
      setIsLoading(false);
    }
  }

  const verifyOtp = async (payload: { email: string, otp: string, password: string }) => {
    setIsLoading(true);
    try {
      const { message, success, token, user } = await verifyOtpService(payload);
      if (success) {
        await saveTokenToSecureStore(token);
        dispatch(setUser({ fullname: user.fullname, email: user.email }));
        dispatch(showSnackbarSuccess({ message }));
        return true
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));
      return false
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    loginUser,
    registerUser,
    requestOtp,
    verifyOtp
  };
}