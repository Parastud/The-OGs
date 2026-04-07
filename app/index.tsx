import { setAuthorizationStatus } from '@/src/redux/slices/auth.slice';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('userEmail');
      await SecureStore.deleteItemAsync('userName');
      dispatch(setAuthorizationStatus(false));
      router.replace('/(auth)/Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
}
