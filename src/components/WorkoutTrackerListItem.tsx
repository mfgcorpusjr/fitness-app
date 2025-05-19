import { StyleSheet } from "react-native";

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
  return (
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
        <ThemeView key={set.id} style={styles.row}>
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
      ))}

      <AppButton
        containerStyle={{ padding: 10 }}
        text="+ Add Set"
        type="link"
      />
    </AppCard>
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
    width: 60,
  },
  index: {
    fontSize: 16,
    fontWeight: "700",
  },
});
