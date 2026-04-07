import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../theme/colors';
import {REGULAR_TEXT} from '../../theme/styles.global';

interface ChipProps {
  label: string;
  onPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
}

const ChipComponent: React.FC<ChipProps> = ({
  label,
  onPress,
  backgroundColor = COLORS.inputBackground,
  textColor = COLORS.white,
}) => {
  if (onPress) {
    return (
      <TouchableOpacity
        style={[
          styles.chip,
          {backgroundColor, borderColor: textColor, borderWidth: 1},
        ]}
        onPress={onPress}>
        <Text style={REGULAR_TEXT(13, textColor)}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles.chip,
        {backgroundColor, borderColor: textColor, borderWidth: 1},
      ]}>
      <Text style={REGULAR_TEXT(13, textColor)}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
});

export default ChipComponent;
