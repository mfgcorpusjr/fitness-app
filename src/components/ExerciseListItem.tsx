import { StyleSheet } from "react-native";

import { ThemeView, ThemedText } from "@/components/ui/Themed";
import AppCard from "@/components/ui/AppCard";

import { ExerciseWithSets } from "@/types/models";

import { getBestSet } from "@/utils/sets";

type ExerciseListItemProps = {
  exercise: ExerciseWithSets;
};

export default function ExerciseListItem({ exercise }: ExerciseListItemProps) {
  const bestSet = getBestSet(exercise.sets);

  return (
    <AppCard title={exercise.name}>
      <ThemeView>
        {exercise.sets.map((set, index) => {
          const isBestSet = bestSet?.id === set.id;

          return (
            <ThemeView
              key={set.id}
              style={[styles.row, isBestSet && styles.highlightedRow]}
            >
              <ThemeView
                style={[styles.leftColumn, isBestSet && styles.highlightedRow]}
              >
                <ThemedText
                  style={[styles.index, isBestSet && styles.highlightedRowText]}
                >
                  {index + 1}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.values,
                    isBestSet && styles.highlightedRowText,
                  ]}
                >
                  {set.reps} x {set.weight} kg
                </ThemedText>
              </ThemeView>

              <ThemedText
                style={[styles.values, isBestSet && styles.highlightedRowText]}
              >
                {set.oneRM ? Math.round(set.oneRM) + " kg" : ""}
              </ThemedText>
            </ThemeView>
          );
        })}
      </ThemeView>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  highlightedRow: {
    backgroundColor: "teal",
  },
  highlightedRowText: {
    color: "white",
  },
  leftColumn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  index: {
    fontSize: 16,
    color: "grey",
  },
  values: {
    fontSize: 16,
    fontWeight: "600",
  },
});
