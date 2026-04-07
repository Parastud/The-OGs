import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Zap, Droplets, Flame, Sun, Activity } from 'lucide-react-native';
import { COLORS } from '../../../theme/colors';
import {
  REGULAR_TEXT,
  BOLD_TEXT,
} from '../../../theme/styles.global';

export interface ConsumptionItem {
  id: string;
  label: string;
  value: number;
  unit: string;
  type: 'electric_grid' | 'electric_dg' | 'water' | 'solar' | 'gas';
}

interface RoomConsumptionContainerProps {
  items: ConsumptionItem[];
  selectedTimeframe?: string;
  onTimeframePress?: () => void;
  onViewAllPress?: () => void;
}

const getIconForType = (type: ConsumptionItem['type']) => {
  switch (type) {
    case 'electric_grid':
      return <Zap size={14} color="#3B82F6" />;
    case 'electric_dg':
      return <Zap size={14} color="#8B5CF6" />;
    case 'water':
      return <Droplets size={14} color="#06B6D4" />;
    case 'solar':
      return <Sun size={14} color="#F59E0B" />;
    case 'gas':
      return <Flame size={14} color="#F97316" />;
    default:
      return <Zap size={14} color={COLORS.primary} />;
  }
};

const getLabelColor = (type: ConsumptionItem['type']) => {
  switch (type) {
    case 'electric_grid':
      return '#3B82F6';
    case 'electric_dg':
      return '#8B5CF6';
    case 'water':
      return '#06B6D4';
    case 'solar':
      return '#F59E0B';
    case 'gas':
      return '#F97316';
    default:
      return COLORS.primary;
  }
};

export const RoomConsumptionContainer = (
  props: RoomConsumptionContainerProps,
) => {
  const {
    items,
    selectedTimeframe = 'TODAY',
    onTimeframePress,
    onViewAllPress,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Activity size={16} color={COLORS.primary} />
          <Text style={BOLD_TEXT(11, COLORS.textSecondary)}>
            CONSUMPTION
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={onTimeframePress} activeOpacity={0.7}>
            <Text style={BOLD_TEXT(10, COLORS.primary)}>
              {selectedTimeframe} ▼
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onViewAllPress} activeOpacity={0.7}>
            <Text style={BOLD_TEXT(10, COLORS.primary)}>VIEW ALL ›</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.grid}>
        {items.map(item => (
          <View key={item.id} style={styles.gridItem}>
            {getIconForType(item.type)}
            <Text style={REGULAR_TEXT(9, getLabelColor(item.type))}>
              {item.label}
            </Text>
            <Text style={BOLD_TEXT(14, COLORS.textPrimary)}>
              {item.value}{' '}
              <Text style={REGULAR_TEXT(10, COLORS.textSecondary)}>
                {item.unit}
              </Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    minWidth: '30%',
    maxWidth: '32%',
    alignItems: 'center',
    gap: 4,
  },
});
