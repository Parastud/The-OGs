import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, Keyboard, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { GlobalState } from '../../src/state';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const value = useContext(GlobalState);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await AsyncStorage.getItem('tasks');
        if (tasks) {
          value.setTasks(JSON.parse(tasks));
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
  
    fetchTasks();
  }, []);
  

  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Function to check if a task is for today
  const isTaskForToday = (task) => {
    if (!task.date) return false;
    
    try {
      const taskDate = new Date(task.date);
      const today = new Date();
      
      return (
        taskDate.getDate() === today.getDate() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getFullYear() === today.getFullYear()
      );
    } catch (error) {
      console.log('Error parsing date:', error);
      return false;
    }
  };

  useEffect(() => {
    if (value.tasks) {
      const todayTasks = value.tasks.filter(isTaskForToday);
      setFilter(todayTasks);
    }
  }, [value.tasks]);

  
  const handleAddTask = async () => {
    if (text.trim() === '') return;

    const newTask = {
      text: text.trim(),
      isDone: false,
      date: new Date().toISOString()
    };

    const updatedTasks = [...value.tasks, newTask];
    
    // Update global state
    value.setTasks(updatedTasks);
    
    // Save to AsyncStorage
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
    // Clear input field
    setText('');
    
    // Update filter for today
    const todayTasks = updatedTasks.filter(isTaskForToday);
    setFilter(todayTasks);
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            const updatedTasks = value.tasks.filter(task => task.id !== id);
            value.setTasks(updatedTasks);
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
            const todayTasks = updatedTasks.filter(isTaskForToday);
            setFilter(todayTasks);
          },
          style: "destructive"
        }
      ]
    );
  };

  // Toggle task completion
  const toggleTask = async (id) => {
    const updatedTasks = value.tasks.map(task =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    );
    
    value.setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
    const todayTasks = updatedTasks.filter(isTaskForToday);
    setFilter(todayTasks);
  };

  // Calculate progress
  const getCompletedTaskCount = () => {
    return filter.filter(task => task.isDone).length;
  };

  const getProgressPercentage = () => {
    if (filter.length === 0) return 0;
    return (getCompletedTaskCount() / filter.length) * 100;
  };

  // Dismiss keyboard when tapping outside input
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.container, { backgroundColor: value.isDarkMode ? '#232931' : '#EEEEEE' }]}>
          <StatusBar 
            barStyle={value.isDarkMode ? "light-content" : "dark-content"} 
            backgroundColor={value.isDarkMode ? '#232931' : '#EEEEEE'}
          />
          
          {/* Today's Date */}
          <View style={styles.dateContainer}>
            <Text style={[styles.dateText, { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }]}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Text>
          </View>
          
          {/* Progress Section */}
          <View style={[styles.progressContainer, { backgroundColor: value.isDarkMode ? '#393E46' : 'white' }]}>
            <View style={styles.progressInfo}>
              <View>
                <Text style={[styles.progressTitle, { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }]}>
                  Today's Progress
                </Text>
                <Text style={[styles.progressSubtitle, { color: value.isDarkMode ? '#AAAAAA' : '#777777' }]}>
                  {filter.length > 0 
                    ? `${getCompletedTaskCount()} of ${filter.length} tasks completed` 
                    : 'No tasks for today'}
                </Text>
              </View>
              <Text style={[styles.progressPercentage, { color: '#4ECCA3' }]}>
                {filter.length > 0 ? `${Math.round(getProgressPercentage())}%` : '0%'}
              </Text>
            </View>
            
            <View style={[styles.progressBarContainer, { backgroundColor: value.isDarkMode ? '#232931' : '#EEEEEE' }]}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${getProgressPercentage()}%` }
                ]} 
              />
            </View>
          </View>
          
          {/* Task Input */}
          <View style={[styles.inputContainer, { backgroundColor: value.isDarkMode ? '#393E46' : 'white' }]}>
            <TextInput
              style={[
                styles.input,
                { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }
              ]}
              placeholder="Add a new task..."
              placeholderTextColor={value.isDarkMode ? '#AAAAAA' : '#999999'}
              value={text}
              onChangeText={setText}
              onSubmitEditing={handleAddTask}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          {/* Tasks List */}
          <FlatList
            data={filter}
            renderItem={({item}) => (
              <View style={[styles.taskItem, { backgroundColor: value.isDarkMode ? '#393E46' : 'white' }]}>
                <View style={styles.taskLeft}>
                  <Checkbox
                    status={item.isDone ? 'checked' : 'unchecked'}
                    onPress={() => toggleTask(item.id)}
                    color={'#4ECCA3'}
                  />
                  <Text style={[
                    styles.taskText, 
                    { color: value.isDarkMode ? '#EEEEEE' : '#393E46' },
                    item.isDone && styles.completedTaskText
                  ]}>
                    {item.text}
                  </Text>
                </View>
                
                <View style={styles.taskActions}>
                  <TouchableOpacity 
                    style={[styles.reminderButton, { marginRight: 12 }]} 
                    onPress={() => toggleReminder(item)}
                  >
                    <Ionicons 
                      name="notifications-outline" 
                      size={20} 
                      color={value.isDarkMode ? '#4ECCA3' : '#4ECCA3'} 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.deleteButton} 
                    onPress={() => handleDeleteTask(item.id)}
                  >
                    <MaterialIcons name="delete-outline" size={20} color="#F44336" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="checkbox-outline" size={70} color="#4ECCA3" />
                <Text style={[styles.emptyText, { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }]}>
                  No tasks for today
                </Text>
                <Text style={[styles.emptySubText, { color: value.isDarkMode ? '#AAAAAA' : '#999999' }]}>
                  Add a new task to get started
                </Text>
              </View>
            }
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dateContainer: {
    marginBottom: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  progressPercentage: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4ECCA3',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 16,
    paddingLeft: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4ECCA3',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderButton: {
    padding: 6,
  },
  deleteButton: {
    padding: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    marginTop: 30,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});