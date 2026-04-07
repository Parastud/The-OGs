import EnvFlag from '@/src/components/flags/EnvFlag';
import SplashScreen from '@/src/components/Splash/SplashScreen';
import store from '@/src/redux/store';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux';

function RootLayoutNav() {
  const { initialized } = useSelector((state: any) => state.auth);

  if (!initialized) {
    return <SplashScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <EnvFlag/>
        <RootLayoutNav />
      </Provider>
    </GestureHandlerRootView>
  );
}
