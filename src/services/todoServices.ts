import { getAccessTokenFromSecureStore } from '../utils/localStorageKey';
import api from './api';

const getAuthorizationHeader = async () => {
  const token = await getAccessTokenFromSecureStore();
  return token ? { Authorization: token } : {};
};

export const getTodoService = async () => {
  const headers = await getAuthorizationHeader();
  const response = await api.get('/api/demo/get-todos', { headers });
  return response.data;
};

export const createTodoService = async (payload: any) => {
  const headers = await getAuthorizationHeader();
  const response = await api.post('/api/demo/post-todo', payload, { headers });
  return response.data;
};

export const deleteTodoService = async (id: string) => {
  const headers = await getAuthorizationHeader();
  const response = await api.delete(`/api/demo/delete-todo?id=${id}`, { headers });
  return response.data;
};

export const toggleTodoService = async (id: string) => {
  const headers = await getAuthorizationHeader();
  const response = await api.patch(`/api/demo/toggle-todo?id=${id}`, null, { headers });
  return response.data;
};