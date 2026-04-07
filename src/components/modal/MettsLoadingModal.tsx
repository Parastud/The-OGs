import React, {useEffect, useRef} from 'react';
import {
  Modal,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

type MettsLoadingModalProps = {
  visible: boolean;
  message?: string;
  textColor?: string;
};

const MettsLoadingModal: React.FC<MettsLoadingModalProps> = ({
  visible,
  message,
  textColor,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 400, // reduce for snappier feel
      easing: Easing.out(Easing.ease), // smooth in/out
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}>
      <Animated.View style={[styles.modalBackground, {opacity}]}>
        <Animated.View style={[styles.activityIndicatorWrapper, {opacity}]}>
          <ActivityIndicator size="large" color="#29297C" />
          {message && (
            <Text style={[styles.message, {color: textColor || '#000000'}]}>
              {message}
            </Text>
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  message: {
    marginTop: 15,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default MettsLoadingModal;
