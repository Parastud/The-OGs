import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, Keyboard, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import useTodoapi from '../../src/hooks/apiHooks/useTodoapi';
import { GlobalState } from '../../src/state';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const value = useContext(GlobalState);
  const [filter, setFilter] = useState([]);
  const { getTodos, createTodos, deleteTodo, toggleTodo } = useTodoapi();

  // Normalize _id → id for all tasks
  const normalizeTasks = (payload) => {
    if (!payload) return [];

    let tasks = [];

    if (Array.isArray(payload)) {
      tasks = payload;
    } else if (typeof payload === 'string') {
      try {
        tasks = JSON.parse(payload);
      } catch (error) {
        console.error('Error parsing tasks payload:', error);
        return [];
      }
    } else if (Array.isArray(payload.tasks)) {
      tasks = payload.tasks;
    } else if (Array.isArray(payload.data)) {
      tasks = payload.data;
    } else if (Array.isArray(payload.todos)) {
      tasks = payload.todos;
    }

    return tasks.map(task => ({
      ...task,
      id: task.id ?? task._id,
    }));
  };

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
    } catch {
      return false;
    }
  };

  // Sync filter whenever tasks change
  const syncFilter = (tasks) => {
    setFilter(tasks.filter(isTaskForToday));
  };

  // ─── GET ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTodos();
        const normalized = normalizeTasks(res);
        value.setTasks(normalized);
        syncFilter(normalized);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    syncFilter(value.tasks ?? []);
  }, [value.tasks]);

  // ─── CREATE ─────────────────────────────────────────────────────────────────
  const handleAddTask = async () => {
    if (text.trim() === '') return;

    const payload = {
      text: text.trim(),
      isDone: false,
      date: new Date().toISOString(),
    };

    try {
      const res = await createTodos(payload);
      // res = { success, message, data: { _id, text, isDone, date, ... } }
      if (res?.success && res?.data) {
        const newTask = { ...res.data, id: res.data._id };
        const updatedTasks = [...(value.tasks ?? []), newTask];
        value.setTasks(updatedTasks);
        setText('');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // ─── DELETE ─────────────────────────────────────────────────────────────────
  const handleDeleteTask = (id) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const res = await deleteTodo(id);
              // res = { success, message }
              if (res?.success) {
                const updatedTasks = (value.tasks ?? []).filter(task => task.id !== id);
                value.setTasks(updatedTasks);
              }
            } catch (error) {
              console.error('Error deleting task:', error);
            }
          },
        },
      ]
    );
  };

  // ─── TOGGLE ─────────────────────────────────────────────────────────────────
  const handleToggleTask = async (id) => {
    try {
      const res = await toggleTodo(id);
      // res = { success, message, data: { _id, isDone, ... } }
      if (res?.success && res?.data) {
        const updatedTask = { ...res.data, id: res.data._id };
        const updatedTasks = (value.tasks ?? []).map(task =>
          task.id === id ? updatedTask : task
        );
        value.setTasks(updatedTasks);
      }
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  // ─── HELPERS ────────────────────────────────────────────────────────────────
  const getCompletedCount = () => filter.filter(t => t.isDone).length;
  const getProgress = () => (filter.length === 0 ? 0 : (getCompletedCount() / filter.length) * 100);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={[styles.container, { backgroundColor: value.isDarkMode ? '#232931' : '#EEEEEE' }]}>
          <StatusBar
            barStyle={value.isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={value.isDarkMode ? '#232931' : '#EEEEEE'}
          />

          {/* Date */}
          <View style={styles.dateContainer}>
            <Text style={[styles.dateText, { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }]}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Text>
          </View>

          {/* Progress */}
          <View style={[styles.progressContainer, { backgroundColor: value.isDarkMode ? '#393E46' : 'white' }]}>
            <View style={styles.progressInfo}>
              <View>
                <Text style={[styles.progressTitle, { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }]}>
                  Today's Progress
                </Text>
                <Text style={[styles.progressSubtitle, { color: value.isDarkMode ? '#AAAAAA' : '#777777' }]}>
                  {filter.length > 0
                    ? `${getCompletedCount()} of ${filter.length} tasks completed`
                    : 'No tasks for today'}
                </Text>
              </View>
              <Text style={[styles.progressPercentage, { color: '#4ECCA3' }]}>
                {filter.length > 0 ? `${Math.round(getProgress())}%` : '0%'}
              </Text>
            </View>
            <View style={[styles.progressBarContainer, { backgroundColor: value.isDarkMode ? '#232931' : '#EEEEEE' }]}>
              <View style={[styles.progressBar, { width: `${getProgress()}%` }]} />
            </View>
          </View>

          {/* Input */}
          <View style={[styles.inputContainer, { backgroundColor: value.isDarkMode ? '#393E46' : 'white' }]}>
            <TextInput
              style={[styles.input, { color: value.isDarkMode ? '#EEEEEE' : '#393E46' }]}
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

          {/* List */}
          <FlatList
            data={filter}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={[styles.taskItem, { backgroundColor: value.isDarkMode ? '#393E46' : 'white' }]}>
                <View style={styles.taskLeft}>
                  <Checkbox
                    status={item.isDone ? 'checked' : 'unchecked'}
                    onPress={() => handleToggleTask(item.id)}
                    color="#4ECCA3"
                  />
                  <Text style={[
                    styles.taskText,
                    { color: value.isDarkMode ? '#EEEEEE' : '#393E46' },
                    item.isDone && styles.completedTaskText,
                  ]}>
                    {item.text}
                  </Text>
                </View>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTask(item.id)}>
                  <MaterialIcons name="delete-outline" size={20} color="#F44336" />
                </TouchableOpacity>
              </View>
            )}
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
  container: { flex: 1, padding: 16 },
  dateContainer: { marginBottom: 16 },
  dateText: { fontSize: 18, fontWeight: 'bold' },
  progressContainer: { borderRadius: 12, padding: 16, marginBottom: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22 },
  progressInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  progressTitle: { fontSize: 16, fontWeight: 'bold' },
  progressSubtitle: { fontSize: 14, marginTop: 4 },
  progressPercentage: { fontSize: 20, fontWeight: 'bold' },
  progressBarContainer: { height: 8, borderRadius: 4, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#4ECCA3' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, marginBottom: 16, paddingLeft: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22 },
  input: { flex: 1, height: 50, fontSize: 16 },
  addButton: { backgroundColor: '#4ECCA3', height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 12, borderBottomRightRadius: 12 },
  listContent: { paddingBottom: 20 },
  taskItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22 },
  taskLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  taskText: { fontSize: 16, marginLeft: 12, flex: 1 },
  completedTaskText: { textDecorationLine: 'line-through', opacity: 0.7 },
  deleteButton: { padding: 6 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', padding: 50, marginTop: 30 },
  emptyText: { fontSize: 18, fontWeight: 'bold', marginTop: 16 },
  emptySubText: { fontSize: 14, marginTop: 8, textAlign: 'center' },
});