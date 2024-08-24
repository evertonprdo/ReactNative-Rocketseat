import { Pressable, PressableProps, StyleSheet } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import { Colors } from "@styles/colors";
import { useState } from "react";

type Props = PressableProps & {
  color?: string
  size?: number
}

export function PressableArrowLeft({ color = Colors.white, size = 24, ...rest }: Props) {
  const [isPressedIn, setIsPressedIn] = useState(false);

  const backgroundColor = isPressedIn ? "#73737350" : "transparent"
  return (
    <Pressable
      onPressIn={() => setIsPressedIn(true)}
      onPressOut={() => setIsPressedIn(false)}
      style={[styles.container, { backgroundColor }]}
      {...rest}
    >
      <ArrowLeft color={color} size={size} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: -8,
    borderRadius: 9999
  },
})