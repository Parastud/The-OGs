import { COLORS } from '@/src/theme/colors';
import { Tabs } from 'expo-router';
import { Home, Plus, Settings } from 'lucide-react-native';
import React from 'react';

const tabScreenOptions = (label: string, icon: React.ReactNode) => ({
  title: label,
  tabBarIcon: () => icon,
  headerShown: false,
});

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textDisabled,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={tabScreenOptions(
          'Home',
          <Home size={24} color={COLORS.primary} />
        )}
      />
      <Tabs.Screen
        name="add"
        options={tabScreenOptions(
          'Add',
          <Plus size={24} color={COLORS.primary} />
        )}
      />
      <Tabs.Screen
        name="settings"
        options={tabScreenOptions(
          'Settings',
          <Settings size={24} color={COLORS.primary} />
        )}
      />
    </Tabs>
  );
}
