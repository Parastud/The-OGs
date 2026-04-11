import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="Login"
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="Register"
        options={{
          title: 'Register',
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        options={{
          title: 'Forgot Password',
        }}
      />
    </Stack>
  );
}
