import { getAccessTokenFromSecureStore } from "../utils/localStorageKey";
import api from "./api";

const getToken = async () => {
  const token = await getAccessTokenFromSecureStore();
  return token;
};

const getAuthHeaders = async () => {
  const token = await getToken();

  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

// Fetch provider categories used during onboarding
export const getProviderCategoriesService = async () => {
  const response = await api.get("/api/providers/categories", {
    headers: await getAuthHeaders(),
  });
  return response.data;
};

// Fetch skills for a selected provider category
export const getProviderSkillsService = async (payload: {
  category: string;
}) => {
  const response = await api.get("/api/providers/skills", {
    headers: await getAuthHeaders(),
    params: payload,
  });
  return response.data;
};

// Fetch onboarding options for providers
export const getOnboardingOptionsService = async () => {
  const response = await api.get("/api/providers/onboarding-options", {
    headers: await getAuthHeaders(),
  });
  return response.data;
};

// ============ Dashboard Services ============

// Fetch provider dashboard data
export const getDashboardService = async () => {
  const headers = await getAuthHeaders();
  const response = await api.get("/api/providers/dashboard", {
    headers,
  });
  return response.data;
};

// ============ Jobs/Explore Services ============

// Fetch available jobs for provider
export const getAvailableJobsService = async (filters?: {
  category?: string;
  search?: string;
  distance?: number;
}) => {
  const headers = await getAuthHeaders();
  const response = await api.get("/api/providers/jobs", {
    headers,
    params: filters,
  });
  return response.data;
};

// Place a bid on a job
export const placeBidService = async (payload: {
  jobId: string;
  bidAmount: number;
  bidMessage?: string;
}) => {
  const headers = await getAuthHeaders();
  const response = await api.post("/api/providers/bids", payload, {
    headers,
  });
  return response.data;
};

// ============ Bids Services ============

// Fetch provider bids with optional status filter
export const getProviderBidsService = async (status?: string) => {
  const headers = await getAuthHeaders();
  const response = await api.get("/api/providers/bids", {
    headers,
    params: { status },
  });
  return response.data;
};

// ============ Earnings Services ============

// Fetch provider earnings data
export const getEarningsService = async () => {
  const headers = await getAuthHeaders();
  const response = await api.get("/api/providers/earnings", {
    headers,
  });
  return response.data;
};

// ============ Profile Services ============

// Fetch provider profile data
export const getProviderProfileService = async () => {
  const headers = await getAuthHeaders();
  const response = await api.get("/api/providers/profile", {
    headers,
  });
  return response.data;
};

// Update provider profile data
export const updateProviderProfileService = async (payload: any) => {
  const headers = await getAuthHeaders();

  const response = await api.put("/api/providers/profile", payload, {
    headers,
  });
  return response.data;
};
