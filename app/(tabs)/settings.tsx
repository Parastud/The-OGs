import { COLORS } from '@/src/theme/colors';
import { FONTS } from '@/src/theme/fonts';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function SettingsTab() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.message}>Settings content coming soon</Text>
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
    fontSize: 24,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  message: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
