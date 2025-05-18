import { StyleSheet } from "react-native";

import { ThemeView, ThemedText } from "@/components/ui/Themed";

type WorkoutHeaderProps = {
  title: string;
  subTitle: string;
};

export default function WorkoutHeader({ title, subTitle }: WorkoutHeaderProps) {
  return (
    <ThemeView style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.subTitle}>{subTitle}</ThemedText>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingVertical: 24,
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
