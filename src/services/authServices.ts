import api from './api';

// Check phone registration status
export const checkPhoneService = async (payload: { phone: string }) => {
  const response = await api.get('/api/auth/check-phone', {
    params: payload,
  });
  return response.data;
};

// Send OTP
export const requestOtpService = async (payload: { phone: string }) => {
  const response = await api.post('/api/auth/signin', payload);
  return response.data;
};

// Verify OTP
export const verifyOtpService = async (payload: { phone: string; otp: string }) => {
  const response = await api.post('/api/auth/verify-otp', payload);
  return response.data;
};

// Complete customer signup
export const signupCustomerService = async (payload: {
  phone: string;
  input: { fullname: string; email?: string };
}) => {
  const response = await api.post('/api/auth/signup/customer', payload);
  return response.data;
};

// Complete provider signup
export const signupProviderService = async (payload: {
  phone: string;
  input: any;
}) => {
  const response = await api.post('/api/auth/signup/provider', payload);
  return response.data;
};