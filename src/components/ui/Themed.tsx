import {
  useColorScheme,
  View,
  ViewProps,
  Text,
  TextProps,
  TextInput,
  TextInputProps,
} from "react-native";

import Colors from "@/constants/Colors";

export const ThemeView = ({ ...rest }: ViewProps) => {
  const theme = useColorScheme() || "light";

  return (
    <View
      {...rest}
      style={[{ backgroundColor: Colors[theme].background }, rest.style]}
    />
  );
};

export const ThemedText = ({ ...rest }: TextProps) => {
  const theme = useColorScheme() || "light";

  return <Text {...rest} style={[{ color: Colors[theme].text }, rest.style]} />;
};

export const ThemeTextInput = ({ ...rest }: TextInputProps) => {
  const theme = useColorScheme() || "light";

  return (
    <TextInput
      {...rest}
      style={[
        {
          backgroundColor: Colors[theme].textInputBackground,
          color: Colors[theme].text,
        },
        rest.style,
      ]}
    />
  );
};
