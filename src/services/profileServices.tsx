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

export const getProfileService = async () => {
  const headers = await getAuthHeaders();
  const response = await api.get("/api/profile/fetch", {
    headers,
  });
  return response.data;
};