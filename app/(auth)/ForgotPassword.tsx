import PrimaryButton from '@/src/components/buttons/PrimaryButton';
import LabelTextInput from '@/src/components/inputs/LabelTextInput';
import OtpInput from '@/src/components/inputs/OtpInput';
import { ScreenWrapper } from '@/src/components/wrapper';
import useAuthApi from '@/src/hooks/apiHooks/useAuthApi';
import { COLORS } from '@/src/theme/colors';
import { FONTS } from '@/src/theme/fonts';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ForgotPassword() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { requestOtp, verifyOtp, isLoading } = useAuthApi();

  const [step, setStep] = useState<1 | 2>(1);
  const [debugOtp, setDebugOtp] = useState('');
  const [phone, setPhone] = useState(params?.phone ? String(params.phone) : '');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ phone: '', otp: '', password: '' });

  const clearError = (field: keyof typeof errors) =>
    setErrors((p) => ({ ...p, [field]: '' }));

  const validateStep1 = () => {
    if (!phone.trim()) {
      setErrors((e) => ({ ...e, phone: 'Phone is required' }));
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const next = { ...errors };
    let valid = true;
    if (otp.length < 4) { next.otp = 'Enter the 4-digit OTP'; valid = false; }
    if (password.length < 8) { next.password = 'Min. 8 characters'; valid = false; }
    setErrors(next);
    return valid;
  };

  const handleRequestOtp = async () => {
    if (!validateStep1()) return;
    const {success, debugOtp} = await requestOtp({ phone });
    setDebugOtp(debugOtp);
    if (success) { setOtp(''); setStep(2); }
  };

  const handleVerifyOtp = async () => {
    if (!validateStep2()) return;
    const ok = await verifyOtp({ phone, otp });
    if (ok) router.replace('/(tabs)');
  };

  const handleEditPhone = () => {
    setStep(1);
    setOtp('');
    setPassword('');
    setErrors({ phone: '', otp: '', password: '' });
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.container} safeArea>

      {/* Step dots */}
      <View style={styles.stepRow}>
        {[1, 2].map((s) => (
          <View
            key={s}
            style={[
              styles.dot,
              s < step && styles.dotDone,
              s === step && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {step === 1 ? 'Forgot password' : 'Reset password'}
        </Text>
        <Text style={styles.subtitle}>
          {step === 1
            ? "Enter your phone and we'll send a one-time code."
            : 'Enter the code sent to your phone and set a new password.'}
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>

        {step === 1 ? (
          <LabelTextInput
            label="Phone"
            placeholder="your phone number"
            value={phone}
            onChangeText={(t) => { setPhone(t); clearError('phone'); }}
            keyboardType="phone-pad"
            autoCapitalize="none"
            error={errors.phone}
          />
        ) : (
          /* Phone chip with edit option */
          <View style={styles.emailChip}>
            <Text style={styles.chipEmail} numberOfLines={1}>{phone}</Text>
            <TouchableOpacity onPress={handleEditPhone} style={styles.chipEditBtn}>
              <Text style={styles.chipEditText}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <>
            {/* OTP label + boxes */}
            <View style={styles.otpBlock}>
              <Text style={styles.inputLabel}>OTP CODE</Text> 
              <Text style={{color: COLORS.textSecondary, fontSize: 12}}>Debug OTP: {debugOtp}</Text>
              <OtpInput
                value={otp}
                onChange={(val) => { setOtp(val); clearError('otp'); }}
                error={errors.otp}
              />
              {errors.otp ? (
                <Text style={styles.errorText}>{errors.otp}</Text>
              ) : null}
            </View>

            <LabelTextInput
              label="New password"
              placeholder="Min. 8 characters"
              value={password}
              onChangeText={(t) => { setPassword(t); clearError('password'); }}
              variant="password"
              error={errors.password}
            />
          </>
        )}
      </View>

      {/* CTA */}
      <View style={styles.footer}>
        <PrimaryButton
          text={step === 1 ? 'Send OTP' : 'Reset password'}
          onPress={step === 1 ? handleRequestOtp : handleVerifyOtp}
          isLoading={isLoading}
          disabled={isLoading}
        />
        {step === 2 && (
          <TouchableOpacity onPress={handleRequestOtp} disabled={isLoading}>
            <Text style={styles.resendText}>
              Didn&apos;t receive it?{' '}
              <Text style={styles.resendLink}>Resend OTP</Text>
            </Text>
          </TouchableOpacity>
        )}
      </View>

    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    flex: 1,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 28,
  },
  dot: {
    height: 6,
    width: 8,
    borderRadius: 3,
    backgroundColor: COLORS.border,
  },
  dotDone: {
    width: 24,
    backgroundColor: COLORS.primaryDark,
  },
  dotActive: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontFamily: FONTS.BOLD,
    fontSize: 26,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 21,
  },
  form: {
    gap: 16,
    marginVertical: 20,
  },
  emailChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.inputBackground,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 8,
  },
  chipEmail: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  chipEditBtn: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  chipEditText: {
    fontFamily: FONTS.BOLD,
    fontSize: 12,
    color: COLORS.primary,
  },
  otpBlock: {
    gap: 10,
  },
  inputLabel: {
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  errorText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    color: COLORS.error,
    marginTop: 4,
  },
  footer: {
    gap: 14,
    paddingTop: 16,
  },
  resendText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  resendLink: {
    fontFamily: FONTS.BOLD,
    color: COLORS.primary,
  },
});