import PrimaryButton from '@/src/components/buttons/PrimaryButton';
import LabelTextInput from '@/src/components/inputs/LabelTextInput';
import { ScreenWrapper } from '@/src/components/wrapper';
import useAuthApi from '@/src/hooks/apiHooks/useAuthApi';
import { COLORS } from '@/src/theme/colors';
import { FONTS } from '@/src/theme/fonts';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PhoneLogin() {

  const router = useRouter();
  const { requestOtp, isLoading } = useAuthApi();

  const [phone, setPhone] = useState('');

  const handleSendOtp = async () => {

    if (phone.length < 10) {
      return;
    }

    const response = await requestOtp({ phone });

    if (response?.success) {
      router.push({
        pathname: "/(auth)/VerifyOTP",
        params: { phone, debugOtp: response.debugOtp }
      });
    }
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.container} safeArea>

      <View style={styles.header}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>
          Enter your phone number to continue
        </Text>
      </View>

      <View style={styles.formCard}>

        <LabelTextInput
          label="Phone Number"
          placeholder="Enter phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <PrimaryButton
          text="Send OTP"
          onPress={handleSendOtp}
          isLoading={isLoading}
          disabled={phone.length < 10}
        />

      </View>

    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  },

  header: {
    marginBottom: 30
  },

  title: {
    fontSize: 28,
    fontFamily: FONTS.BOLD,
    color: COLORS.textPrimary
  },

  subtitle: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
    marginTop: 6
  },

  formCard: {
    gap: 18
  }

});