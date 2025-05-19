import { StyleSheet } from "react-native";

import { ThemeView, ThemedText } from "@/components/ui/Themed";

type WorkoutHeaderProps = {
  title: string;
  subTitle: string | React.ReactNode;
};

export default function WorkoutHeader({ title, subTitle }: WorkoutHeaderProps) {
  return (
    <ThemeView style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      {typeof subTitle === "string" ? (
        <ThemedText style={styles.subTitle}>{subTitle}</ThemedText>
      ) : (
        subTitle
      )}
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
