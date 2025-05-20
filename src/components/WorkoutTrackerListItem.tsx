import { StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import { ThemeView, ThemedText } from "@/components/ui/Themed";
import AppCard from "@/components/ui/AppCard";
import AppTextInput from "./ui/AppTextInput";
import AppButton from "@/components/ui/AppButton";

import useWorkoutStore from "@/store/useWorkoutStore";

import { ExerciseWithSets, Set } from "@/types/models";

type WorkoutTrackerListItemProps = {
  exercise: ExerciseWithSets;
};

export default function WorkoutTrackerListItem({
  exercise,
}: WorkoutTrackerListItemProps) {
  const addSet = useWorkoutStore((state) => state.addSet);
  const deleteSet = useWorkoutStore((state) => state.deleteSet);
  const updateSet = useWorkoutStore((state) => state.updateSet);

  const renderRightActions = (set: Set) => (
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
        onPress={() => deleteSet(set)}
      />
    </ThemeView>
  );

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
        <Swipeable
          key={set.id}
          renderRightActions={() => renderRightActions(set)}
        >
          <ThemeView style={styles.row}>
            <ThemedText style={[styles.index, { flex: 1 }]}>
              {index + 1}
            </ThemedText>

            <ThemeView style={[styles.kgRepsContainer]}>
              <AppTextInput
                value={String(set.weight || "")}
                onChangeText={(val) => updateSet(set, { weight: Number(val) })}
                textAlign="center"
                keyboardType="decimal-pad"
              />
            </ThemeView>
            <ThemeView style={styles.kgRepsContainer}>
              <AppTextInput
                value={String(set.reps || "")}
                onChangeText={(val) => updateSet(set, { reps: Number(val) })}
                textAlign="center"
                keyboardType="number-pad"
              />
            </ThemeView>
          </ThemeView>
        </Swipeable>
      ))}

      <AppButton
        containerStyle={{ padding: 10 }}
        text="+ Add Set"
        type="link"
        onPress={() => addSet(exercise)}
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
    width: 80,
  },
  index: {
    fontSize: 16,
    fontWeight: "700",
  },
});
