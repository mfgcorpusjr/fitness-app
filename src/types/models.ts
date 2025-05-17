export type Workout = {
  id: string;
  createdAt: Date;
  finishedAt?: Date;
};

export type Exercise = {
  id: string;
  workoutId: string;
  name: string;
};

export type Set = {
  id: string;
  exerciseId: string;
  reps?: number;
  weight?: number;
  oneRM?: number;
};

export type WorkoutWithExercise = Workout & {
  exercises: ExerciseWithSets[];
};

export type ExerciseWithSets = Exercise & {
  sets: Set[];
};
