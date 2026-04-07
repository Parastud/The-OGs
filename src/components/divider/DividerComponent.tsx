import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {COLORS} from '../../theme/colors';

interface DividerProps {
  color?: string;
  thickness?: number;
  width?: ViewStyle['width'];
  marginVertical?: number;
  style?: ViewStyle;
}

const DividerComponent: React.FC<DividerProps> = ({
  color = COLORS.textGray, // iOS-style subtle gray
  thickness = 0.5, // thin line
  width = '100%',
  marginVertical = 8,
  style,
}) => {
  return (
    <View style={[styles.container, {marginVertical}]}>
      <View
        style={[
          {
            backgroundColor: color,
            height: thickness,
            width: width as ViewStyle['width'],
            borderRadius: thickness / 2, // optional rounded edges
          },
          style,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center', // center the divider
  },
});

export default DividerComponent;
