import PrimaryButton from '@/src/components/buttons/PrimaryButton';
import LabelTextInput from '@/src/components/inputs/LabelTextInput';
import { setAuthorizationStatus } from '@/src/redux/slices/auth.slice';
import { COLORS } from '@/src/theme/colors';
import { FONTS } from '@/src/theme/fonts';
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

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    let isValid = true;

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
      isValid = false;
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Register attempt:', { fullName, email, password });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demo purposes, simulate registration success
      const token = `token_${Date.now()}_${Math.random()}`;

      // Store token and user info
      await SecureStore.setItemAsync('authToken', token);
      await SecureStore.setItemAsync('userEmail', email);
      await SecureStore.setItemAsync('userName', fullName);

      dispatch(setAuthorizationStatus(true));
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Register error:', error);
      setErrors({
        ...errors,
        email: 'Registration failed. Please try again.',
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
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us to get started</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <LabelTextInput
              label="Full Name"
              placeholder="John Doe"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                if (errors.fullName) setErrors({ ...errors, fullName: '' });
              }}
              error={errors.fullName}
              autoCapitalize="words"
            />

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
              placeholder="Create a password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              variant="password"
              error={errors.password}
            />

            <LabelTextInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword)
                  setErrors({ ...errors, confirmPassword: '' });
              }}
              variant="password"
              error={errors.confirmPassword}
            />
          </View>

          {/* Register Button */}
          <View style={styles.buttonContainer}>
            <PrimaryButton
              text="Create Account"
              onPress={handleRegister}
              isLoading={loading}
              disabled={loading}
            />
          </View>

          {/* Sign In Link */}
          <View style={styles.signinContainer}>
            <Text style={styles.signinText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/Login')}>
              <Text style={styles.signinLink}>Sign In</Text>
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
    marginVertical: 20,
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
    marginVertical: 15,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  signinText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  signinLink: {
    fontFamily: FONTS.BOLD,
    fontSize: 13,
    color: COLORS.primary,
  },
});
