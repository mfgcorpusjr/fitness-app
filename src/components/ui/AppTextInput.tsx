import {
  StyleSheet,
  useColorScheme,
  TextInput,
  TextInputProps,
} from "react-native";

import Colors from "@/constants/Colors";

export default function AppTextInput({ ...rest }: TextInputProps) {
  const theme = useColorScheme() || "light";

  const backgroundColor = Colors[theme].textInputBackground;
  const color = Colors[theme].text;

  return (
    <TextInput
      {...rest}
      style={[styles.textInput, { backgroundColor, color }, rest.style]}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 12,
    fontSize: 18,
  },
});
