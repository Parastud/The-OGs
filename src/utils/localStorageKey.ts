import * as SecureStore from 'expo-secure-store';

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

export const getAccessTokenFromSecureStore = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(ACCESS_TOKEN);
};

export const getRefreshTokenFromSecureStore = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(REFRESH_TOKEN);
};

export const saveTokensToSecureStore = async (
  accessToken: string,
  refreshToken?: string
): Promise<void> => {
  await SecureStore.setItemAsync(ACCESS_TOKEN, accessToken);
  if (refreshToken) {
    await SecureStore.setItemAsync(REFRESH_TOKEN, refreshToken);
  }
};

export const removeTokensFromSecureStore = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN);
};