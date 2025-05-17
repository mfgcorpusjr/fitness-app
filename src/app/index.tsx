import { StyleSheet } from "react-native";
import { ThemeView, ThemedText } from "@/components/ui/Themed";

export default function HomeScreen() {
  return (
    <ThemeView style={styles.container}>
      <ThemedText>Home Screen</ThemedText>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
