import { StyleSheet, FlatList } from "react-native";
import { useLocalSearchParams, Redirect } from "expo-router";

import { ThemeView } from "@/components/ui/Themed";
import ExerciseListItem from "@/components/ExerciseListItem";
import WorkoutHeader from "@/components/WorkoutHeader";

import useWorkoutStore from "@/store/useWorkoutStore";

import { getTimeAgo } from "@/utils/workouts";

export default function WorkoutDetailsScreen() {
  const { id } = useLocalSearchParams();

  const workouts = useWorkoutStore((state) => state.workouts);
  const workout = workouts.find((workout) => workout.id === id);

  if (!workout) {
    return <Redirect href="/" />;
  }

  return (
    <ThemeView style={styles.container}>
      <FlatList
        data={workout.exercises}
        renderItem={({ item }) => <ExerciseListItem exercise={item} />}
        ListHeaderComponent={
          <WorkoutHeader
            title="Workout Details"
            subTitle={getTimeAgo(new Date(workout.finishedAt!), new Date())}
          />
        }
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
  },
});
