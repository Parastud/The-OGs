import { LoginUser, RegisterUser } from '../types/auth.types';
import { getAccessTokenFromSecureStore } from '../utils/localStorageKey';
import api from './api';

const Authorization=await getAccessTokenFromSecureStore();

export const getTodoService = async () => {
  const response = await api.get('/api/demo/get-todos', { headers: {Authorization} });
  return response.data;
};

export const createTodoService = async (payload: any) => {
  const response = await api.post('/api/demo/post-todo', payload, { headers: {Authorization} });
  return response.data;
};

export const deleteTodoService = async (id:string) => {
  const response = await api.delete(`/api/demo/delete-todo/${id}`, { headers: {Authorization} });
  return response.data;
};

export const toggleTodoService = async (id: string) => {
  const response = await api.patch(`/api/demo/toggle-todo/${id}`, { headers: {Authorization} });
  return response.data;
};