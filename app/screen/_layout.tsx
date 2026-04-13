import { Tabs } from "expo-router";
import {
  Briefcase,
  LayoutDashboard,
  Search,
  User,
  Wallet
} from "lucide-react-native";

export default function TabLayout() {

  return (

    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 10,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 8
        },
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: 2
        }
      }}
    >

      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <LayoutDashboard color={color} size={size} />

          )
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Search color={color} size={size} />
          )
        }}

      />

      <Tabs.Screen
        name="bids"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color, size }) => (
            <Briefcase color={color} size={size} />
          )
        }}
      />

      <Tabs.Screen
        name="earnings"
        options={{
          title: "Earnings",
          tabBarIcon: ({ color, size }) => (
            <Wallet color={color} size={size} />
          )
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{href: null}}
      />
    </Tabs>

  );
}