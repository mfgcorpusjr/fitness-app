import { getDb } from ".";

import { Workout, WorkoutWithExercises } from "@/types/models";
import { DBWorkout } from "@/types/db";

import { getExercisesWithSets } from "./exercises";

const parseWorkout = async (w: DBWorkout): Promise<WorkoutWithExercises> => {
  return {
    id: w.id,
    createdAt: new Date(w.created_at),
    finishedAt: w.finished_at ? new Date(w.finished_at) : undefined,
    exercises: await getExercisesWithSets(w.id),
  };
};

export const getCurrentWorkout = async () => {
  try {
    const db = await getDb();

    const response = await db.getFirstAsync<DBWorkout>(
      "SELECT * FROM workouts WHERE finished_at IS NULL ORDER BY created_at DESC LIMIT 1"
    );

    if (!response) return null;

    return parseWorkout(response);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getWorkouts = async () => {
  try {
    const db = await getDb();

    const response = await db.getAllAsync<DBWorkout>(
      "SELECT * FROM workouts WHERE finished_at IS NOT NULL ORDER BY created_at DESC"
    );

    return Promise.all(response.map(parseWorkout));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createOrFinishWorkout = async (workout: Workout) => {
  try {
    const db = await getDb();

    await db.runAsync(
      "INSERT OR REPLACE INTO workouts (id, created_at, finished_at) VALUES (?, ?, ?)",
      workout.id,
      workout.createdAt.toISOString(),
      workout.finishedAt?.toISOString() || null
    );
  } catch (error) {
    console.log(error);
  }
};
