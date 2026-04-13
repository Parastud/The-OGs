import api from "./api";
import { getAccessTokenFromSecureStore } from "../utils/localStorageKey";

const getAuthHeaders = async () => {
  const token = await getAccessTokenFromSecureStore();

  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

export const getConsumerDashboardService = async () => {
  const response = await api.get("/api/consumers/dashboard", {
    headers: await getAuthHeaders(),
  });

  return response.data;
};

export const searchConsumerProvidersService = async (params: {
  q?: string;
  category?: string;
  limit?: number;
}) => {
  const response = await api.get("/api/consumers/search/providers", {
    headers: await getAuthHeaders(),
    params,
  });

  return response.data;
};

export const getConsumerJobsService = async (
  status?: "all" | "active" | "pending" | "completed",
) => {
  const response = await api.get("/api/consumers/jobs", {
    headers: await getAuthHeaders(),
    params: status ? { status } : undefined,
  });

  return response.data;
};

export const createConsumerJobService = async (payload: {
  title: string;
  description?: string;
  category: string;
  budgetMin?: number;
  budgetMax: number;
  locationCity: string;
  locationArea?: string;
  deadline?: string;
}) => {
  const response = await api.post("/api/consumers/jobs", payload, {
    headers: await getAuthHeaders(),
  });

  return response.data;
};

export const completeConsumerJobService = async (jobId: string) => {
  const response = await api.patch(
    `/api/consumers/jobs/${jobId}/complete`,
    {},
    {
      headers: await getAuthHeaders(),
    },
  );

  return response.data;
};

export * from "./authServices";
export * from "./providerServices";
