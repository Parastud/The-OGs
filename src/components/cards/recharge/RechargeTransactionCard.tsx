import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Zap, Droplets, Building2 } from 'lucide-react-native';
import { COLORS } from '../../../theme/colors';
import {
  REGULAR_TEXT,
  BOLD_TEXT,
} from '../../../theme/styles.global';

export type RechargeType = 'GRID' | 'WATER' | 'CAM';

export interface RechargeTransactionItem {
  id: number;
  type: string; // "GRID" | "WATER" | "CAM"
  name: string;
  subName: string;
  user: string;
  amount: string;
  time: string;
  status: 'SUCCESS' | 'FAILED';
}

interface RechargeTransactionCardProps {
  item: RechargeTransactionItem;
}

export const RechargeTransactionCard: React.FC<
  RechargeTransactionCardProps
> = ({ item }) => {
  let IconComponent = Zap;
  let iconBg = '#3B82F6'; // Default Blue

  if (item.type === 'GRID') {
    IconComponent = Zap;
    iconBg = '#3B82F6';
  } else if (item.type === 'WATER') {
    IconComponent = Droplets;
    iconBg = '#10B981';
  } else if (item.type === 'CAM') {
    IconComponent = Building2;
    iconBg = '#A855F7';
  }

  const isFailed = item.status === 'FAILED';

  return (
    <View style={styles.transactionCard}>
      {/* Icon */}
      <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
        <IconComponent size={scale(18)} color={COLORS.white} />
      </View>

      {/* Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.rowBetween}>
          <Text
            style={{
              ...BOLD_TEXT(10, '#3B82F6'),
              letterSpacing: 0.5,
            }}
          >
            {item.name.toUpperCase()}
          </Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: isFailed ? '#FEE2E2' : '#D1FAE5' },
            ]}
          >
            <Text
              style={{
                ...BOLD_TEXT(9, COLORS.textPrimary),
                textTransform: 'uppercase',
                color: isFailed ? '#EF4444' : '#10B981',
              }}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.rowBetween}>
          <View>
            <Text style={REGULAR_TEXT(12, COLORS.textPrimary)}>
              {item.subName}
            </Text>
            <Text style={REGULAR_TEXT(10, COLORS.textSecondary)}>
              {item.user}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text
              style={{
                ...REGULAR_TEXT(12, COLORS.textPrimary),
                color: isFailed ? '#EF4444' : COLORS.textPrimary,
              }}
            >
              {`₹${item.amount}`}
            </Text>
            <Text style={REGULAR_TEXT(10, COLORS.textSecondary)}>
              {item.time}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
    borderRadius: scale(4),
  },
});
