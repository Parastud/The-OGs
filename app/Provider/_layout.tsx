import { COLORS } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";
import { Tabs } from "expo-router";
import {
  Briefcase,
  LayoutDashboard,
  Search,
  User,
  Wallet,
} from "lucide-react-native";
import { Platform, StyleSheet, View } from "react-native";

import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { LinearGradient } from "expo-linear-gradient";

/* -------------------- Animated Tab Icon -------------------- */
function TabIcon({
  Icon,
  label,
  focused,
}: {
  Icon: React.ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
  }>;
  label: string;
  focused: boolean;
}) {
  const itemAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(focused ? -2 : 0) }],
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(focused ? 1.05 : 1) }],
    };
  });

  const labelAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(focused ? 1 : 0.75),
    };
  });

  return (
    <Animated.View style={[styles.tabItem, itemAnimatedStyle]}>
      <View style={[styles.touchTarget, focused && styles.touchTargetActive]}>
        <Animated.View style={iconAnimatedStyle}>
          {focused ? (
            <LinearGradient
              colors={[COLORS.primaryDark, COLORS.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconWrapActive}
            >
              <Icon color={COLORS.white} size={20} strokeWidth={2.2} />
            </LinearGradient>
          ) : (
            <View style={styles.iconWrap}>
              <Icon color={COLORS.textSecondary} size={20} strokeWidth={2.1} />
            </View>
          )}
        </Animated.View>

        <Animated.Text
          style={[
            styles.label,
            focused && styles.labelActive,
            labelAnimatedStyle,
          ]}
        >
          {label}
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={LayoutDashboard} label="Home" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={Search} label="Explore" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="bids"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={Briefcase} label="Bids" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="earnings"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={Wallet} label="Earnings" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={User} label="Profile" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen name="job/[id]" options={{ href: null }} />
      <Tabs.Screen name="personal-information" options={{ href: null }} />
    </Tabs>
  );
}

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: Platform.OS === "ios" ? 78 : 72,
    borderRadius: Platform.OS === "ios" ? 24 : 0,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    paddingHorizontal: 8,
    paddingTop: Platform.OS === "ios" ? 8 : 12,
    paddingBottom: Platform.OS === "ios" ? 18 : 12,
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  touchTarget: {
    minWidth: 64,
    minHeight: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  touchTargetActive: {
    backgroundColor: COLORS.primaryLight,
  },

  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: COLORS.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },

  iconWrapActive: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 4,
  },

  label: {
    fontFamily: FONTS.REGULAR,
    fontSize: 11,
    marginTop: 4,
    color: COLORS.textSecondary,
  },

  labelActive: {
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.primaryDark,
  },
});
