import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../theme/colors';

interface EmptyListProps {
  message?: string;
  visible?: boolean; // new prop
}

export default function EmptyListComponent({
  message = 'No items found',
  visible = true, // default visible
}: EmptyListProps) {
  if (!visible) return null; // hide component if visible=false

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.white,
  },
});
