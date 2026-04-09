import PrimaryButton from '@/src/components/buttons/PrimaryButton';
import LabelTextInput from '@/src/components/inputs/LabelTextInput';
import { ScreenWrapper } from '@/src/components/wrapper';
import useAuthApi from '@/src/hooks/apiHooks/useAuthApi';
import { setAuthorizationStatus } from '@/src/redux/slices/auth.slice';
import { COLORS } from '@/src/theme/colors';
import { FONTS } from '@/src/theme/fonts';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function Register() {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { isLoading, registerUser } = useAuthApi();
  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = { fullname: '', email: '', password: '', confirmPassword: '' };
    let isValid = true;

    if (!fullname.trim()) {
      newErrors.fullname = 'Full name is required';
      isValid = false;
    } else if (fullname.trim().length < 3) {
      newErrors.fullname = 'Full name must be at least 3 characters';
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
    const isRegistered = await registerUser({ fullname, email, password });
    if (isRegistered) {
      dispatch(setAuthorizationStatus(true));
      router.replace('/(tabs)');
    }
  };

  return (
    <ScreenWrapper
      contentContainerStyle={styles.scrollContent}
      safeArea
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
          value={fullname}
          onChangeText={(text) => {
            setFullName(text);
            if (errors.fullname) setErrors({ ...errors, fullname: '' });
          }}
          error={errors.fullname}
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
            if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
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
          isLoading={isLoading}
          disabled={isLoading}
        />
      </View>

      {/* Sign In Link */}
      <View style={styles.signinContainer}>
        <Text style={styles.signinText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.replace('/(auth)/Login')}>
          <Text style={styles.signinLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
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