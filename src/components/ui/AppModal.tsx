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

import { ThemeView } from "@/components/ui/Themed";

import Colors from "@/constants/Colors";

type AppModalProps = {
  containerStyle?: StyleProp<ViewStyle>;
  onClose: () => void;
} & ModalProps;

export default function AppModal({
  containerStyle,
  children,
  onClose,
  ...rest
}: PropsWithChildren<AppModalProps>) {
  const theme = useColorScheme() || "light";

  return (
    <Modal transparent {...rest}>
      <ThemeView style={styles.overlay}>
        <ThemeView style={[styles.container, containerStyle]}>
          <Ionicons
            style={styles.closeIcon}
            name="close-outline"
            size={32}
            color={Colors[theme].text}
            onPress={onClose}
          />

          {children}
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
  },
  closeIcon: {
    marginLeft: "auto",
    marginBottom: 16,
  },
});
