import SplashScreen from "@/src/components/Splash/SplashScreen";
import {
  setAuthorizationStatus,
  setInitialized,
} from "@/src/redux/slices/auth.slice";
import {
  getAccessTokenFromSecureStore,
  getOnboardingStatus,
} from "@/src/utils/localStorageKey";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const { initialized, isAuthenticated } = useSelector(
    (state: any) => state.auth,
  );
  const router = useRouter();
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [onboardingChecked, setOnboardingChecked] = useState(false);
  const [onboardingDone, setOnboardingDone] = useState(false);
  const hasRedirected = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const [token, onboardingFlag] = await Promise.all([
          getAccessTokenFromSecureStore(),
          getOnboardingStatus(),
        ]);
        dispatch(setAuthorizationStatus(!!token));
        setOnboardingDone(onboardingFlag === "true");
      } catch {
        dispatch(setAuthorizationStatus(false));
        setOnboardingDone(false);
      } finally {
        dispatch(setInitialized(true));
        setOnboardingChecked(true);
      }
    };

    initializeAuth();

    const splashTimeout = setTimeout(() => {
      setSplashVisible(false);
    }, 2000);

    return () => clearTimeout(splashTimeout);
  }, [dispatch]);

  useEffect(() => {
    if (
      !initialized ||
      isSplashVisible ||
      !onboardingChecked ||
      hasRedirected.current
    )
      return;

    hasRedirected.current = true;

    if (!onboardingDone) {
      router.replace("/Onboarding");
      return;
    }

    if (isAuthenticated) {
      router.replace("/Provider/dashboard");
    } else {
      router.replace("/screen/SettingsScreen");
    }
  }, [
    initialized,
    isAuthenticated,
    isSplashVisible,
    onboardingChecked,
    onboardingDone,
    router,
  ]);

  return <SplashScreen />;
}
