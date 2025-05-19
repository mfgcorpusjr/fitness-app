import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { Stack, Redirect } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

import { ThemeView } from "@/components/ui/Themed";
import AppButton from "@/components/ui/AppButton";
import WorkoutTrackerListItem from "@/components/WorkoutTrackerListItem";
import WorkoutHeader from "@/components/WorkoutHeader";
import WorkoutTimer from "@/components/WorkoutTimer";
import ExercisesListModal from "@/components/ExercisesListModal";

import useWorkoutStore from "@/store/useWorkoutStore";

export default function CurrentWorkoutScreen() {
  const currentWorkout = useWorkoutStore((state) => state.currentWorkout);
  const finishWorkout = useWorkoutStore((state) => state.finishWorkout);

  const headerHeight = useHeaderHeight();

  if (!currentWorkout) {
    return <Redirect href="/" />;
  }

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
              onPress={finishWorkout}
            />
          ),
        }}
      />

      <ThemeView style={styles.container}>
        <FlatList
          data={currentWorkout.exercises}
          renderItem={({ item }) => <WorkoutTrackerListItem exercise={item} />}
          ListHeaderComponent={
            <WorkoutHeader
              title="Workout Tracker"
              subTitle={
                <WorkoutTimer from={new Date(currentWorkout.createdAt)} />
              }
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
