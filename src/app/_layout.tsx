import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import {
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import useWorkoutStore from "@/store/useWorkoutStore";

import Colors from "@/constants/Colors";

DefaultTheme.colors.primary = Colors.light.tint;
DarkTheme.colors.primary = Colors.dark.tint;

export default function RootLayout() {
  const initState = useWorkoutStore((state) => state.initState);
  const theme = useColorScheme();

  useEffect(() => {
    initState();
  }, []);

  return (
    <ThemeProvider value={theme === "light" ? DefaultTheme : DarkTheme}>
      <GestureHandlerRootView>
        <Stack screenOptions={{ headerTitleStyle: { fontWeight: "bold" } }}>
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen
            name="workouts/[id]"
            options={{ title: "Workout Details" }}
          />
          <Stack.Screen
            name="workouts/current"
            options={{ title: "Workout" }}
          />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
