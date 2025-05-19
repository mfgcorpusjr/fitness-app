import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInMilliseconds,
} from "date-fns";

import { ExerciseWithSets } from "@/types/models";

export const getWorkoutDuration = (
  startDate: string | Date,
  endDate: string | Date
) => {
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

export const getTimeAgo = (fromDate: string, toDate: string) => {
  const years = differenceInYears(toDate, fromDate);
  if (years > 0) return `${years} year${years !== 1 ? "s" : ""} ago`;

  const months = differenceInMonths(toDate, fromDate);
  if (months > 0) return `${months} month${months !== 1 ? "s" : ""} ago`;

  const days = differenceInDays(toDate, fromDate);
  if (days > 0) return `${days} day${days !== 1 ? "s" : ""} ago`;

  const hours = differenceInHours(toDate, fromDate);
  if (hours > 0) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

  const minutes = differenceInMinutes(toDate, fromDate);
  if (minutes > 0) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

  const seconds = differenceInSeconds(toDate, fromDate);
  return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
};
