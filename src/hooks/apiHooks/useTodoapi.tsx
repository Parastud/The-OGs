import { showSnackbarError, showSnackbarSuccess } from '@/src/redux/slices/snackbar.slice';
import { createTodoService, deleteTodoService, getTodoService, toggleTodoService } from '@/src/services/todoServices';
import { RegisterUser } from '@/src/types/auth.types';
import { getErrorMessage } from '@/src/utils/utils';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface useAuthApiReturnType {
  isLoading: boolean;
  getTodos: () => any;
  createTodos: (payload: RegisterUser) => any;
  deleteTodo: (id: string) => any;
  toggleTodo: (id: string) => any;
}

export default function useAuthApi(): useAuthApiReturnType {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const getTodos = async () => {
    setIsLoading(true);
    try {
      const res = await getTodoService();
      return res.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(showSnackbarError({ message: errorMessage }));
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  const createTodos = async (payload:any) => {
    setIsLoading(true);
    try {
      const res = await createTodoService(payload);
      dispatch(showSnackbarSuccess({ message: res.message }));
      return res; // ✅ return { success, message, data }
    } catch (error) {
      dispatch(showSnackbarError({ message: getErrorMessage(error) }));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await deleteTodoService(id);
      dispatch(showSnackbarSuccess({ message: res.message }));
      return res; // ✅ return { success, message }
    } catch (error) {
      dispatch(showSnackbarError({ message: getErrorMessage(error) }));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTodo = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await toggleTodoService(id);
      dispatch(showSnackbarSuccess({ message: res.message }));
      return res; // ✅ return { success, message, data }
    } catch (error) {
      dispatch(showSnackbarError({ message: getErrorMessage(error) }));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getTodos,
    createTodos,
    deleteTodo,
    toggleTodo
  };
}
