import React, {useRef} from 'react';
import {View, Image, StyleSheet, Animated} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {ScreenWrapper} from '../wrapper';
import NavigationHeader from '../headers/NavigationHeader';
import {COLORS} from '../../theme/colors';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

export default function ViewPictureScreen() {
  const route = useRoute<any>();
  const {image, viewNavigationHeaderTitle} = route.params || {};

  const scale = useRef(new Animated.Value(1)).current;

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      scale.setValue(e.scale);
    })
    .onEnd(() => {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    });

  return (
    <ScreenWrapper
      headerComponent={
        <NavigationHeader title={viewNavigationHeaderTitle ?? 'View'} />
      }>
      <View style={styles.container}>
        {image && (
          <GestureDetector gesture={pinchGesture}>
            <Animated.Image
              source={{uri: image}}
              style={[styles.fullImage, {transform: [{scale: scale}]}]}
              resizeMode="contain"
            />
          </GestureDetector>
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
});
