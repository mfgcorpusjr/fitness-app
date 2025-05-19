import { useState } from "react";
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
import AppModal from "@/components/ui/AppModal";
import WorkoutTrackerListItem from "@/components/WorkoutTrackerListItem";
import WorkoutHeader from "@/components/WorkoutHeader";
import ExercisesList from "@/components/ExercisesList";
import WorkoutDuration from "@/components/WorkoutDuration";

import workouts from "@/data/workouts";
const workout = workouts[0];

export default function CurrentWorkoutScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
              subTitle={<WorkoutDuration from={new Date(workout.createdAt)} />}
            />
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
