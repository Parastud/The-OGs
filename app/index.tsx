import SplashScreen from "@/src/components/Splash/SplashScreen";
import {
  setAuthorizationStatus,
  setInitialized,
} from "@/src/redux/slices/auth.slice";
import { getAccessTokenFromSecureStore } from "@/src/utils/localStorageKey";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const { initialized, isAuthenticated } = useSelector(
    (state: any) => state.auth,
  );
  const router = useRouter();
  const [isSplashVisible, setSplashVisible] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await getAccessTokenFromSecureStore();
        dispatch(setAuthorizationStatus(!!token));
      } catch {
        dispatch(setAuthorizationStatus(false));
      } finally {
        dispatch(setInitialized(true));
      }
    };

    initializeAuth();

    const splashTimeout = setTimeout(() => {
      setSplashVisible(false);
    }, 2000);

    return () => clearTimeout(splashTimeout);
  }, [dispatch]);

  useEffect(() => {
    if (!initialized || isSplashVisible) return;

    if (isAuthenticated) {
      router.replace("/(tabs)");
    } else {
      router.replace("/screen/dashboard");
    }
  }, [initialized, isAuthenticated, isSplashVisible, router]);

  return <SplashScreen />;
}
