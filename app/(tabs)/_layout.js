import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Drawer } from 'expo-router/drawer';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GlobalState } from '../../src/state';

export default function RootLayout() {
  const [tasks, setTasks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <GlobalState.Provider value={{ tasks, setTasks, isDarkMode, setIsDarkMode }}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff' }}>
        <Drawer
          screenOptions={{
            headerStyle: {
              backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
            },
            headerTintColor: isDarkMode ? '#ffffff' : '#000000',
            headerTitleStyle: {
              color: isDarkMode ? '#ffffff' : '#000000',
            },
            drawerStyle: {
              backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
            },
            drawerLabelStyle: {
              color: isDarkMode ? '#ffffff' : '#000000',
            },
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Home',
              title: 'Planzo',
              href: null,
              headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => setIsDarkMode(!isDarkMode)}
                    style={{ marginRight: 15 }}
                  >
                    <FontAwesome
                      name={isDarkMode ? "sun-o" : "moon-o"}
                      size={24}
                      color={isDarkMode ? "#ffffff" : "#000000"}
                    />
                  </TouchableOpacity>
                </View>
              )
            }}
            redirect={true}
          />
          <Drawer.Screen
            name="homeScreen"
            options={{
              drawerLabel: 'Home',
              title: 'Planzo',
              headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => setIsDarkMode(!isDarkMode)}
                    style={{ marginRight: 15 }}
                  >
                    <FontAwesome
                      name={isDarkMode ? "sun-o" : "moon-o"}
                      size={24}
                      color={isDarkMode ? "#ffffff" : "#000000"}
                    />
                  </TouchableOpacity>
                </View>
              )
            }}
          />
          <Drawer.Screen
            name="AboutScreen"
            options={{
              drawerLabel: 'History',
              title: 'History',
              headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => setIsDarkMode(!isDarkMode)}
                    style={{ marginRight: 15 }}
                  >
                    <FontAwesome
                      name={isDarkMode ? "sun-o" : "moon-o"}
                      size={24}
                      color={isDarkMode ? "#ffffff" : "#000000"}
                    />
                  </TouchableOpacity>
                </View>
              )
            }}
          />
          <Drawer.Screen
            name="SettingsScreen"
            options={{
              drawerLabel: 'Settings',
              title: 'Settings',
              headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => setIsDarkMode(!isDarkMode)}
                    style={{ marginRight: 15 }}
                  >
                    <FontAwesome
                      name={isDarkMode ? "sun-o" : "moon-o"}
                      size={24}
                      color={isDarkMode ? "#ffffff" : "#000000"}
                    />
                  </TouchableOpacity>
                </View>
              )
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </GlobalState.Provider>
  );
}

