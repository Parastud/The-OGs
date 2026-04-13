import api from "./api";

// ============ Onboarding Services ============

// Fetch provider categories used during onboarding
export const getProviderCategoriesService = async () => {
  const response = await api.get("/api/providers/categories");
  return response.data;
};

// Fetch skills for a selected provider category
export const getProviderSkillsService = async (payload: {
  category: string;
}) => {
  const response = await api.get("/api/providers/skills", {
    params: payload,
  });
  return response.data;
};

// Fetch onboarding options for providers
export const getOnboardingOptionsService = async () => {
  const response = await api.get("/api/providers/onboarding-options");
  return response.data;
};

// ============ Dashboard Services ============

// Fetch provider dashboard data
export const getDashboardService = async (token: string) => {
  const response = await api.get("/api/providers/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ============ Jobs/Explore Services ============

// Fetch available jobs for provider
export const getAvailableJobsService = async (
  token: string,
  filters?: { category?: string; search?: string; distance?: number },
) => {
  const response = await api.get("/api/providers/jobs", {
    headers: { Authorization: `Bearer ${token}` },
    params: filters,
  });
  return response.data;
};

// Place a bid on a job
export const placeBidService = async (
  token: string,
  payload: { jobId: string; bidAmount: number; bidMessage?: string },
) => {
  const response = await api.post("/api/providers/bids", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ============ Bids Services ============

// Fetch provider bids with optional status filter
export const getProviderBidsService = async (
  token: string,
  status?: string,
) => {
  const response = await api.get("/api/providers/bids", {
    headers: { Authorization: `Bearer ${token}` },
    params: { status },
  });
  return response.data;
};

// ============ Earnings Services ============

// Fetch provider earnings data
export const getEarningsService = async (token: string) => {
  const response = await api.get("/api/providers/earnings", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ============ Profile Services ============

// Fetch provider profile data
export const getProviderProfileService = async (token: string) => {
  const response = await api.get("/api/providers/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update provider profile data
export const updateProviderProfileService = async (
  token: string,
  payload: any,
) => {
  const response = await api.put("/api/providers/profile", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
