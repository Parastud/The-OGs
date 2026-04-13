/* eslint-disable */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { LucideIcon, ChevronRight } from 'lucide-react-native';
import { COLORS } from '../../../theme/colors';
import { BOLD_TEXT, REGULAR_TEXT } from '../../../theme/styles.global';

interface SummaryCardSmallProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconcolor?: string;
  label: string;
  value: string | number | null;
  prefix?: string;
  onPress?: () => void;
}

export const SummaryCardSmall = ({
  icon: Icon,
  iconBgColor,
  iconcolor,
  label,
  value,
  prefix = '₹',
  onPress,
}: SummaryCardSmallProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.container}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        <Icon size={scale(12)} strokeWidth={2} color={iconcolor} />
      </View>
      <View style={styles.textContainer}>
        <Text style={REGULAR_TEXT(8, COLORS.textSecondary)}>{label}</Text>
        <Text style={REGULAR_TEXT(12, COLORS.textPrimary)}>
          {prefix}
          {value ?? 0}
        </Text>
      </View>
      {onPress && (
        <View style={styles.arrowContainer}>
          <ChevronRight
            size={scale(14)}
            color={COLORS.textSecondary}
            strokeWidth={2}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    padding: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  iconContainer: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: scale(1),
  },
  arrowContainer: {
    justifyContent: 'center',
  },
});
