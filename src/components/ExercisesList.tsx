import { useState } from "react";
import { StyleSheet, FlatList } from "react-native";

import { ThemeView, ThemedText } from "@/components/ui/Themed";
import AppTextInput from "./ui/AppTextInput";

import exercises from "@/data/exercises";

export default function ExercisesList() {
  const [input, setInput] = useState("");

  const data = exercises.filter((exercise) =>
    input
      ? exercise.name.toLowerCase().includes(input.toLowerCase().trim())
      : true
  );

  return (
    <ThemeView style={styles.container}>
      <AppTextInput
        placeholder="Search..."
        value={input}
        onChangeText={setInput}
      />

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ThemeView>
            <ThemedText style={styles.name}>{item.name}</ThemedText>
            <ThemedText style={styles.muscle}>{item.muscle}</ThemedText>
          </ThemeView>
        )}
        contentContainerStyle={{ gap: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  muscle: {
    fontSize: 16,
    color: "grey",
  },
});
