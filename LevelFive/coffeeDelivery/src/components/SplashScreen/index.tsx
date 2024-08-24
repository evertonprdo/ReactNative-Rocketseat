import { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import Animated, { Keyframe, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

import LogoSvg from "@assets/logo/logo.svg"
import LettersSvg from "@assets/logo/letters.svg"
import st from "./styles";

const LettersSvgWidth = 96
const FirstAnimationDuration = 630

type Props = {
  isAnimationAllowedToEnd?: boolean
  setIsAllReady: (val: boolean) => void
}

export default function SplashScreenView({ isAnimationAllowedToEnd, setIsAllReady }: Props) {
  const lettersContainerWidth = useSharedValue(0);
  const lettersContainerOpacity = useSharedValue(0);

  const containerOpacity = useSharedValue(1);
  const [isAnimationAlredyDone, setIsAnimationAlredyDone] = useState(false);

  const enteringKeyFrame = new Keyframe({
    0: { transform: [{ scale: 0 }], opacity: 0 },
    33: { opacity: 1 },
    100: { transform: [{ scale: 1 }] }
  })

  const animatedContainerStyles = useAnimatedStyle(() => ({
    width: lettersContainerWidth.value,
    opacity: lettersContainerOpacity.value
  }))

  const containerOpacityStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value
  }))

  function onFirstAnimationEnd() {
    'worklet'
    lettersContainerOpacity.value = withDelay(300, withTiming(1, { duration: 500 }))

    lettersContainerWidth.value = withDelay(300, withTiming(
      LettersSvgWidth,
      { duration: 700 },
      (finished) => {
        if (finished) {
          runOnJS(setIsAnimationAlredyDone)(true)
        }
      }
    ))
  }

  function runAnimationEnd() {
    containerOpacity.value = withTiming(0, { duration: 500 }, (finished) => {
      if (finished)
        runOnJS(setIsAllReady)(true)
    })
  }

  useEffect(() => {
    if (isAnimationAllowedToEnd && isAnimationAlredyDone) {
      runAnimationEnd()
    }
  }, [isAnimationAllowedToEnd, isAnimationAlredyDone])

  return (
    <Animated.View style={[st.container, containerOpacityStyle]}>
      <StatusBar translucent backgroundColor={"transparent"} />
      <Animated.View
        style={st.innerContainer}
        entering={enteringKeyFrame
          .duration(FirstAnimationDuration)
          .withCallback(onFirstAnimationEnd)
        }
      >
        <View style={{ flexDirection: 'row', gap: 15 }}>
          <LogoSvg />

          <Animated.View style={[{ overflow: "hidden" }, animatedContainerStyles]}>
            <LettersSvg />
          </Animated.View>
        </View>
      </Animated.View>
    </Animated.View>
  )
}