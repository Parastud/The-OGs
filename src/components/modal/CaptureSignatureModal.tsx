/* eslint-disable */
import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import SignatureScreen, {
  SignatureViewRef,
} from 'react-native-signature-canvas';
import { launchImageLibrary } from 'react-native-image-picker';
import { Upload } from 'lucide-react-native';
import GradientButton from '../buttons/GradientButton';
import { COLORS } from '../../theme/colors';
import { BOLD_TEXT } from '../../theme/styles.global';

type SignatureModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (signatureUri: string, mode: 'draw' | 'upload') => void;
};

const signatureWebStyle = `
  .m-signature-pad {
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 0;
  }
  .m-signature-pad--body {
    border: none;
    margin: 0;
    padding: 0;
  }
  .m-signature-pad--footer {
    display: none;
  }
  body, html {
    margin: 0;
    padding: 0;
    background-color: transparent;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
`;

export default function CaptureSignatureModal({
  visible,
  onClose,
  onSave,
}: SignatureModalProps) {
  const signatureRef = useRef<SignatureViewRef>(null);

  const handleClear = () => {
    signatureRef.current?.clearSignature();
  };

  const handleSaveDrawn = () => {
    signatureRef.current?.readSignature();
  };

  const handleSignatureOK = (signature: string) => {
    if (signature) {
      onSave(signature, 'draw');
    }
  };

  const handleUploadFromGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 400,
      });

      if (result.didCancel) return;

      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to pick image');
        return;
      }

      const asset = result.assets?.[0];
      if (asset?.uri) {
        onSave(asset.uri, 'upload');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open image picker');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} hitSlop={8}>
            <Text style={BOLD_TEXT(12, COLORS.textSecondary)}>CANCEL</Text>
          </TouchableOpacity>

          <Text style={BOLD_TEXT(14, COLORS.textPrimary)}>
            Draw Signature
          </Text>

          <TouchableOpacity onPress={handleClear} hitSlop={8}>
            <Text style={BOLD_TEXT(12, '#EF4444')}>CLEAR</Text>
          </TouchableOpacity>
        </View>

        {/* Canvas */}
        <View style={styles.canvas}>
          <SignatureScreen
            ref={signatureRef}
            onOK={handleSignatureOK}
            autoClear={false}
            descriptionText=""
            clearText=""
            confirmText=""
            webStyle={signatureWebStyle}
            backgroundColor="transparent"
            penColor={'black'}
            minWidth={2}
            maxWidth={4}
            style={{}}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.uploadRow}
            onPress={handleUploadFromGallery}
            activeOpacity={0.7}
          >
            <Upload size={16} color={COLORS.primary} />
            <Text style={BOLD_TEXT(12, COLORS.primary)}>
              UPLOAD FROM GALLERY
            </Text>
          </TouchableOpacity>

          <View style={styles.saveButtonWrapper}>
            <GradientButton text="SAVE SIGNATURE" onPress={handleSaveDrawn} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  canvas: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: '#F0F7FF',
  },
  saveButtonWrapper: {
    // wrapper so GradientButton fills width
  },
});
