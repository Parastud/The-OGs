import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../../theme/colors';
import {
  BOLD_TEXT,
  REGULAR_TEXT,
} from '../../../theme/styles.global';

interface StatItem {
  value: string;
  label: string;
}

interface RoomStatisticsCardProps {
  stats?: StatItem[];
  onDetailsPress?: () => void;
}

const defaultStats: StatItem[] = [
  { value: '50', label: 'ROOMS' },
  { value: '42', label: 'TENANTS' },
  { value: '38', label: 'OCCUPANCY' },
  { value: '12', label: 'VACANT' },
];

export const RoomStatisticsCard = ({
  stats = defaultStats,
  onDetailsPress = () => {},
}: RoomStatisticsCardProps) => {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={BOLD_TEXT(14, COLORS.textPrimary)}>
          ROOM STATISTICS
        </Text>
        <TouchableOpacity style={styles.detailsButton} onPress={onDetailsPress}>
          <Text style={REGULAR_TEXT(11, COLORS.blueAccent)}>DETAILS</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statBox}>
            <Text style={BOLD_TEXT(18, COLORS.white)}>{stat.value}</Text>
            <Text style={REGULAR_TEXT(9, COLORS.white)}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: scale(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  detailsButton: {
    backgroundColor: COLORS.blueLight,
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(12),
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.blueDark,
    borderRadius: scale(16),
    padding: scale(16),
    justifyContent: 'space-between',
  },
  statBox: {
    alignItems: 'center',
    gap: scale(4),
  },
});
