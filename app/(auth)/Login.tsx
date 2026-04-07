import PrimaryButton from '@/src/components/buttons/PrimaryButton';
import LabelTextInput from '@/src/components/inputs/LabelTextInput';
import { setAuthorizationStatus } from '@/src/redux/slices/auth.slice';
import { COLORS } from '@/src/theme/colors';
import { FONTS } from '@/src/theme/fonts';
import { saveTokensToSecureStore } from '@/src/utils/localStorageKey';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

export default function Login() {
  console.log('Rendering Login Screen');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const router = useRouter();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Login attempt:', { email, password });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demo purposes, accept any valid email/password
      // In production, this would be an actual API call
      const token = `token_${Date.now()}_${Math.random()}`;

      // Store token
      await saveTokensToSecureStore(token);
      await SecureStore.setItemAsync('userEmail', email);

      dispatch(setAuthorizationStatus(true));
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        ...errors,
        password: 'Login failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <LabelTextInput
              label="Email"
              placeholder="your@email.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              keyboardType="email-address"
              error={errors.email}
              autoCapitalize="none"
            />

            <LabelTextInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              variant="password"
              error={errors.password}
            />

            {/* Forgot Password Link */}
            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <View style={styles.buttonContainer}>
            <PrimaryButton
              text="Sign In"
              onPress={handleLogin}
              isLoading={loading}
              disabled={loading}
            />
          </View>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/Register')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  header: {
    marginVertical: 30,
  },
  title: {
    fontFamily: FONTS.BOLD,
    fontSize: 28,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  form: {
    gap: 16,
    marginVertical: 20,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 13,
    color: COLORS.primary,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  signupText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  signupLink: {
    fontFamily: FONTS.BOLD,
    fontSize: 13,
    color: COLORS.primary,
  },
});
