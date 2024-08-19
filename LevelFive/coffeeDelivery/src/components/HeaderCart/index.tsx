import { Pressable, View } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import { Heading } from "@components/Text";
import st from "./styles";
import { useState } from "react";

type Props = {
  onPressIcon: () => void
}
export function HeaderCart({ onPressIcon }: Props) {
  const [isPressed, setIsPressed] = useState(false);
  const bgIcon = isPressed ? "#00000030" : "transparent";

  return (
    <View style={st.container}>
      <Pressable
        onPress={onPressIcon}
        style={[st.iconBg, { backgroundColor: bgIcon }]}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        <ArrowLeft />
      </Pressable>

      <Heading size="sm">Carrinho</Heading>

      <View />
    </View>
  )
}