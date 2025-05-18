import { StyleSheet, useColorScheme, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { format } from "date-fns";

import { ThemeView, ThemedText } from "@/components/ui/Themed";
import AppCard from "@/components/ui/AppCard";

import { WorkoutWithExercises } from "@/types/models";

import { getWorkoutDuration, getWorkoutWeight } from "@/utils/workouts";
import { getBestSet } from "@/utils/sets";

import Colors from "@/constants/Colors";

type WorkoutListItemProps = {
  workout: WorkoutWithExercises;
};

export default function WorkoutListItem({ workout }: WorkoutListItemProps) {
  const title = format(workout.finishedAt!, "eee, MMM d, yyyy 'at' p");

  const renderFooter = () => {
    const theme = useColorScheme() || "light";

    return (
      <ThemeView style={[styles.footerRow, { gap: 16 }]}>
        <ThemeView style={[styles.footerRow, { gap: 4 }]}>
          <Ionicons name="time-outline" size={24} color={Colors[theme].text} />
          <ThemedText style={styles.footerText}>
            {getWorkoutDuration(workout.createdAt, workout.finishedAt!)}
          </ThemedText>
        </ThemeView>

        <ThemeView style={[styles.footerRow, { gap: 4 }]}>
          <Ionicons
            name="barbell-outline"
            size={24}
            color={Colors[theme].text}
          />
          <ThemedText style={styles.footerText}>
            {getWorkoutWeight(workout.exercises)} kg
          </ThemedText>
        </ThemeView>
      </ThemeView>
    );
  };

  return (
    <Link href={`/workouts/${workout.id}`} asChild>
      <Pressable>
        <AppCard title={title} footer={renderFooter()}>
          <ThemeView style={styles.row}>
            <ThemedText style={styles.headerText}>Exercise</ThemedText>
            <ThemedText style={styles.headerText}>Best Set</ThemedText>
          </ThemeView>

          {workout.exercises.map((exercise) => {
            const bestSet = getBestSet(exercise.sets);

            return (
              <ThemeView key={exercise.id} style={styles.row}>
                <ThemedText style={styles.rowText}>
                  {exercise.sets.length} x {exercise.name}
                </ThemedText>
                {bestSet && (
                  <ThemedText style={styles.rowText}>
                    {bestSet.reps} x {bestSet.weight}kg
                  </ThemedText>
                )}
              </ThemeView>
            );
          })}
        </AppCard>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "700",
  },
  rowText: {
    fontSize: 16,
    color: "grey",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
