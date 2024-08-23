import { Colors } from "@styles/colors";
import { Dimensions, StatusBar, View } from "react-native";
import Animated, { Keyframe, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

import LogoSvg from "@assets/logo/logo.svg"
import LettersSvg from "@assets/logo/letters.svg"
import { useEffect, useRef, useState } from "react";

const LettersSvgWidth = 96
const FirstAnimationDuration = 630

const ScreenDimensions = Dimensions.get("screen")
const purpleCircleSize = ScreenDimensions.width * 2.5

type Props = {
  isAnimationAllowedToEnd?: boolean
  setIsAllReady: (val: boolean) => void
}

export default function SplashScreenView({ isAnimationAllowedToEnd, setIsAllReady }: Props) {
  const lettersContainerWidth = useSharedValue(0);
  const lettersContainerOpacity = useSharedValue(0);

  const containerOpacity = useSharedValue(1);
  const isAnimationAlredyDone = useRef(false);

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
    lettersContainerWidth.value = withDelay(300, withTiming(
      LettersSvgWidth,
      { duration: 700 },
      (finished) => {
        if (finished)
          runOnJS(runAnimationEnd)()
      }
    ))

    lettersContainerOpacity.value = withDelay(300, withTiming(1, { duration: 500 }))
  }

  function runAnimationEnd() {
    containerOpacity.value = withTiming(0, { duration: 500 }, switchToApplication)
  }

  function switchToApplication() {
    'worklet'
    runOnJS(setIsAllReady)(true)
  }

  return (
    <Animated.View style={[{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.app.purpleDark }, containerOpacityStyle]}>
      <StatusBar translucent backgroundColor={"transparent"} />

      <Animated.View
        style={{ height: purpleCircleSize, width: purpleCircleSize, justifyContent: "center", alignItems: "center", backgroundColor: Colors.app.purple, borderRadius: 9999 }}
        entering={enteringKeyFrame.duration(FirstAnimationDuration).withCallback(onFirstAnimationEnd)}
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