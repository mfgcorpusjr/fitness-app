import {
  StyleSheet,
  useColorScheme,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { ThemedText } from "@/components/ui/Themed";

import Colors from "@/constants/Colors";

type AppButtonProps = {
  text: string;
  type?: "button" | "link";
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
} & PressableProps;

export default function AppButton({
  text,
  type = "button",
  containerStyle,
  textStyle,
  ...rest
}: AppButtonProps) {
  const theme = useColorScheme() || "light";

  const backgroundColor =
    type === "button" ? Colors[theme].tint : "transparent";
  const color = type === "button" ? "black" : Colors[theme].tint;

  return (
    <Pressable
      {...rest}
      style={[styles.container, { backgroundColor }, containerStyle]}
    >
      <ThemedText style={[styles.text, { color }, textStyle]}>
        {text}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
