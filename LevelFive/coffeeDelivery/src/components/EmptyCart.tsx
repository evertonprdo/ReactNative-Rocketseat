import { Colors } from "@styles/colors";
import { ShoppingCart } from "phosphor-react-native";
import { View } from "react-native";
import { TextRegular } from "./Text";
import { Button } from "./Button";

type Props = {
  onPress: () => void
}

export function EmptyCart({ onPress }: Props) {
  return (
    <View style={{ padding: 64, gap: 32 }}>

      <View style={{ gap: 12, alignItems: "center" }}>
        <ShoppingCart size={24} color={Colors.gray[500]} weight="fill" />

        <TextRegular size="sm" style={{ color: Colors.gray[400] }}>Seu carrinho está vazio</TextRegular>
      </View>
      <Button onPress={onPress}>Ver catálogo</Button>
    </View>
  )
}