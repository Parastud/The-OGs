import api from './api';

// Send OTP
export const requestOtpService = async (payload: { phone: string }) => {
  const response = await api.post('/api/v1/auth/signin', payload);
  return response.data;
};

// Verify OTP
export const verifyOtpService = async (payload: { phone: string; otp: string }) => {
  const response = await api.post('/api/v1/auth/verify-otp', payload);
  return response.data;
};