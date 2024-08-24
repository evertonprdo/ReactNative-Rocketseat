import { Pressable, PressableProps, Text } from "react-native";
import st from "./styles";
import { Colors } from "@styles/colors";
import { Fonts } from "@styles/fonts";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

type Props = PressableProps & {
  isActive?: boolean
  aletFlag?: boolean
  children?: React.ReactNode
}

export const ALERT_ANIMATION_CONFIG = { duration: 120 }

export function Select({ isActive, aletFlag, children, ...props }: Props) {
  const textAnimatedStyles = useAnimatedStyle(() => ({
    color: isActive && !aletFlag
      ? withTiming(Colors.app.purple)
      : withTiming(Colors.gray[300]),

    fontWeight: isActive && !aletFlag
      ? "bold"
      : "regular"
  }))

  const containerAnimatedStyles = useAnimatedStyle(() => ({
    backgroundColor: aletFlag
      ? withTiming(Colors.gray[700], ALERT_ANIMATION_CONFIG)
      : isActive
        ? withTiming(Colors.gray[900])
        : withTiming(Colors.gray[700]),

    borderColor: aletFlag
      ? withTiming(Colors.feedback.red, ALERT_ANIMATION_CONFIG)
      : isActive
        ? withTiming(Colors.app.purple)
        : withTiming(Colors.gray[900]),

    borderWidth: aletFlag
      ? withTiming(2, ALERT_ANIMATION_CONFIG)
      : withTiming(1)
  }))

  return (
    <Pressable style={st.container} {...props}>
      <Animated.View
        style={[
          st.innerContainer,
          containerAnimatedStyles
        ]}
      >
        <Animated.Text style={[{
          fontSize: Fonts.Roboto.sm,
        }, textAnimatedStyles]}>
          {children}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  )
}