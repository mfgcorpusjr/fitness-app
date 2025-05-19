import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ui/Themed";

import { getWorkoutDuration } from "@/utils/workouts";

type WorkoutTimerProps = {
  from: Date;
};

export default function WorkoutTimer({ from }: WorkoutTimerProps) {
  const [timer, setTimer] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(getWorkoutDuration(from, new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <ThemedText style={styles.text}>{timer}</ThemedText>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
