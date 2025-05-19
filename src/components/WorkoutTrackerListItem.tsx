import { StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

import { ThemeView, ThemedText } from "@/components/ui/Themed";
import AppCard from "@/components/ui/AppCard";
import AppTextInput from "./ui/AppTextInput";
import AppButton from "@/components/ui/AppButton";

import { ExerciseWithSets } from "@/types/models";

type WorkoutTrackerListItemProps = {
  exercise: ExerciseWithSets;
};

export default function WorkoutTrackerListItem({
  exercise,
}: WorkoutTrackerListItemProps) {
  const renderRightActions = (setId: string) => (
    <ThemeView
      style={[
        styles.kgRepsContainer,
        {
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <AppButton
        text="Delete"
        type="link"
        textStyle={{ color: "crimson" }}
        containerStyle={{ padding: 0 }}
        onPress={() => console.log(setId)}
      />
    </ThemeView>
  );

  return (
    <GestureHandlerRootView>
      <AppCard title={exercise.name}>
        <ThemeView style={styles.row}>
          <ThemedText style={[styles.headerText, { flex: 1 }]}>Set</ThemedText>

          <ThemeView style={styles.kgRepsContainer}>
            <ThemedText style={[styles.headerText, { textAlign: "center" }]}>
              kg
            </ThemedText>
          </ThemeView>
          <ThemeView style={styles.kgRepsContainer}>
            <ThemedText style={[styles.headerText, { textAlign: "center" }]}>
              Reps
            </ThemedText>
          </ThemeView>
        </ThemeView>

        {exercise.sets.map((set, index) => (
          <Swipeable
            key={set.id}
            renderRightActions={() => renderRightActions(set.id)}
          >
            <ThemeView style={styles.row}>
              <ThemedText style={[styles.index, { flex: 1 }]}>
                {index + 1}
              </ThemedText>

              <ThemeView style={[styles.kgRepsContainer]}>
                <AppTextInput textAlign="center" keyboardType="decimal-pad" />
              </ThemeView>
              <ThemeView style={styles.kgRepsContainer}>
                <AppTextInput textAlign="center" keyboardType="number-pad" />
              </ThemeView>
            </ThemeView>
          </Swipeable>
        ))}

        <AppButton
          containerStyle={{ padding: 10 }}
          text="+ Add Set"
          type="link"
        />
      </AppCard>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "700",
  },
  kgRepsContainer: {
    width: 80,
  },
  index: {
    fontSize: 16,
    fontWeight: "700",
  },
});
