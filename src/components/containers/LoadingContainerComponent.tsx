import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../../theme/colors';

interface LoadingContainerProps {
  message?: string;
}

export default function LoadingContainerComponent({
  message = 'Loading...',
}: LoadingContainerProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={COLORS.white} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 30,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  message: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.white,
  },
});
