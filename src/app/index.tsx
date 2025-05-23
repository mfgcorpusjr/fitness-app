import { StyleSheet, FlatList } from "react-native";
import { router } from "expo-router";

import { ThemeView } from "@/components/ui/Themed";
import AppButton from "@/components/ui/AppButton";
import WorkoutListItem from "@/components/WorkoutListItem";

import useWorkoutStore from "@/store/useWorkoutStore";

export default function HomeScreen() {
  const currentWorkout = useWorkoutStore((state) => state.currentWorkout);
  const workouts = useWorkoutStore((state) => state.workouts);
  const createWorkout = useWorkoutStore((state) => state.createWorkout);

  const workoutButtonText = currentWorkout
    ? "Resume Workout"
    : "Start New Workout";

  const handleWorkoutButton = () => {
    if (!currentWorkout) {
      createWorkout();
    }

    router.push("/workouts/current");
  };

  return (
    <ThemeView style={styles.container}>
      <AppButton text={workoutButtonText} onPress={handleWorkoutButton} />

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
