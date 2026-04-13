import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';
export const ONBOARDING_KEY = 'has_seen_onboarding';

export const getOnboardingStatus = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(ONBOARDING_KEY);
};

export const saveOnboardingStatus = async (status: string): Promise<void> => {
  await AsyncStorage.setItem(ONBOARDING_KEY, status);
};

export const getAccessTokenFromSecureStore = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(ACCESS_TOKEN);
};

export const saveTokenToSecureStore = async (
  accessToken: string,
): Promise<void> => {
  await SecureStore.setItemAsync(ACCESS_TOKEN, accessToken);
};

export const removeTokenFromSecureStore = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN);
};