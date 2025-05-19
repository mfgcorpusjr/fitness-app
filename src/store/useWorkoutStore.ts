import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import * as Crypto from "expo-crypto";

import { WorkoutWithExercises } from "@/types/models";

type WorkoutStore = {
  currentWorkout?: WorkoutWithExercises;
  workouts: WorkoutWithExercises[];
  createWorkout: () => void;
  finishWorkout: () => void;
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
  }))
);

export default useWorkoutStore;
