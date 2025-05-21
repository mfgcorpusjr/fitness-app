export type DBWorkout = {
  id: string;
  created_at: string;
  finished_at?: string;
};

export type DBExercise = {
  id: string;
  workout_id: string;
  name: string;
};

export type DBSet = {
  id: string;
  exercise_id: string;
  reps?: number;
  weight?: number;
  one_rm?: number;
};
