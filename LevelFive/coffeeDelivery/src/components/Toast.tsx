import { Colors } from "@styles/colors";
import { ArrowRight, ShoppingCart } from "phosphor-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { ToastConfig } from 'react-native-toast-message';
import { TextBold, TextRegular } from "./Text";
import { useCart } from "@hooks/useCart";

export const toastConfig: ToastConfig = {
  info: ({ text1, text2, onPress, hide }) => {
    const { cart } = useCart();
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <ShoppingCart size={20} color={Colors.white} weight="fill" />

          {cart.lenght > 0 &&
            <View style={styles.circle}>
              <TextRegular
                style={styles.number}
                size="xs"
              >
                {cart.lenght}
              </TextRegular>
            </View>
          }
        </View>

        <TextRegular style={styles.textContainer}>1 café
          <TextBold> {text1}</TextBold> de
          <TextBold> {text2}</TextBold> adicionado ao carrinho
        </TextRegular>

        <Pressable hitSlop={24} onPress={() => { onPress(); hide() }} style={styles.linkContainer}>
          <TextBold size="xs" style={{ color: Colors.app.purple }}>VER</TextBold>
          <ArrowRight color={Colors.app.purple} size={16} />
        </Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',

    zIndex: 999,
    width: "100%",
    paddingHorizontal: 32,
    paddingTop: 28,
    paddingBottom: 38,
    gap: 20,
    marginBottom: -12,

    backgroundColor: Colors.white,
    elevation: 9
  },
  textContainer: {
    color: Colors.gray[400],
    flex: 1
  },
  iconContainer: {
    padding: 8,
    backgroundColor: Colors.gray[500],
    borderRadius: 6
  },
  linkContainer: {
    flexDirection: "row",
    gap: 4
  },
  circle: {
    position: "absolute",
    height: 20,
    width: 20,
    top: -8,
    right: -8,

    backgroundColor: Colors.app.purple,

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    zIndex: 10
  },
  number: {
    color: Colors.white,
  }
})