import { PropsWithChildren } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { ThemeView, ThemedText } from "@/components/ui/Themed";

import Colors from "@/constants/Colors";

type AppCardProps = {
  title?: string;
  footer?: React.ReactNode;
};

export default function AppCard({
  title,
  footer,
  children,
}: PropsWithChildren<AppCardProps>) {
  const theme = useColorScheme() || "light";

  const borderColor = Colors[theme].tint;

  return (
    <ThemeView style={[styles.container, { borderColor }]}>
      {title && <ThemedText style={styles.title}>{title}</ThemedText>}

      {children}

      {footer && <ThemeView style={styles.footer}>{footer}</ThemeView>}
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderLeftWidth: 4,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "grey",
  },
});
