import { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";

import { ThemeView } from "@/components/ui/Themed";
import AppButton from "@/components/ui/AppButton";
import AppModal from "@/components/ui/AppModal";
import WorkoutTrackerListItem from "@/components/WorkoutTrackerListItem";
import WorkoutHeader from "@/components/WorkoutHeader";
import ExercisesList from "@/components/ExercisesList";

import { getWorkoutDuration } from "@/utils/workouts";

import workouts from "@/data/workouts";
const workout = workouts[0];

export default function CurrentWorkoutScreen() {
  const [timer, setTimer] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(getWorkoutDuration(new Date(workout.createdAt), new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeView style={styles.container}>
      <FlatList
        data={workout.exercises}
        renderItem={({ item }) => <WorkoutTrackerListItem exercise={item} />}
        ListHeaderComponent={
          <WorkoutHeader title="Workout Tracker" subTitle={timer} />
        }
        ListFooterComponent={
          <AppButton
            text="Add Exercise"
            onPress={() => setIsModalVisible(true)}
          />
        }
        contentContainerStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
      />

      <AppModal
        visible={isModalVisible}
        title="Select exercise"
        onClose={() => setIsModalVisible(false)}
      >
        <ExercisesList />
      </AppModal>
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
