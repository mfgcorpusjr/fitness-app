import { getDb } from ".";

import { Exercise, ExerciseWithSets } from "@/types/models";
import { DBExercise } from "@/types/db";

import { getSets } from "./sets";

const parseExercise = async (e: DBExercise): Promise<ExerciseWithSets> => {
  return {
    id: e.id,
    workoutId: e.workout_id,
    name: e.name,
    sets: await getSets(e.id),
  };
};

export const getExercisesWithSets = async (workoutId: string) => {
  try {
    const db = await getDb();

    const response = await db.getAllAsync<DBExercise>(
      "SELECT * FROM exercises WHERE workout_id = ?",
      workoutId
    );

    return Promise.all(response.map(parseExercise));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addExercise = async (exercise: Exercise) => {
  try {
    const db = await getDb();

    await db.runAsync(
      "INSERT INTO exercises (id, workout_id, name) VALUES (?, ?, ?)",
      exercise.id,
      exercise.workoutId,
      exercise.name
    );
  } catch (error) {
    console.log(error);
  }
};
