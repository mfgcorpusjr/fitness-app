import { PropsWithChildren } from "react";
import {
  useColorScheme,
  StyleSheet,
  Modal,
  ModalProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemeView, ThemedText } from "@/components/ui/Themed";

import Colors from "@/constants/Colors";

type AppModalProps = {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onClose: () => void;
} & ModalProps;

export default function AppModal({
  title,
  containerStyle,
  children,
  onClose,
  ...rest
}: PropsWithChildren<AppModalProps>) {
  const theme = useColorScheme() || "light";

  const borderColor = Colors[theme].tint;

  return (
    <Modal transparent {...rest}>
      <ThemeView style={styles.overlay}>
        <ThemeView style={[styles.container, { borderColor }, containerStyle]}>
          <ThemeView style={styles.headerContainer}>
            {title && <ThemedText style={styles.title}>{title}</ThemedText>}
            <Ionicons
              style={styles.closeIcon}
              name="close-outline"
              size={32}
              color={Colors[theme].text}
              onPress={onClose}
            />
          </ThemeView>

          <ThemeView style={styles.childrenContainer}>{children}</ThemeView>
        </ThemeView>
      </ThemeView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    height: "80%",
    padding: 16,
    borderLeftWidth: 4,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  closeIcon: {
    marginLeft: "auto",
  },
  childrenContainer: {
    flex: 1,
  },
});
