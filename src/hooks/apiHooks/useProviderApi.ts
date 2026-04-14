import {
  getProviderCategoriesService,
  getProviderSkillsService,
  signupCustomerService,
  signupProviderService,
  getDashboardService,
  getAvailableJobsService,
  getProviderJobDetailsService,
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
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

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
  getProviderJobDetails: (jobId: string) => Promise<any>;
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

  // ✅ Get Categories
  const getCategories = useCallback(async () => {
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
  }, [dispatch]);

  // ✅ Get Skills by Category
  const getSkills = useCallback(
    async ({ category }: { category: string }) => {
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
    },
    [dispatch],
  );

  // ✅ Update Provider Profile
  const updateProviderProfile = useCallback(
    async ({ phone, input }: { phone: string; input: any }) => {
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
    },
    [dispatch],
  );

  // ✅ Update Customer Profile
  const updateCustomerProfile = useCallback(
    async ({
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
    },
    [dispatch],
  );

  // ✅ Get Dashboard
  const getDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getDashboardService();
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
  }, [dispatch]);

  // ✅ Get Available Jobs
  const getAvailableJobs = useCallback(
    async (filters?: {
      category?: string;
      search?: string;
      distance?: number;
    }) => {
      try {
        setIsLoading(true);
        const data = await getAvailableJobsService(filters);
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
    },
    [dispatch],
  );

  const getProviderJobDetails = useCallback(
    async (jobId: string) => {
      try {
        setIsLoading(true);
        const data = await getProviderJobDetailsService(jobId);
        if (!data?.success)
          throw new Error(data?.message || "Failed to fetch job details");
        return data?.data || null;
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        dispatch(showSnackbarError({ message: errorMessage }));
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  // ✅ Place Bid
  const placeBid = useCallback(
    async (payload: {
      jobId: string;
      bidAmount: number;
      bidMessage?: string;
    }) => {
      try {
        setIsLoading(true);
        const data = await placeBidService(payload);
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
    },
    [dispatch],
  );

  // ✅ Get Provider Bids
  const getProviderBids = useCallback(
    async (status?: string) => {
      try {
        setIsLoading(true);
        const data = await getProviderBidsService(status);
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
    },
    [dispatch],
  );

  // ✅ Get Earnings
  const getEarnings = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getEarningsService();
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
  }, [dispatch]);

  // ✅ Get Provider Profile
  const getProviderProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getProviderProfileService();
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
  }, [dispatch]);

  // ✅ Update Profile Data
  const updateProfileData = useCallback(
    async (payload: any) => {
      try {
        setIsLoading(true);
        const data = await updateProviderProfileService(payload);
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
    },
    [dispatch],
  );

  return {
    isLoading,
    getCategories,
    getSkills,
    updateCustomerProfile,
    updateProviderProfile,
    getDashboard,
    getAvailableJobs,
    getProviderJobDetails,
    placeBid,
    getProviderBids,
    getEarnings,
    getProviderProfile,
    updateProfileData,
  };
}
