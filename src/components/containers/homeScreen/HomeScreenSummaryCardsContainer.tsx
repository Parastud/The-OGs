/* eslint-disable */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import {
  Wallet,
  Banknote,
  Clock,
  Receipt,
  Fuel,
  Handshake,
  Building2,
  Bot,
} from 'lucide-react-native';

import { COLORS } from '../../../theme/colors';
import {
  SummaryCardLarge,
  SummaryCardSmall,
} from '../../cards';
import { useNavigation } from '@react-navigation/native';
import { DashboardDataTypes } from '../../../types/dashboard.types';
import { SkeletonLoader } from '../../skeleton/SkeletonLoader';

interface LargeSummaryData {
  totalIncome: string;
  collection: string;
  dueAmount: string;
  expenses: string;
}

interface SmallSummaryData {
  recharges: string;
  settled: string;
  cam: string;
  dailyConsumption: string;
}

interface HomeScreenSummaryCardsContainerProps {
  isLoading: boolean;
  dashboardSummaryData: DashboardDataTypes;
}

export const HomeScreenSummaryCardsContainer = ({
  isLoading,
  dashboardSummaryData,
}: HomeScreenSummaryCardsContainerProps) => {

  const {
    total_income,
    total_collection,
    due_amount,
    total_expenses,
    total_recharges,
    total_settlement,
    total_cam,
  } = dashboardSummaryData;

  const navigation = useNavigation();

  if (isLoading) {
    return (
      <>
        <SkeletonLoader
          cols={2}
          rows={2}
          gap={10}
          itemHeight={90}
          itemBorderRadius={12}
          containerStyle={{ marginBottom: scale(12) }}
        />
        <SkeletonLoader
          cols={2}
          rows={2}
          gap={10}
          itemHeight={56}
          itemBorderRadius={10}
          containerStyle={{ marginBottom: scale(12) }}
        />
      </>
    );
  }

  return (
    <>
      <View style={styles.summaryGrid}>
        <SummaryCardLarge
          icon={Wallet}
          iconBgColor={COLORS.blueLight}
          iconcolor={COLORS.blueAccent}
          label="TOTAL INCOME"
          value={total_income}
        />
        <SummaryCardLarge
          icon={Banknote}
          iconBgColor={COLORS.greenLight}
          iconcolor={COLORS.success}
          label="COLLECTION"
          value={total_collection}
        />
        <SummaryCardLarge
          icon={Clock}
          iconBgColor={COLORS.orangeLight}
          iconcolor={COLORS.warning}
          label="DUE AMOUNT"
          value={due_amount}
        />
        <SummaryCardLarge
          icon={Receipt}
          iconBgColor={COLORS.redLight}
          iconcolor={COLORS.error}
          label="EXPENSES"
          value={total_expenses}
        />

      </View>

      <View style={styles.summaryGrid}>
        <SummaryCardSmall
          icon={Fuel}
          iconBgColor={COLORS.blueLight}
          iconcolor={COLORS.blueAccent}
          label="RECHARGES"
          value={total_recharges}
          onPress={() => navigation.navigate('RechargeHistoryScreen' as never)}
        />
        <SummaryCardSmall
          icon={Handshake}
          iconBgColor={COLORS.blueLight}
          iconcolor={COLORS.blueAccent}
          label="SETTLEMENTS"
          value={total_settlement}
          onPress={() => navigation.navigate('SettlementScreen' as never)}
        />
        <SummaryCardSmall
          icon={Building2}
          iconBgColor={COLORS.blueLight}
          iconcolor={COLORS.blueAccent}
          label="CAM"
          value={total_cam}
        />
        <SummaryCardSmall
          icon={Bot}
          iconBgColor={COLORS.blueLight}
          iconcolor={COLORS.info}
          label="DAILY CONS."
          value={0}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(10),
    marginBottom: scale(12),
  },
});
