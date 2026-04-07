import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Zap, Droplets, Wifi, LucideIcon } from 'lucide-react-native';
import { COLORS } from '../../../theme/colors';
import { BOLD_TEXT, REGULAR_TEXT } from '../../../theme/styles.global';

interface MeterItem {
  icon: LucideIcon;
  label: string;
  onlinePercent: string;
  onCount: number;
  offCount: number;
}

interface MeterHealthCardProps {
  meters?: MeterItem[];
}

const defaultMeters: MeterItem[] = [
  {
    icon: Zap,
    label: 'ELECTRICITY',
    onlinePercent: '90% ONLINE',
    onCount: 78,
    offCount: 3,
  },
  {
    icon: Droplets,
    label: 'WATER',
    onlinePercent: '100% ONLINE',
    onCount: 30,
    offCount: 0,
  },
];

const MeterRow = ({
  icon: Icon,
  label,
  onlinePercent,
  onCount,
  offCount,
}: MeterItem) => (
  <View style={styles.meterRow}>
    <View style={styles.meterLeft}>
      <Icon size={scale(18)} strokeWidth={2} color={COLORS.blueAccent} />
      <Text
        style={[
          BOLD_TEXT(12, COLORS.textPrimary),
          { marginLeft: scale(8) },
        ]}
      >
        {label}
      </Text>
    </View>
    <View style={styles.meterBadge}>
      <Wifi size={scale(10)} strokeWidth={2} color={COLORS.success} />
      <Text style={REGULAR_TEXT(10, COLORS.success)}>{onlinePercent}</Text>
    </View>
    <View style={styles.meterStats}>
      <Text style={REGULAR_TEXT(10, COLORS.success)}>ON: {onCount}</Text>
      <Text style={REGULAR_TEXT(10, COLORS.gray)}>OFF: {offCount}</Text>
    </View>
  </View>
);

export const MeterHealthCard = ({
  meters = defaultMeters,
}: MeterHealthCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={BOLD_TEXT(14, COLORS.textPrimary)}>METER HEALTH</Text>
      <View style={styles.meterContainer}>
        {meters.map((meter, index) => (
          <MeterRow key={index} {...meter} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(16),
  },
  meterContainer: {
    marginTop: scale(12),
    gap: scale(12),
  },
  meterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.grayLight,
    padding: scale(12),
    borderRadius: scale(10),
  },
  meterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  meterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    backgroundColor: COLORS.greenLight,
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(10),
    marginRight: scale(12),
  },
  meterStats: {
    flexDirection: 'row',
    gap: scale(12),
  },
});
