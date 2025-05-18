import { differenceInMilliseconds } from "date-fns";

import { ExerciseWithSets } from "@/types/models";

export const getWorkoutDuration = (startDate: string, endDate: string) => {
  const diffMs = differenceInMilliseconds(endDate, startDate);

  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

export const getWorkoutWeight = (exercises: ExerciseWithSets[]) => {
  return exercises.reduce((exerciseSum, exercise) => {
    const exerciseWeight = exercise.sets.reduce((setSum, set) => {
      const reps = set.reps ?? 0;
      const weight = set.weight ?? 0;
      return setSum + reps * weight;
    }, 0);
    return exerciseSum + exerciseWeight;
  }, 0);
};
