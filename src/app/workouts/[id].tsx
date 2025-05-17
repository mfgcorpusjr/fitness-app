import { StyleSheet, View, Text } from "react-native";

export default function WorkoutDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Workout Details Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
