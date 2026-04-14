import api from "./api";
import { getAccessTokenFromSecureStore } from "../utils/localStorageKey";

const getAuthHeaders = async () => {
  const token = await getAccessTokenFromSecureStore();
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

export const getChatMessagesService = async (payload: {
  jobId: string;
  otherUserId: string;
}) => {
  const response = await api.get(
    `/api/chats/jobs/${payload.jobId}/with/${payload.otherUserId}/messages`,
    { headers: await getAuthHeaders() },
  );

  return response.data;
};

export const sendChatMessageService = async (payload: {
  jobId: string;
  otherUserId: string;
  text?: string;
  imageUrl?: string;
}) => {
  const response = await api.post(
    `/api/chats/jobs/${payload.jobId}/with/${payload.otherUserId}/messages`,
    payload,
    { headers: await getAuthHeaders() },
  );

  return response.data;
};

export const getOfflineMessageNotificationsService = async () => {
  const response = await api.get("/api/chats/notifications/offline-messages", {
    headers: await getAuthHeaders(),
  });

  return response.data;
};

export const acknowledgeOfflineMessageNotificationsService = async () => {
  const response = await api.post(
    "/api/chats/notifications/offline-messages/ack-all",
    {},
    { headers: await getAuthHeaders() },
  );

  return response.data;
};
