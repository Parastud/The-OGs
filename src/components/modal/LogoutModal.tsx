import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { LogOut } from 'lucide-react-native';
import { COLORS } from '../../theme/colors';
import { BOLD_TEXT, REGULAR_TEXT } from '../../theme/styles.global';

const TAB_BAR_BLUE = '#4A7BF7';

interface LogoutModalProps {
  visible: boolean;
  onCancel: () => void;
  onLogout: () => void;
}

export default function LogoutModal({
  visible,
  onCancel,
  onLogout,
}: LogoutModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <LogOut size={scale(24)} strokeWidth={2} color={COLORS.white} />
          </View>

          <Text style={styles.title}>Logout</Text>

          <Text style={styles.message}>
            Are you sure you want to logout from your account?
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={onLogout}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '82%',
    backgroundColor: COLORS.white,
    borderRadius: scale(16),
    padding: scale(18),
    alignItems: 'center',
  },

  iconContainer: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(26),
    backgroundColor: TAB_BAR_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(12),
  },

  title: {
    ...BOLD_TEXT(18, COLORS.textPrimary),
    marginBottom: scale(6),
  },

  message: {
    ...REGULAR_TEXT(13, COLORS.textSecondary),
    textAlign: 'center',
    marginBottom: scale(18),
    lineHeight: scale(18),
  },

  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: scale(10),
  },

  button: {
    flex: 1,
    paddingVertical: scale(10), // 👈 smaller height
    borderRadius: scale(10),
    alignItems: 'center',
  },

  cancelButton: {
    backgroundColor: 'rgba(74, 123, 247, 0.1)',
  },

  cancelButtonText: {
    ...BOLD_TEXT(11, TAB_BAR_BLUE),
  },

  logoutButton: {
    backgroundColor: TAB_BAR_BLUE,
  },

  logoutButtonText: {
    ...BOLD_TEXT(11, COLORS.white),
  },
});
