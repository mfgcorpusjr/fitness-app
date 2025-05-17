import { StyleSheet, View, Text } from "react-native";

export default function CurrentWorkoutScreen() {
  return (
    <View style={styles.container}>
      <Text>Current Workout Screen</Text>
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
