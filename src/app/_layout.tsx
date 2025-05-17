import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="[id]" options={{ title: "Workout Details" }} />
      <Stack.Screen name="current" options={{ title: "Workout" }} />
    </Stack>
  );
}
