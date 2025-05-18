import { Set } from "@/types/models";

export const getBestSet = (sets: Set[]) => {
  return sets.reduce((best: Set | null, current) => {
    return (current?.oneRM || 0) > (best?.oneRM || 0) ? current : best;
  }, null);
};
