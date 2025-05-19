import { useState } from "react";
import { StyleSheet, FlatList } from "react-native";

import { ThemeView, ThemedText } from "./ui/Themed";
import AppModal from "@/components/ui/AppModal";
import AppTextInput from "./ui/AppTextInput";
import AppButton from "@/components/ui/AppButton";

import exercises from "@/data/exercises";

export default function ExercisesListModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [input, setInput] = useState("");

  const data = exercises.filter((exercise) =>
    input
      ? exercise.name.toLowerCase().includes(input.toLowerCase().trim())
      : true
  );

  return (
    <>
      <AppModal
        visible={isModalVisible}
        title="Select exercise"
        onClose={() => setIsModalVisible(false)}
      >
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
      </AppModal>

      <AppButton text="Add Exercise" onPress={() => setIsModalVisible(true)} />
    </>
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
