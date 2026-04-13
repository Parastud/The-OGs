import { getAccessTokenFromSecureStore } from "../utils/localStorageKey";
import api from "./api";

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
