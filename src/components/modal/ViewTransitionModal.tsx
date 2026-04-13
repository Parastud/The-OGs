/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { List, LayoutGrid } from 'lucide-react-native';

type Props = {
  visible: boolean;
  type: 'simple' | 'details';
  onFinish: () => void;
};

const ViewTransitionModal: React.FC<Props> = ({
  visible,
  type,
  onFinish,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (visible) {
      opacity.setValue(0);
      scale.setValue(0.9);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start(onFinish);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const Icon = type === 'details' ? LayoutGrid : List;

  const label =
    type === 'details'
      ? 'Switching to Detailed View'
      : 'Switching to Simple View';

  return (
    <Modal transparent visible={visible} statusBarTranslucent>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          <Icon size={32} color="#333" />

          <Text style={styles.text}>{label}</Text>

          <ActivityIndicator
            size="small"
            color="#555"
            style={{ marginTop: 6 }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ViewTransitionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    backgroundColor: '#fff',
    paddingVertical: 28,
    paddingHorizontal: 34,
    borderRadius: 20,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },

  text: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
});