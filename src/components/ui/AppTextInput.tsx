import { StyleSheet, TextInputProps } from "react-native";

import { ThemeTextInput } from "@/components/ui/Themed";

export default function AppTextInput({ ...rest }: TextInputProps) {
  return <ThemeTextInput {...rest} style={[styles.textInput, rest.style]} />;
}

const styles = StyleSheet.create({
  textInput: {
    padding: 12,
    fontSize: 18,
  },
});
