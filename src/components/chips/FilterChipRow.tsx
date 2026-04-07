import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';
import { BOLD_TEXT } from '../../theme/styles.global';
import { RoomListItem } from '../../types/room.types';

export type RoomFilterType = 'ALL' | 'OCCUPIED' | 'VACANT';

interface FilterChipRowProps {
  selectedFilter: RoomFilterType;
  onFilterChange: (filter: RoomFilterType) => void;
  allRooms: RoomListItem[]; // Add this prop to receive the full list of rooms
}

const FILTERS: { label: string; value: RoomFilterType }[] = [
  { label: 'ALL ROOMS', value: 'ALL' },
  { label: 'OCCUPIED', value: 'OCCUPIED' },
  { label: 'VACANT', value: 'VACANT' },
];

export const FilterChipRow: React.FC<FilterChipRowProps> = ({
  selectedFilter,
  onFilterChange,
  allRooms,
}) => {
  const allRoomsCount = allRooms?.length;

  return (
    <View style={styles.container}>
      {FILTERS.map(filter => {
        const isActive = selectedFilter === filter.value;
        return (
          <TouchableOpacity
            key={filter.value}
            style={[styles.chip, isActive && styles.chipActive]}
            onPress={() => onFilterChange(filter.value)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
  },
  chipText: {
    ...BOLD_TEXT(9, COLORS.textPrimary),
    textTransform: 'uppercase',
  },
  chipTextActive: {
    color: COLORS.white,
  },
});
