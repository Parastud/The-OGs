import {
  getProviderCategoriesService,
  getProviderSkillsService,
  signupCustomerService,
  signupProviderService,
} from "@/src/services";

import {
  showSnackbarError,
  showSnackbarSuccess,
} from "@/src/redux/slices/snackbar.slice";

import { getErrorMessage } from "@/src/utils/utils";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface UseProviderApiReturnType {
  isLoading: boolean;
  getCategories: () => any;
  getSkills: (payload: { category: string }) => any;
  updateCustomerProfile: (payload: {
    phone: string;
    input: { fullname: string; email?: string };
  }) => any;
  updateProviderProfile: (payload: {
    phone: string;
    input: any;
  }) => any;
}

export default function useProviderApi(): UseProviderApiReturnType {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Get Categories
  const getCategories = async () => {
    try {
      setIsLoading(true);
      const data = await getProviderCategoriesService();
      return data?.providerCategories || data?.data || data?.categories || [];
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Get Skills by Category
  const getSkills = async ({ category }: { category: string }) => {
    try {
      setIsLoading(true);
      const data = await getProviderSkillsService({
        category,
      });
      return data?.providerSkills || data?.data || data?.skills || [];
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Update Provider Profile
  const updateProviderProfile = async ({
    phone,
    input,
  }: {
    phone: string;
    input: any;
  }) => {
    try {
      setIsLoading(true);
      const response = await signupProviderService({
        phone,
        input,
      });

      if (response?.success ?? response) {
        dispatch(
          showSnackbarSuccess({
            message: response?.message || "Profile updated successfully",
          }),
        );
        return { success: true, debugOtp: response?.debugOtp };
      }

      return { success: false, debugOtp: response?.debugOtp };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));
      return { success: false, debugOtp: undefined };
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Update Customer Profile
  const updateCustomerProfile = async ({
    phone,
    input,
  }: {
    phone: string;
    input: { fullname: string; email?: string };
  }) => {
    try {
      setIsLoading(true);
      const response = await signupCustomerService({
        phone,
        input,
      });

      if (response?.success ?? response) {
        dispatch(
          showSnackbarSuccess({
            message: response?.message || "Profile updated successfully",
          }),
        );
        return { success: true, debugOtp: response?.debugOtp };
      }

      return { success: false, debugOtp: response?.debugOtp };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));
      return { success: false, debugOtp: undefined };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getCategories,
    getSkills,
    updateCustomerProfile,
    updateProviderProfile,
  };
}
