import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import { BOLD_TEXT } from '../../../theme/styles.global';
import { BHKBreakdownCard, CircularProgress } from '../../cards';
import { hapticOptions } from '../../../navigation/rootBottomNavigation';
import HapticFeedback from 'react-native-haptic-feedback';
import { DashboardDataTypes } from '../../../types/dashboard.types';
import { SkeletonLoader } from '../../skeleton/SkeletonLoader';
import { useSelector } from 'react-redux';
import { ALL_SITES, getSelectedSite } from '../../../redux/slices/sites.slice';

interface RoomStatisticsContainerProps {
  isLoading: boolean;
  dashboardSummaryData: DashboardDataTypes;
  onDetailsPress?: () => void;
}

export const RoomStatisticsContainer = ({
  isLoading,
  dashboardSummaryData,
  onDetailsPress,
}: RoomStatisticsContainerProps) => {
  const { rooms, tenants, occupancy, vacant, total_online_devices } = dashboardSummaryData;
  const selectedSite = useSelector(getSelectedSite);
  const siteName = selectedSite === ALL_SITES ? 'All Sites' : selectedSite.site_name;


  const navigation = useNavigation();

  const handleDetailsPress = () => {
    HapticFeedback.trigger('soft', hapticOptions);
    if (onDetailsPress) {
      onDetailsPress();
    } else {
      navigation.navigate('RoomTabScreen' as never);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <SkeletonLoader
            cols={2}
            rows={1}
            gap={100}
            itemHeight={14}
            itemBorderRadius={4}
            containerStyle={{ marginBottom: scale(16) }}
            itemConfigs={[[{ flex: 2 }, { flex: 1 }]]}
          />
          <SkeletonLoader
            cols={4}
            rows={1}
            gap={10}
            itemHeight={70}
            itemBorderRadius={35}
            containerStyle={{ marginBottom: scale(16) }}
          />
          <SkeletonLoader
            cols={1}
            rows={1}
            itemHeight={60}
            itemBorderRadius={8}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={BOLD_TEXT(14, COLORS.textPrimary)}>
            ROOM STATISTICS
          </Text>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={handleDetailsPress}
          >
            <Text style={BOLD_TEXT(10, COLORS.blueAccent)}>DETAILS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <CircularProgress
            value={rooms ?? 0}
            maxValue={rooms ?? 0}
            label="ROOMS"
            color={COLORS.blueAccent}
          />
          <CircularProgress
            value={tenants ?? 0}
            maxValue={tenants ?? 0}
            label="TENANTS"
            color={COLORS.purpleAccent}
          />
          <CircularProgress
            value={occupancy ?? 0}
            maxValue={occupancy ?? 0}
            label="OCCUPANCY"
            color={COLORS.blueDark}
          />
          <CircularProgress
            value={vacant ?? 0}
            maxValue={vacant ?? 0}
            label="VACANT"
            color={COLORS.warning}
          />
        </View>

        <BHKBreakdownCard vacant={vacant ?? 0} occupied={occupancy ?? 0} total={rooms ?? 0} title={siteName} units={total_online_devices ?? 0} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(16),
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: scale(14),
    padding: scale(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  detailsButton: {
    backgroundColor: COLORS.blueLight,
    paddingHorizontal: scale(14),
    paddingVertical: scale(6),
    borderRadius: scale(14),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(8),
  },
});
