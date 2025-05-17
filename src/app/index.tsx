import { StyleSheet } from "react-native";

import { ThemeView, ThemedText } from "@/components/ui/Themed";

export default function HomeScreen() {
  return (
    <ThemeView style={styles.container}>
      <ThemedText>Hello World</ThemedText>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
