import { Pressable, PressableProps } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

import { Colors } from "@styles/colors";
import st from "./styles";

type Props = PressableProps & {
  isActive: SharedValue<boolean>
  children?: React.ReactNode
}
export function Tag({ isActive: isActive, children, ...props }: Props) {
  const animatedStyleContainer = useAnimatedStyle(() => ({
    backgroundColor: isActive.value
      ? withTiming(Colors.app.purpleDark)
      : withTiming(Colors.gray[900])
  }))

  const animatedStyleText = useAnimatedStyle(() => ({
    color: isActive.value
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