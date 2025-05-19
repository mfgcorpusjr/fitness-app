import { StyleSheet, FlatList } from "react-native";
import { Link } from "expo-router";

import { ThemeView } from "@/components/ui/Themed";
import AppButton from "@/components/ui/AppButton";
import WorkoutListItem from "@/components/WorkoutListItem";

import workouts from "@/data/workouts";

export default function HomeScreen() {
  return (
    <ThemeView style={styles.container}>
      <Link href="/workouts/current" asChild>
        <AppButton text="Start New Workout" />
      </Link>

      <FlatList
        data={workouts}
        renderItem={({ item }) => <WorkoutListItem workout={item} />}
        contentContainerStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
      />
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 12,
    paddingBottom: 0,
    gap: 12,
  },
});
