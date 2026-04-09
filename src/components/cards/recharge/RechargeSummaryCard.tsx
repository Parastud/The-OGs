import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import { TrendingUp } from 'lucide-react-native';
import { COLORS } from '../../../theme/colors';
import {
  REGULAR_TEXT,
  BOLD_TEXT,
} from '../../../theme/styles.global';

interface RechargeSummaryCardProps {
  totalAmount: string; // e.g., "₹8,000.00"
  count: number; // e.g., 24
  trendPercentage: string; // e.g., "12%"
  failedAmount: string; // e.g., "₹850.00"
  failedCount: number; // e.g., 3
}

export const RechargeSummaryCard: React.FC<RechargeSummaryCardProps> = ({
  totalAmount,
  count,
  trendPercentage,
  failedAmount,
  failedCount,
}) => {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryTopRow}>
        <View>
          <Text style={styles.summaryLabel}>TOTAL RECHARGE</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={BOLD_TEXT(28, COLORS.white)}>{totalAmount}</Text>
            <Text
              style={{
                ...REGULAR_TEXT(12, 'rgba(255,255,255,0.7)'),
                marginLeft: 4,
                marginBottom: 6,
              }}
            >
              ({count})
            </Text>
          </View>
        </View>
        <View style={styles.trendBadge}>
          <TrendingUp size={scale(12)} color={COLORS.white} />
          <Text style={BOLD_TEXT(10, COLORS.white)}>{trendPercentage}</Text>
        </View>
      </View>

      <View style={styles.summaryBottomRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={BOLD_TEXT(14, '#F87171')}>{failedAmount}</Text>
          <Text style={BOLD_TEXT(10, '#F87171')}> FAILED</Text>
        </View>
        <Text
          style={{
            ...BOLD_TEXT(10, '#F87171'),
            textTransform: 'uppercase',
          }}
        >
          {failedCount} FAILED TRANSACTIONS
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: '#1E40AF', // Darker blue
    borderRadius: scale(20),
    padding: scale(20),
    marginBottom: scale(24),
  },
  summaryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(20),
  },
  summaryLabel: {
    ...BOLD_TEXT(10, 'rgba(255,255,255,0.7)'),
    letterSpacing: 1,
    marginBottom: scale(4),
    textTransform: 'uppercase',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(12),
    height: scale(24),
    gap: scale(4),
  },
  summaryBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
