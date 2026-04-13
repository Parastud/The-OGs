/* eslint-disable */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { LucideIcon, BarChart3 } from 'lucide-react-native';
import { COLORS } from '../../../theme/colors';
import { BOLD_TEXT, REGULAR_TEXT } from '../../../theme/styles.global';

interface SummaryCardLargeProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconcolor?: string;
  label: string;
  value: string | number | null;
  prefix?: string;
}

export const SummaryCardLarge = ({
  icon: Icon,
  iconBgColor,
  iconcolor,
  label,
  value,
  prefix = '₹',
}: SummaryCardLargeProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <Icon size={scale(14)} strokeWidth={2} color={iconcolor} />
        </View>
        <BarChart3 size={scale(16)} strokeWidth={2} color={COLORS.blueAccent} />
      </View>
      <Text style={REGULAR_TEXT(9, COLORS.textSecondary)}>{label}</Text>
      <Text style={REGULAR_TEXT(15, COLORS.textPrimary)}>
        {prefix}
        {value ?? 0}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: scale(12),
    padding: scale(12),
    gap: scale(1),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scale(4),
  },
  iconContainer: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
