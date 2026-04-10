import { removeTokenFromSecureStore } from '@/src/utils/localStorageKey';
import { router } from 'expo-router';
import { useContext } from 'react';
import {
    Alert,
    Linking,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../src/state';

const SettingsScreen = () => {
  const { fullname } = useSelector(state => state.user);
  const value = useContext(GlobalState);
  const dark = value.isDarkMode;

  const PRIVACY_POLICY_URL = "https://google.com";
  const ACCOUNT_DELETION_URL = "https://google.com";

  const openPrivacyPolicy = () => Linking.openURL(PRIVACY_POLICY_URL);
  const openAccountDeletion = () => Linking.openURL(ACCOUNT_DELETION_URL);

  const handleLogoutConfirmed = async() => {
    await removeTokenFromSecureStore();
    router.replace('/login'); // Redirect to login screen
  }

  // ✅ Logout Function
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: handleLogoutConfirmed
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: dark ? '#0F1117' : '#F2F3F7' }]}>
      <StatusBar
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={dark ? '#0F1117' : '#F2F3F7'}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: dark ? '#1E2736' : '#DCE0F0' }]}>
          <Text style={[styles.avatarText, { color: dark ? '#7B9CFF' : '#3D5AFE' }]}>
            {(fullname || 'User').charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={[styles.fullname, { color: dark ? '#EAEAEA' : '#1A1A2E' }]}>
          {fullname || 'User'}
        </Text>
        <Text style={[styles.subtitle, { color: dark ? '#6B7280' : '#9CA3AF' }]}>
          Manage your account
        </Text>
      </View>

      {/* Account Section */}
      <Text style={[styles.sectionLabel, { color: dark ? '#4B5563' : '#9CA3AF' }]}>
        ACCOUNT
      </Text>

      <View style={[styles.card, { backgroundColor: dark ? '#1A1F2E' : '#FFFFFF' }]}>
        <TouchableOpacity 
          style={styles.row} 
          onPress={openPrivacyPolicy} 
          activeOpacity={0.7}
        >
          <View style={[styles.iconWrap, { backgroundColor: dark ? '#1C2D4A' : '#EEF2FF' }]}>
            <Text style={styles.icon}>🔒</Text>
          </View>
          <Text style={[styles.rowLabel, { color: dark ? '#E5E7EB' : '#1F2937' }]}>
            Privacy Policy
          </Text>
          <Text style={[styles.chevron, { color: dark ? '#374151' : '#D1D5DB' }]}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Danger Section */}
      <Text style={[styles.sectionLabel, { color: dark ? '#4B5563' : '#9CA3AF' }]}>
        DANGER ZONE
      </Text>

      <View style={[styles.card, { backgroundColor: dark ? '#1A1F2E' : '#FFFFFF' }]}>


        {/* Logout */}
        <TouchableOpacity 
          style={styles.row} 
          onPress={handleLogout} 
          activeOpacity={0.7}
        >
          <View style={[styles.iconWrap, { backgroundColor: dark ? '#2A1515' : '#FEF2F2' }]}>
            <Text style={styles.icon}>🚪</Text>
          </View>
          <Text style={[styles.rowLabel, { color: '#EF4444' }]}>
            Logout
          </Text>
          <Text style={[styles.chevron, { color: dark ? '#374151' : '#D1D5DB' }]}>›</Text>
        </TouchableOpacity>
        
        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: dark ? '#2C3445' : '#E5E7EB' }]} />
        {/* Delete Account */}
        <TouchableOpacity 
          style={styles.row} 
          onPress={openAccountDeletion} 
          activeOpacity={0.7}
        >
          <View style={[styles.iconWrap, { backgroundColor: dark ? '#2A1515' : '#FEF2F2' }]}>
            <Text style={styles.icon}>🗑️</Text>
          </View>
          <Text style={[styles.rowLabel, { color: '#EF4444' }]}>
            Delete Account
          </Text>
          <Text style={[styles.chevron, { color: dark ? '#374151' : '#D1D5DB' }]}>›</Text>
        </TouchableOpacity>

      </View>

      {/* Version */}
      <Text style={[styles.version, { color: dark ? '#374151' : '#D1D5DB' }]}>
        Version 1.0.0
      </Text>

    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 36,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  avatarText: {
    fontSize: 28,
    fontWeight: '600',
  },

  fullname: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 13,
  },

  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },

  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },

  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 16,
  },

  rowLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
  },

  chevron: {
    fontSize: 22,
    fontWeight: '300',
    lineHeight: 24,
  },

  divider: {
    height: 0.5,
    marginHorizontal: 16,
  },

  version: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 'auto',
    paddingBottom: 32,
  },
});