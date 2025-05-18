import { useColorScheme, View, ViewProps, Text, TextProps } from "react-native";

import Colors from "@/constants/Colors";

export const ThemeView = ({ ...rest }: ViewProps) => {
  const theme = useColorScheme() || "light";

  const backgroundColor = Colors[theme].background;

  return <View {...rest} style={[{ backgroundColor }, rest.style]} />;
};

export const ThemedText = ({ ...rest }: TextProps) => {
  const theme = useColorScheme() || "light";

  const color = Colors[theme].text;

  return <Text {...rest} style={[{ color }, rest.style]} />;
};
