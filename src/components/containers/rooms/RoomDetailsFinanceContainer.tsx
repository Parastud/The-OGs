import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  BarChart3,
  CreditCard,
  Zap,
  AlertTriangle,
  Users,
  Calendar,
  Droplets,
  Flame,
  Sun,
  TrendingUp,
  TrendingDown,
} from 'lucide-react-native';
import { COLORS } from '../../../theme/colors';
import {
  REGULAR_TEXT,
  BOLD_TEXT,
} from '../../../theme/styles.global';

export interface FinancialData {
  totalRent: string;
  totalRecharge: string;
  amountDue: string;
  paymentStatus: string;
  paidCount: number;
  totalCount: number;
  lastRecharge: string;
  lastRechargeDate: string;
}

export interface ForecastItem {
  id: string;
  label: string;
  amount: string;
  trend: number; // positive or negative percentage
  icon: 'grid' | 'dg' | 'water' | 'gas' | 'solar';
}

export interface ForecastData {
  items: ForecastItem[];
  estimatedTotal: string;
  totalTrend: number;
}

interface RoomDetailsFinanceContainerProps {
  financial: FinancialData;
  forecast: ForecastData;
  onLastRechargePress?: () => void;
}

const getIconForForecast = (type: ForecastItem['icon']) => {
  switch (type) {
    case 'grid':
      return <Zap size={16} color={COLORS.primary} />;
    case 'dg':
      return <Zap size={16} color="#F97316" />;
    case 'water':
      return <Droplets size={16} color="#06B6D4" />;
    case 'gas':
      return <Flame size={16} color="#EF4444" />;
    case 'solar':
      return <Sun size={16} color="#F59E0B" />;
    default:
      return <Zap size={16} color={COLORS.primary} />;
  }
};

export const RoomDetailsFinanceContainer = (
  props: RoomDetailsFinanceContainerProps,
) => {
  const { financial, forecast, onLastRechargePress } = props;

  const renderRoomFinancialSection = () => {
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <BarChart3 size={16} color={COLORS.primary} />
          <Text style={BOLD_TEXT(11, COLORS.textSecondary)}>
            ROOM FINANCIALS
          </Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <View style={styles.statIconRow}>
              <CreditCard size={14} color="#10B981" />
              <Text style={REGULAR_TEXT(8, COLORS.textSecondary)}>
                TOTAL RENT
              </Text>
            </View>
            <Text style={BOLD_TEXT(14, COLORS.textPrimary)}>
              {financial.totalRent}
            </Text>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statIconRow}>
              <Zap size={14} color={COLORS.primary} />
              <Text style={REGULAR_TEXT(8, COLORS.textSecondary)}>
                TOTAL RECHARGE
              </Text>
            </View>
            <Text style={BOLD_TEXT(14, COLORS.primary)}>
              {financial.totalRecharge}
            </Text>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statIconRow}>
              <AlertTriangle size={14} color="#EF4444" />
              <Text style={REGULAR_TEXT(8, COLORS.textSecondary)}>
                AMOUNT DUE
              </Text>
            </View>
            <Text style={BOLD_TEXT(14, '#EF4444')}>{financial.amountDue}</Text>
          </View>
        </View>

        {/* Bottom Row */}
        <View style={styles.bottomRow}>
          <View style={styles.paymentStatusContainer}>
            <Users size={16} color={COLORS.textSecondary} />
            <View>
              <Text style={REGULAR_TEXT(9, COLORS.textSecondary)}>
                PAYMENT STATUS
              </Text>
              <Text style={BOLD_TEXT(12, COLORS.textPrimary)}>
                {financial.paidCount}/{financial.totalCount}{' '}
                <Text style={REGULAR_TEXT(10, COLORS.textSecondary)}>Paid</Text>
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.lastRechargeContainer}
            onPress={onLastRechargePress}
            activeOpacity={0.7}
          >
            <View>
              <Text style={REGULAR_TEXT(9, COLORS.textSecondary)}>
                LAST RECHARGE
              </Text>
              <Text style={BOLD_TEXT(14, COLORS.textPrimary)}>
                {financial.lastRecharge}
              </Text>
              <Text style={REGULAR_TEXT(9, COLORS.textDisabled)}>
                {financial.lastRechargeDate}
              </Text>
            </View>
            <Calendar size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderRoomForecastedBillSection = () => {
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <TrendingUp size={16} color={COLORS.primary} />
          <Text style={BOLD_TEXT(11, COLORS.textSecondary)}>
            FORECASTED BILL
          </Text>
        </View>

        {/* Forecast Items - FlexWrap */}
        <View style={styles.forecastGrid}>
          {forecast.items.map(item => (
            <View key={item.id} style={styles.forecastItem}>
              <View style={styles.forecastIconContainer}>
                {getIconForForecast(item.icon)}
              </View>
              <Text style={REGULAR_TEXT(9, COLORS.textSecondary)}>
                {item.label}
              </Text>
              <Text
                style={BOLD_TEXT(
                  13,
                  item.trend < 0 ? '#10B981' : COLORS.textPrimary,
                )}
              >
                {item.amount}
              </Text>
              <View
                style={[
                  styles.trendBadge,
                  { backgroundColor: item.trend >= 0 ? '#FEE2E2' : '#D1FAE5' },
                ]}
              >
                {item.trend >= 0 ? (
                  <TrendingUp size={10} color="#EF4444" />
                ) : (
                  <TrendingDown size={10} color="#10B981" />
                )}
                <Text
                  style={BOLD_TEXT(
                    8,
                    item.trend >= 0 ? '#EF4444' : '#10B981',
                  )}
                >
                  {item.trend >= 0 ? '+' : ''}
                  {item.trend}%
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Estimated Total */}
        <View style={styles.estimatedTotalRow}>
          <Text style={REGULAR_TEXT(11, COLORS.textSecondary)}>
            ESTIMATED TOTAL
          </Text>
          <View style={styles.estimatedTotalValue}>
            <Text style={BOLD_TEXT(18, COLORS.primary)}>
              {forecast.estimatedTotal}
            </Text>
            <View
              style={[
                styles.totalTrendBadge,
                {
                  backgroundColor:
                    forecast.totalTrend >= 0 ? '#FEE2E2' : '#D1FAE5',
                },
              ]}
            >
              {forecast.totalTrend >= 0 ? (
                <TrendingUp size={12} color="#EF4444" />
              ) : (
                <TrendingDown size={12} color="#10B981" />
              )}
              <Text
                style={BOLD_TEXT(
                  10,
                  forecast.totalTrend >= 0 ? '#EF4444' : '#10B981',
                )}
              >
                {forecast.totalTrend >= 0 ? '+' : ''}
                {forecast.totalTrend}%
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Room Financials Section */}
      {renderRoomFinancialSection()}

      {/* Forecasted Bill Section */}
      {renderRoomForecastedBillSection()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 12,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  statItem: {
    flex: 1,
  },
  statIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  paymentStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lastRechargeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  forecastGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  forecastItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    minWidth: 80,
    flex: 1,
    maxWidth: '32%',
  },
  forecastIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  estimatedTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  estimatedTotalValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  totalTrendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
