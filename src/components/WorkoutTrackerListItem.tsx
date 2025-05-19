import { ThemedText } from "./ui/Themed";

import AppCard from "@/components/ui/AppCard";

import { ExerciseWithSets } from "@/types/models";

type WorkoutTrackerListItemProps = {
  exercise: ExerciseWithSets;
};

export default function WorkoutTrackerListItem({
  exercise,
}: WorkoutTrackerListItemProps) {
  return <AppCard title={exercise.name}></AppCard>;
}
