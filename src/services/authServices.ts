import { LoginUser, RegisterUser } from '../types/auth.types';
import api from './api';


export const loginUserService = async (payload: LoginUser) => {
  const response = await api.post('/api/v1/auth/signin', payload);
  return response.data;
};

export const registerUserService = async (payload: RegisterUser) => {
  const response = await api.post('/api/v1/auth/signup', payload);
  return response.data;
};

export const requestOtpService = async (payload: { email: string }) => {
  const response = await api.post('/api/v1/auth/req-otp', payload);
  return response.data;
};

export const verifyOtpService = async (payload: { email: string, otp: string, password: string }) => {
  const response = await api.post('/api/v1/auth/verify-otp', payload);
  return response.data;
};