import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Checkbox } from 'react-native-paper';
import { GlobalState } from '../../src/state';

// Function to get today's date in YYYY-MM-DD format
const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const AboutScreen = () => {
  const [marked, setMarked] = useState({});
  const value = useContext(GlobalState);
  const [filter, setFilter] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getTodayString());

  // Function to format date for display
  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function to format date string from task
  const formatTaskDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return null; // Invalid date
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.log('Error formatting date:', error);
      return null;
    }
  };

  // Load tasks for current date when screen opens
  useEffect(() => {
    handleDayPress({ dateString: selectedDate });
  }, [value.tasks]); // Re-run when tasks change

  const handleDayPress = (day) => {
    const selectedDate = day.dateString; // YYYY-MM-DD format
    setSelectedDate(selectedDate);
    setShowCalendar(false); // Hide calendar after selection

    // Filter tasks for the selected date using the task's date field
    const filteredTasks = value.tasks.filter((task) => {
      const taskDate = formatTaskDate(task.date);
      return taskDate && taskDate === selectedDate;
    });

    // Mark the selected date and any dates that have tasks
    const newMarked = {
      [selectedDate]: { selected: true, marked: true, selectedColor: '#4ECCA3' }
    };

    // Add dots to dates that have tasks
    value.tasks.forEach(task => {
      const taskDate = formatTaskDate(task.date);
      if (taskDate && taskDate !== selectedDate) {
        newMarked[taskDate] = { marked: true, dotColor: '#4ECCA3' };
      }
    });

    setMarked(newMarked);
    setFilter(filteredTasks);
  };

  // Function to toggle task completion status
  const toggleTask = async (id) => {
    try {
      // Update task in global state
      const updatedTasks = value.tasks.map(task =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      );
      
      // Update global state
      value.setTasks(updatedTasks);
      
      // Save to AsyncStorage
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      
      // Update filtered list
      const filteredTasks = updatedTasks.filter((task) => {
        const taskDate = formatTaskDate(task.date);
        return taskDate && taskDate === selectedDate;
      });
      setFilter(filteredTasks);
    } catch (error) {
      console.log('Error toggling task completion:', error);
    }
  };

  // Get completed task count for the selected date
  const getCompletedTaskCount = () => {
    return filter.filter(task => task.isDone).length;
  };

  // Get progress percentage for the selected date
  const getProgressPercentage = () => {
    if (filter.length === 0) return 0;
    return (getCompletedTaskCount() / filter.length) * 100;
  };

  // Define calendar theme based on dark mode
  const calendarTheme = {
    selectedDayBackgroundColor: '#4ECCA3',
    todayTextColor: value.isDarkMode ? 'lightblue' : '#4ECCA3',
    dotColor: value.isDarkMode ? '#ffffff' : '#4ECCA3',
    arrowColor: value.isDarkMode ? '#ffffff' : '#393E46',
    monthTextColor: value.isDarkMode ? '#ffffff' : '#393E46',
    textDayFontWeight: '500',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '500',
    textDayFontSize: 16,
    textMonthFontSize: 18,
    selectedDayTextColor: 'white',
    textDayColor: value.isDarkMode ? '#ffffff' : '#393E46',
    textDisabledColor: value.isDarkMode ? 'rgba(255, 255, 255, 0.5)' : '#d9e1e8',
    backgroundColor: value.isDarkMode ? '#232931' : '#ffffff',
    calendarBackground: value.isDarkMode ? '#232931' : '#ffffff',
    dayTextColor: value.isDarkMode ? '#ffffff' : '#2d4150',
    textSectionTitleColor: value.isDarkMode ? '#ffffff' : '#393E46',
    'stylesheet.day.basic': {
      base: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center'
      },
      text: {
        color: value.isDarkMode ? '#ffffff' : '#393E46',
        fontWeight: '500'
      },
      selected: {
        backgroundColor: '#4ECCA3',
        borderRadius: 16
      },
      selectedText: {
        color: 'white',
        fontWeight: 'bold'
      },
      disabled: {
        color: value.isDarkMode ? 'rgba(255, 255, 255, 0.5)' : '#d9e1e8'
      }
    }
  };

  // Update calendar theme when dark mode changes
  useEffect(() => {
    // Re-trigger the day press to update filtered tasks and marked dates
    handleDayPress({ dateString: selectedDate });
  }, [value.isDarkMode]);

  const isToday = (dateStr) => {
    return dateStr === getTodayString();
  };

  return (
    <View style={[styles.container, { backgroundColor: value.isDarkMode ? '#232931' : '#EEEEEE' }]}>
      <StatusBar 
        barStyle={value.isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={value.isDarkMode ? '#232931' : '#EEEEEE'}
      />
      
      {/* Date Header */}
      <TouchableOpacity 
        style={[styles.dateButton, { 
          backgroundColor: value.isDarkMode ? '#393E46' : 'white',
          borderColor: isToday(selectedDate) ? '#4ECCA3' : 'transparent',
        }]}
        onPress={() => setShowCalendar(!showCalendar)}
      >
        <FontAwesome 
          name="calendar" 
          size={20} 
          color="#4ECCA3" 
          style={styles.calendarIcon} 
        />
        <Text style={[styles.dateButtonText, { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }]}>
          {formatDateForDisplay(selectedDate)}
        </Text>
        <FontAwesome 
          name={showCalendar ? "chevron-up" : "chevron-down"} 
          size={16} 
          color={value.isDarkMode ? '#EEEEEE' : '#393E46'} 
        />
      </TouchableOpacity>

      {/* Calendar */}
      {showCalendar && (
        <View style={styles.calendarContainer}>
          <Calendar 
            current={selectedDate}
            markedDates={marked}
            onDayPress={handleDayPress}
            theme={calendarTheme}
          />
        </View>
      )}
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <Text style={[styles.progressTitle, { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }]}>
            {filter.length > 0 ? `${getCompletedTaskCount()} of ${filter.length} tasks completed` : 'No tasks for this date'}
          </Text>
          <Text style={[styles.progressPercentage, { color: value.isDarkMode ? '#4ECCA3' : '#4ECCA3' }]}>
            {filter.length > 0 ? `${Math.round(getProgressPercentage())}%` : '0%'}
          </Text>
        </View>
        <View style={[styles.progressBarContainer, { backgroundColor: value.isDarkMode ? '#393E46' : '#E0E0E0' }]}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${getProgressPercentage()}%`, backgroundColor: '#4ECCA3' }
            ]} 
          />
        </View>
      </View>
      
      {/* Tasks List */}
      <FlatList
        data={filter}
        renderItem={({item}) => (
          <View style={[styles.taskItem, { backgroundColor: value.isDarkMode ? '#393E46' : 'white' }]}>
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
            <View style={[
              styles.statusBadge, 
              { backgroundColor: item.isDone ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)' }
            ]}>
              <Text style={[
                styles.statusText, 
                { color: item.isDone ? '#4CAF50' : '#F44336' }
              ]}>
                {item.isDone ? 'Completed' : 'Pending'}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome name="calendar-check-o" size={50} color="#4ECCA3" />
            <Text style={[styles.emptyText, { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }]}>
              No tasks for this date
            </Text>
            <Text style={[styles.emptySubText, { color: value.isDarkMode ? '#AAAAAA' : '#999999' }]}>
              Select a different date or add tasks for this day
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  dateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginLeft: 10,
  },
  calendarIcon: {
    marginRight: 5,
  },
  calendarContainer: {
    marginBottom: 16,
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
  progressContainer: {
    marginBottom: 20,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  listContent: {
    paddingBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 10,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    marginTop: 20,
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
  }
});
