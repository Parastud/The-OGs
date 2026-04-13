import { hideSnackbar, SnackbarType } from "@/src/redux/slices/snackbar.slice";
import { RootState, store } from "@/src/redux/store";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider, Snackbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector,
} from "react-redux";

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Onboarding/index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="Customer" />
      <Stack.Screen name="Provider" />
    </Stack>
  );
}

function AppContent() {
  const dispatch = useDispatch();
  const { visible, message, duration, type } = useSelector(
    (state: RootState) => state.snackbar,
  );

  return (
    <PaperProvider>
      <RootLayoutNav />
      <Snackbar
        style={
          type === SnackbarType.error
            ? styles.snackbarError
            : styles.snackbarSuccess
        }
        visible={visible}
        onDismiss={() => dispatch(hideSnackbar())}
        duration={duration}
        action={{
          label: "X",
          onPress: () => {
            dispatch(hideSnackbar());
          },
        }}
      >
        {message}
      </Snackbar>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ReduxProvider store={store}>
          <AppContent />
        </ReduxProvider>
      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  snackbarError: {
    backgroundColor: "#ee5d4a",
    color: "white",
    fontWeight: "bold",
    flexDirection: "row",
  },
  snackbarSuccess: {
    backgroundColor: "#52bb76",
    color: "white",
    flexDirection: "row",
  },
});
