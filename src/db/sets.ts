import { getDb } from ".";

import { Set } from "@/types/models";
import { DBSet } from "@/types/db";

const parseSet = (s: DBSet): Set => {
  return {
    id: s.id,
    exerciseId: s.exercise_id,
    reps: s.reps,
    weight: s.weight,
    oneRM: s.one_rm,
  };
};

export const getSets = async (exerciseId: string) => {
  try {
    const db = await getDb();

    const response = await db.getAllAsync<DBSet>(
      "SELECT * FROM sets WHERE exercise_id = ?",
      exerciseId
    );

    return response.map(parseSet);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addOrUpdateSet = async (set: Set) => {
  try {
    const db = await getDb();

    await db.runAsync(
      "INSERT OR REPLACE INTO sets (id, exercise_id, reps, weight, one_rm) VALUES (?, ?, ?, ?, ?)",
      set.id,
      set.exerciseId,
      set.reps || null,
      set.weight || null,
      set.oneRM || null
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteSet = async (set: Set) => {
  try {
    const db = await getDb();

    await db.runAsync("DELETE FROM sets WHERE id=?", set.id);
  } catch (error) {
    console.log(error);
  }
};
