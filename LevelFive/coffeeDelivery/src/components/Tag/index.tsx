import { useEffect } from "react";
import { Pressable, PressableProps } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { Colors } from "@styles/colors";
import st from "./styles";

type Props = PressableProps & {
  active?: boolean
  children?: React.ReactNode
}
export function Tag({ active, children, ...props }: Props) {
  const isActive = useSharedValue(active);

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

  useEffect(() => {
    isActive.value = active
  }, [active])

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