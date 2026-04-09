import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Zap, Server, Sun, Bold } from 'lucide-react-native';
import { COLORS } from '../../../theme/colors';
import { BOLD_TEXT, REGULAR_TEXT } from '../../../theme/styles.global';
import { DashboardDataTypes } from '../../../types/dashboard.types';
import { SkeletonLoader } from '../../skeleton/SkeletonLoader';

interface ControlCenterCardProps {
  isLoading: boolean;
  dashboardSummaryData: DashboardDataTypes;
  onTabChange?: (tab: string) => void;
}

type ItemIcon = 'grid' | 'dg' | 'solar';

interface ControlItem {
  title: string;
  subtitle: string;
  consumption: string;
  consumptionUnit: string;
  activeNodes: string;
  activeNodesUnit: string;
  isLive: boolean;
  icon: ItemIcon;
}

const BASE_TABS = ['ALL', 'GRID', 'DG'];

export const ControlCenterCard = ({
  isLoading,
  dashboardSummaryData,
  onTabChange = () => {},
}: ControlCenterCardProps) => {
  const [activeTab, setActiveTab] = useState('ALL');

  let {
    grid_total_consumption,
    dg_total_consumption,
    solar_total_consumption,
    elm_online_devices,
  } = dashboardSummaryData;

  grid_total_consumption = grid_total_consumption ?? 0;
  dg_total_consumption = dg_total_consumption ?? 0;

  const hasSolar = solar_total_consumption != null;
  const tabs = hasSolar ? [...BASE_TABS, 'SOLAR'] : BASE_TABS;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  const activeNodesStr = String(elm_online_devices).padStart(2, '0');

  const items: ControlItem[] = [
    {
      title: 'MAIN GRID',
      subtitle: grid_total_consumption > 0 ? 'Consumption Active' : 'Standby Mode',
      consumption: grid_total_consumption.toFixed(2),
      consumptionUnit: 'KWH',
      activeNodes: activeNodesStr,
      activeNodesUnit: 'UNIT',
      isLive: grid_total_consumption > 0,
      icon: 'grid',
    },
    {
      title: 'DG BACKUP',
      subtitle: dg_total_consumption > 0 ? 'Consumption Active' : 'Standby Mode',
      consumption: dg_total_consumption.toFixed(2),
      consumptionUnit: 'KWH',
      activeNodes: activeNodesStr,
      activeNodesUnit: 'UNIT',
      isLive: dg_total_consumption > 0,
      icon: 'dg',
    },
    ...(hasSolar
      ? [
          {
            title: 'SOLAR',
            subtitle: (solar_total_consumption ?? 0) > 0 ? 'Consumption Active' : 'Standby Mode',
            consumption: (solar_total_consumption ?? 0).toFixed(2),
            consumptionUnit: 'KWH',
            activeNodes: activeNodesStr,
            activeNodesUnit: 'UNIT',
            isLive: (solar_total_consumption ?? 0) > 0,
            icon: 'solar' as ItemIcon,
          },
        ]
      : []),
  ];

  const visibleItems: ControlItem[] =
    activeTab === 'ALL'
      ? items
      : activeTab === 'GRID'
      ? [items[0]]
      : activeTab === 'DG'
      ? [items[1]]
      : hasSolar
      ? [items[2]]
      : items;

  const getIconBgColor = (icon: ItemIcon) => {
    if (icon === 'grid') return COLORS.warning;
    if (icon === 'solar') return COLORS.success;
    return COLORS.blueAccent;
  };

  const renderIcon = (icon: ItemIcon) => {
    const color = COLORS.white;
    const size = scale(14);
    if (icon === 'grid') return <Zap size={size} strokeWidth={2} color={color} />;
    if (icon === 'solar') return <Sun size={size} strokeWidth={2} color={color} />;
    return <Server size={size} strokeWidth={2} color={color} />;
  };

  if (isLoading) {
    return (
      <View style={styles.card}>
        <SkeletonLoader cols={1} rows={1} itemHeight={14} itemBorderRadius={4} />
        <SkeletonLoader
          cols={3}
          rows={1}
          itemHeight={36}
          itemBorderRadius={25}
          containerStyle={{ marginTop: scale(12) }}
        />
        <SkeletonLoader
          cols={1}
          rows={2}
          itemHeight={90}
          itemBorderRadius={12}
          gap={10}
          containerStyle={{ marginTop: scale(14) }}
        />
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={BOLD_TEXT(13, COLORS.textPrimary)}>CONTROL CENTER</Text>

      <View style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => handleTabChange(tab)}
          >
            <Text
              style={
                activeTab === tab
                  ? BOLD_TEXT(11, COLORS.blueAccent)
                  : REGULAR_TEXT(11, COLORS.textSecondary)
              }
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {visibleItems.map((item, index) => (
        <View key={index} style={styles.controlItem}>
          <View style={styles.controlHeader}>
            <View style={styles.headerLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: getIconBgColor(item.icon) },
                ]}
              >
                {renderIcon(item.icon)}
              </View>
              <View>
                <Text style={REGULAR_TEXT(12, COLORS.textPrimary)}>{item.title}</Text>
                <Text style={REGULAR_TEXT(10, COLORS.textSecondary)}>{item.subtitle}</Text>
              </View>
            </View>
            {item.isLive && (
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={REGULAR_TEXT(9, COLORS.success)}>LIVE</Text>
              </View>
            )}
          </View>

          <View style={styles.controlStats}>
            <View style={styles.statItem}>
              <Text style={REGULAR_TEXT(9, COLORS.textSecondary)}>CONSUMPTION</Text>
              <View style={styles.statValue}>
                <Text style={REGULAR_TEXT(16, COLORS.textPrimary)}>{item.consumption}</Text>
                <Text style={REGULAR_TEXT(10, COLORS.textSecondary)}> {item.consumptionUnit}</Text>
              </View>
            </View>
            <View style={styles.statItem}>
              <Text style={REGULAR_TEXT(9, COLORS.textSecondary)}>ACTIVE NODES</Text>
              <View style={styles.statValue}>
                <Text style={REGULAR_TEXT(16, COLORS.textPrimary)}>{item.activeNodes}</Text>
                <Text style={REGULAR_TEXT(10, COLORS.textSecondary)}> {item.activeNodesUnit}</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: scale(12),
    padding: scale(14),
    marginBottom: scale(12),
  },
  tabsContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: scale(25),
    marginTop: scale(12),
    marginBottom: scale(14),
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: scale(8),
    alignItems: 'center',
  },
  tabActive: { backgroundColor: COLORS.blueLight },
  controlItem: {
    backgroundColor: COLORS.grayLight,
    borderRadius: scale(12),
    padding: scale(12),
    marginBottom: scale(10),
  },
  controlHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  iconContainer: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  liveDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: COLORS.success,
  },
  controlStats: { flexDirection: 'row' },
  statItem: { flex: 1 },
  statValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: scale(2),
  },
});