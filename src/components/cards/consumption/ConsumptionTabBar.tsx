import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Zap, Droplet } from 'lucide-react-native';

import { COLORS } from '../../../theme/colors';
import { SEMI_BOLD_TEXT, REGULAR_TEXT } from '../../../theme/styles.global';

export type ConsumptionTabType = 'grid' | 'dg' | 'water';

const TABS: { key: ConsumptionTabType; label: string; icon: any }[] = [
  { key: 'grid', label: 'ELECTRIC GRID', icon: Zap },
  { key: 'dg', label: 'ELECTRIC DG', icon: Zap },
  { key: 'water', label: 'WATER', icon: Droplet },
];

interface ConsumptionTabBarProps {
  activeTab: ConsumptionTabType;
  onTabChange: (tab: ConsumptionTabType) => void;
}

const ConsumptionTabBar: React.FC<ConsumptionTabBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <View style={styles.container}>
      {TABS.map(tab => {
        const isActive = activeTab === tab.key;
        const IconComp = tab.icon;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabItem, isActive && styles.tabItemActive]}
            activeOpacity={0.7}
            onPress={() => onTabChange(tab.key)}
          >
            <IconComp
              size={scale(12)}
              color={isActive ? COLORS.primary : COLORS.textDisabled}
              strokeWidth={2}
            />
            <Text
              style={
                isActive
                  ? SEMI_BOLD_TEXT(9, COLORS.primary)
                  : REGULAR_TEXT(9, COLORS.textDisabled)
              }
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ConsumptionTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(4),
    paddingVertical: scale(12),
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: COLORS.primary,
  },
});
