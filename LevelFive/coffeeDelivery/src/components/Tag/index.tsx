import { Pressable, PressableProps } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

import { Colors } from "@styles/colors";
import st from "./styles";

type Props = PressableProps & {
  currentFocus: SharedValue<number>
  ownIndex: number
  children?: React.ReactNode
}
export function Tag({ currentFocus, ownIndex, children, ...props }: Props) {
  const animatedStyleContainer = useAnimatedStyle(() => ({
    backgroundColor: currentFocus.value === ownIndex
      ? withTiming(Colors.app.purpleDark)
      : withTiming(Colors.gray[900])
  }))

  const animatedStyleText = useAnimatedStyle(() => ({
    color: currentFocus.value === ownIndex
      ? withTiming("white")
      : withTiming(Colors.app.purpleDark)
  }))

  return (
    <Pressable
      {...props}
    >
      <Animated.View style={[animatedStyleContainer, st.container]}>
        <Animated.Text style={[st.text, animatedStyleText]}>
          {children}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  )
}