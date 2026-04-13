import {
  getProviderCategoriesService,
  getProviderSkillsService,
  signupCustomerService,
  signupProviderService,
  getDashboardService,
  getAvailableJobsService,
  placeBidService,
  getProviderBidsService,
  getEarningsService,
  getProviderProfileService,
  updateProviderProfileService,
} from "@/src/services";

import {
  showSnackbarError,
  showSnackbarSuccess,
} from "@/src/redux/slices/snackbar.slice";

import { getErrorMessage } from "@/src/utils/utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UseProviderApiReturnType {
  isLoading: boolean;
  getCategories: () => any;
  getSkills: (payload: { category: string }) => any;
  updateCustomerProfile: (payload: {
    phone: string;
    input: { fullname: string; email?: string };
  }) => any;
  updateProviderProfile: (payload: { phone: string; input: any }) => any;
  getDashboard: () => Promise<any>;
  getAvailableJobs: (filters?: {
    category?: string;
    search?: string;
    distance?: number;
  }) => Promise<any>;
  placeBid: (payload: {
    jobId: string;
    bidAmount: number;
    bidMessage?: string;
  }) => Promise<any>;
  getProviderBids: (status?: string) => Promise<any>;
  getEarnings: () => Promise<any>;
  getProviderProfile: () => Promise<any>;
  updateProfileData: (payload: any) => Promise<any>;
}

export default function useProviderApi(): UseProviderApiReturnType {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // Get token from redux store (you may need to adjust based on your store structure)
  const token = useSelector((state: any) => state.auth?.token || "");

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

  // ✅ Get Dashboard
  const getDashboard = async () => {
    try {
      setIsLoading(true);
      const data = await getDashboardService(token);
      if (!data?.success)
        throw new Error(data?.message || "Failed to fetch dashboard");
      return data?.data || {};
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Get Available Jobs
  const getAvailableJobs = async (filters?: {
    category?: string;
    search?: string;
    distance?: number;
  }) => {
    try {
      setIsLoading(true);
      const data = await getAvailableJobsService(token, filters);
      if (!data?.success)
        throw new Error(data?.message || "Failed to fetch jobs");
      return data?.data || [];
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Place Bid
  const placeBid = async (payload: {
    jobId: string;
    bidAmount: number;
    bidMessage?: string;
  }) => {
    try {
      setIsLoading(true);
      const data = await placeBidService(token, payload);
      if (!data?.success)
        throw new Error(data?.message || "Failed to place bid");
      dispatch(
        showSnackbarSuccess({
          message: data?.message || "Bid placed successfully",
        }),
      );
      return { success: true, data: data?.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Get Provider Bids
  const getProviderBids = async (status?: string) => {
    try {
      setIsLoading(true);
      const data = await getProviderBidsService(token, status);
      if (!data?.success)
        throw new Error(data?.message || "Failed to fetch bids");
      return data?.data || [];
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Get Earnings
  const getEarnings = async () => {
    try {
      setIsLoading(true);
      const data = await getEarningsService(token);
      if (!data?.success)
        throw new Error(data?.message || "Failed to fetch earnings");
      return data?.data || {};
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Get Provider Profile
  const getProviderProfile = async () => {
    try {
      setIsLoading(true);
      const data = await getProviderProfileService(token);
      if (!data?.success)
        throw new Error(data?.message || "Failed to fetch profile");
      return data?.data || {};
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Update Profile Data
  const updateProfileData = async (payload: any) => {
    try {
      setIsLoading(true);
      const data = await updateProviderProfileService(token, payload);
      if (!data?.success)
        throw new Error(data?.message || "Failed to update profile");
      dispatch(
        showSnackbarSuccess({
          message: data?.message || "Profile updated successfully",
        }),
      );
      return { success: true, data: data?.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));
      return { success: false };
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
    getDashboard,
    getAvailableJobs,
    placeBid,
    getProviderBids,
    getEarnings,
    getProviderProfile,
    updateProfileData,
  };
}
