import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import {
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import Colors from "@/constants/Colors";

DefaultTheme.colors.primary = Colors.light.tint;
DarkTheme.colors.primary = Colors.dark.tint;

export default function RootLayout() {
  const theme = useColorScheme();

  return (
    <ThemeProvider value={theme === "light" ? DefaultTheme : DarkTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen
          name="workouts/[id]"
          options={{ title: "Workout Details" }}
        />
        <Stack.Screen name="workouts/current" options={{ title: "Workout" }} />
      </Stack>
    </ThemeProvider>
  );
}
