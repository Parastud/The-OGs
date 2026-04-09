import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';

type ResetPasswordModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
};

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  visible,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.title}>
            To reset your password, you must be verified via OTP.
          </Text>

          <Text style={styles.subtitle}>
            The OTP will be sent to your registered email id.
          </Text>

          <View style={styles.buttonContainer}>
            {/* Cancel */}
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            {/* Submit */}
            <TouchableOpacity
              style={styles.applyButton}
              onPress={onSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.applyButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ResetPasswordModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalView: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: scale(20),
    alignItems: 'center',
    elevation: 5,
  },

  title: {
    fontSize: scale(14),
    color: '#1A1A1A',
    marginBottom: scale(6),
    textAlign: 'center',
    fontWeight: '600',
  },

  subtitle: {
    fontSize: scale(12),
    color: '#555',
    marginBottom: scale(20),
    textAlign: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  applyButton: {
    width: '45%',
    paddingVertical: scale(12),
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },

  applyButtonText: {
    color: '#FFFFFF',
    fontSize: scale(13),
    fontWeight: '600',
  },

  cancelButton: {
    width: '45%',
    paddingVertical: scale(12),
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#1E88E5',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  cancelButtonText: {
    color: '#1E88E5',
    fontSize: scale(13),
    fontWeight: '600',
  },
});
