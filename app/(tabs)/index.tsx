import PrimaryButton from '@/src/components/buttons/PrimaryButton';
import { setAuthorizationStatus } from '@/src/redux/slices/auth.slice';
import { COLORS } from '@/src/theme/colors';
import { FONTS } from '@/src/theme/fonts';
import { removeTokensFromSecureStore } from '@/src/utils/localStorageKey';
import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function HomeTab() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await removeTokensFromSecureStore();
      dispatch(setAuthorizationStatus(false));
      router.replace('/(auth)/Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>The OGs</Text>
        <Text style={styles.subtitle}>Hackvision</Text>
        <Text style={styles.message}>Welcome to your home screen</Text>
      </View>
      <View style={styles.button}>
        <PrimaryButton text="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: FONTS.BOLD,
    fontSize: 32,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  message: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  button: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
