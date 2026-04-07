import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { ChevronDown } from 'lucide-react-native';
import { COLORS } from '../../theme/colors';
import { BOLD_TEXT } from '../../theme/styles.global';

interface RechargeFiltersProps {
  selectedRoom: string;
  selectedTime: string;
  selectedUtility: string;
  onRoomPress: () => void;
  onTimePress: () => void;
  onUtilityPress: () => void;
}

export const RechargeFilters: React.FC<RechargeFiltersProps> = ({
  selectedRoom,
  selectedTime,
  selectedUtility,
  onRoomPress,
  onTimePress,
  onUtilityPress,
}) => {
  return (
    <View style={styles.filterContainer}>
      {/* Room Filter */}
      <TouchableOpacity
        style={styles.filterChip}
        onPress={onRoomPress}
        activeOpacity={0.7}
      >
        <Text
          numberOfLines={1}
          style={{
            ...BOLD_TEXT(10, COLORS.textPrimary),
            textTransform: 'uppercase',
            flex: 1,
          }}
        >
          {selectedRoom}
        </Text>
        <ChevronDown size={scale(14)} color={COLORS.textPrimary} />
      </TouchableOpacity>

      {/* Time Filter */}
      <TouchableOpacity
        style={styles.filterChip}
        onPress={onTimePress}
        activeOpacity={0.7}
      >
        <Text
          numberOfLines={1}
          style={{
            ...BOLD_TEXT(10, COLORS.textPrimary),
            textTransform: 'uppercase',
            flex: 1,
          }}
        >
          {selectedTime}
        </Text>
        <ChevronDown size={scale(14)} color={COLORS.textPrimary} />
      </TouchableOpacity>

      {/* Utility Filter */}
      <TouchableOpacity
        style={styles.filterChip}
        onPress={onUtilityPress}
        activeOpacity={0.7}
      >
        <Text
          numberOfLines={1}
          style={{
            ...BOLD_TEXT(10, COLORS.textPrimary),
            textTransform: 'uppercase',
            flex: 1,
          }}
        >
          {selectedUtility}
        </Text>
        <ChevronDown size={scale(14)} color={COLORS.textPrimary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    gap: scale(10),
    marginBottom: scale(20),
    width: '100%',
  },
  filterChip: {
    flex: 1, // Make chips take equal width
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: scale(10), // Slightly reduced padding to fit content
    paddingVertical: scale(8),
    borderRadius: scale(8),
    gap: scale(4),
  },
});
