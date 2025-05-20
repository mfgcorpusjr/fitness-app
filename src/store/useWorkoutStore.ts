import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import * as Crypto from "expo-crypto";

import { WorkoutWithExercises, Exercise, Set } from "@/types/models";

type WorkoutStore = {
  currentWorkout?: WorkoutWithExercises;
  workouts: WorkoutWithExercises[];
  createWorkout: () => void;
  finishWorkout: () => void;
  addExercise: (exerciseName: string) => void;
  addSet: (exercise: Exercise) => void;
  updateSet: (set: Set, field: Pick<Set, "reps" | "weight">) => void;
  deleteSet: (exerciseSet: Set) => void;
};

const useWorkoutStore = create<WorkoutStore>()(
  immer((set) => ({
    currentWorkout: undefined,
    workouts: [],

    createWorkout: () => {
      const workout = {
        id: Crypto.randomUUID(),
        createdAt: new Date(),
        exercises: [],
      };

      set((state) => {
        state.currentWorkout = workout;
      });
    },

    finishWorkout: () => {
      set((state) => {
        if (state.currentWorkout) {
          state.currentWorkout.finishedAt = new Date();
          state.workouts.unshift(state.currentWorkout);
          state.currentWorkout = undefined;
        }
      });
    },

    addExercise: (exerciseName: string) => {
      set((state) => {
        if (state.currentWorkout) {
          const exercise = {
            id: Crypto.randomUUID(),
            workoutId: state.currentWorkout.id,
            name: exerciseName,
            sets: [],
          };
          state.currentWorkout.exercises.push(exercise);
        }
      });
    },

    addSet: (exercise: Exercise) => {
      set((state) => {
        if (state.currentWorkout) {
          const selectedExercise = state.currentWorkout.exercises.find(
            (e) => e.id === exercise.id
          );
          if (selectedExercise) {
            const set = {
              id: Crypto.randomUUID(),
              exerciseId: exercise.id,
            };
            selectedExercise.sets.push(set);
          }
        }
      });
    },

    updateSet: (exerciseSet: Set, field: Pick<Set, "reps" | "weight">) => {
      set((state) => {
        if (state.currentWorkout) {
          const selectedExercise = state.currentWorkout.exercises.find(
            (e) => e.id === exerciseSet.exerciseId
          );
          if (selectedExercise) {
            const index = selectedExercise.sets.findIndex(
              (s) => s.id === exerciseSet.id
            );
            selectedExercise.sets[index] = {
              ...selectedExercise.sets[index],
              ...field,
            };

            const { weight, reps } = selectedExercise.sets[index];
            if (weight && reps) {
              selectedExercise.sets[index] = {
                ...selectedExercise.sets[index],
                oneRM: weight * reps * 0.0333 + weight,
              };
            }
          }
        }
      });
    },

    deleteSet: (exerciseSet: Set) => {
      set((state) => {
        if (state.currentWorkout) {
          const selectedExercise = state.currentWorkout.exercises.find(
            (e) => e.id === exerciseSet.exerciseId
          );
          if (selectedExercise) {
            selectedExercise.sets = selectedExercise.sets.filter(
              (s) => s.id !== exerciseSet.id
            );
          }
        }
      });
    },
  }))
);

export default useWorkoutStore;
