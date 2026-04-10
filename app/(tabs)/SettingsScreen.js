import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useState } from 'react';
import { Alert, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { GlobalState } from '../../src/state';

const SettingsScreen = () => {
  const value = useContext(GlobalState);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState(null);

  // Handle dark mode toggle
  const toggleDarkMode = async () => {
    const newMode = !value.isDarkMode;
    value.setIsDarkMode(newMode);
    await AsyncStorage.setItem('darkMode', newMode.toString());
  };








  // Clear all tasks
  const clearAllTasks = () => {
    Alert.alert(
      "Clear All Tasks",
      "Are you sure you want to delete all tasks? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            value.setTasks([]);
            await AsyncStorage.setItem('tasks', JSON.stringify([]));
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: value.isDarkMode ? '#232931' : '#EEEEEE' }]}>
      <StatusBar 
        barStyle={value.isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={value.isDarkMode ? '#232931' : '#EEEEEE'}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* App Appearance Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }]}>
            Appearance
          </Text>
          
          <View style={[styles.card, { backgroundColor: value.isDarkMode ? '#393E46' : 'white' }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialIcons 
                  name="dark-mode" 
                  size={22} 
                  color={value.isDarkMode ? '#4ECCA3' : '#4ECCA3'} 
                  style={styles.settingIcon} 
                />
                <Text style={[styles.settingText, { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }]}>
                  Dark Mode
                </Text>
              </View>
              <Switch
                value={value.isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: '#767577', true: '#4ECCA3' }}
                thumbColor={'#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
            </View>
          </View>
        </View>
        
        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }]}>
            Notifications
          </Text>
          
          <View style={[styles.card, { backgroundColor: value.isDarkMode ? '#393E46' : 'white' }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons 
                  name="notifications-outline" 
                  size={22} 
                  color={value.isDarkMode ? '#4ECCA3' : '#4ECCA3'} 
                  style={styles.settingIcon} 
                />
                <Text style={[styles.settingText, { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }]}>
                  Task Reminders
                </Text>
              </View>
              <Switch
                value={notificationEnabled}
                onValueChange={toggleNotifications}
                trackColor={{ false: '#767577', true: '#4ECCA3' }}
                thumbColor={'#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
            </View>
            
            {notificationEnabled && (
              <TouchableOpacity 
                style={styles.settingSubItem} 
                onPress={showReminderTimeOptions}
              >
                <View style={styles.settingInfo}>
                  <Ionicons 
                    name="time-outline" 
                    size={22} 
                    color={value.isDarkMode ? '#4ECCA3' : '#4ECCA3'} 
                    style={[styles.settingIcon, { marginLeft: 30 }]} 
                  />
                  <Text style={[styles.settingSubText, { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }]}>
                    Reminder Time
                  </Text>
                </View>
                <View style={styles.settingRight}>
                  <Text style={[styles.settingValue, { color: value.isDarkMode ? '#AAAAAA' : '#777777' }]}>
                    {formatReminderTime(reminderTime)}
                  </Text>
                  <MaterialIcons 
                    name="chevron-right" 
                    size={20} 
                    color={value.isDarkMode ? '#AAAAAA' : '#777777'} 
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        {/* Data Management Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }]}>
            Data Management
          </Text>
          
          <View style={[styles.card, { backgroundColor: value.isDarkMode ? '#393E46' : 'white' }]}>
            <TouchableOpacity style={styles.settingItem} onPress={clearAllTasks}>
              <View style={styles.settingInfo}>
                <MaterialIcons 
                  name="delete-outline" 
                  size={22} 
                  color="#F44336" 
                  style={styles.settingIcon} 
                />
                <Text style={[styles.settingText, { color: '#F44336' }]}>
                  Clear All Tasks
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={value.isDarkMode ? '#AAAAAA' : '#777777'} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }]}>
            About
          </Text>
          
          <View style={[styles.card, { backgroundColor: value.isDarkMode ? '#393E46' : 'white' }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialIcons 
                  name="info-outline" 
                  size={22} 
                  color={value.isDarkMode ? '#4ECCA3' : '#4ECCA3'} 
                  style={styles.settingIcon} 
                />
                <Text style={[styles.settingText, { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }]}>
                  Version
                </Text>
              </View>
              <Text style={[styles.settingValue, { color: value.isDarkMode ? '#AAAAAA' : '#777777' }]}>
                1.0.0
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  settingSubItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingSubText: {
    fontSize: 14,
    fontWeight: '400',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    marginRight: 4,
  },
}); 