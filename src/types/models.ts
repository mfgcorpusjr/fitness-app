export type Workout = {
  id: string;
  createdAt: string;
  finishedAt: string | null;
};

export type Exercise = {
  id: string;
  workoutId: string;
  name: string;
};

export type Set = {
  id: string;
  exerciseId: string;
  reps: number | null;
  weight: number | null;
  oneRM: number | null;
};

export type WorkoutWithExercises = Workout & {
  exercises: ExerciseWithSets[];
};

export type ExerciseWithSets = Exercise & {
  sets: Set[];
};
