import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { Stack } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

import { ThemeView } from "@/components/ui/Themed";
import AppButton from "@/components/ui/AppButton";
import WorkoutTrackerListItem from "@/components/WorkoutTrackerListItem";
import WorkoutHeader from "@/components/WorkoutHeader";
import WorkoutTimer from "@/components/WorkoutTimer";
import ExercisesListModal from "@/components/ExercisesListModal";

import workouts from "@/data/workouts";
const workout = workouts[0];

export default function CurrentWorkoutScreen() {
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={headerHeight}
      style={{ flex: 1 }}
    >
      <Stack.Screen
        options={{
          headerRight: () => (
            <AppButton
              text="Finish"
              type="link"
              containerStyle={{ padding: 0 }}
            />
          ),
        }}
      />

      <ThemeView style={styles.container}>
        <FlatList
          data={workout.exercises}
          renderItem={({ item }) => <WorkoutTrackerListItem exercise={item} />}
          ListHeaderComponent={
            <WorkoutHeader
              title="Workout Tracker"
              subTitle={<WorkoutTimer from={new Date(workout.createdAt)} />}
            />
          }
          ListFooterComponent={<ExercisesListModal />}
          contentContainerStyle={{ gap: 12 }}
          showsVerticalScrollIndicator={false}
        />
      </ThemeView>
    </KeyboardAvoidingView>
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
