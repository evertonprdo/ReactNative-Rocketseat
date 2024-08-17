import { Dimensions, View } from "react-native";

import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";

import styles from "./styles";
import { Button } from "@components/Button";
import { useEffect, useState } from "react";

const TIME = 500

export default function Cart() {
  const [isOnAnimation, setIsOnAnimation] = useState(false)

  const top = useSharedValue<number>(0);
  const left = useSharedValue<number>(0);

  const { height, width } = Dimensions.get("screen")
  const floor = height - 333;

  const config = {
    duration: TIME,
    easing: Easing.elastic(),
  }

  function handleOnPress() {
    setIsOnAnimation(!isOnAnimation)
  }

  function animation() {
    const sideFix = 63
    if (!isOnAnimation) {
      left.value = withTiming(sideFix, config)
      top.value = withTiming(0, config)
      return
    }

    top.value = withRepeat(
      withSequence(
        withTiming(0, config),
        withTiming(floor, config),
        withTiming(floor, config),
        withTiming(0, config),
      ), -1
    )

    left.value = withRepeat(
      withSequence(
        withTiming(width - sideFix, config),
        withTiming(width - sideFix, config),
        withTiming(sideFix, config),
        withTiming(sideFix, config),
      ), -1
    )
  }

  useEffect(() => {
    animation();
  }, [isOnAnimation])

  const animatedStyles = useAnimatedStyle(() => ({
    top: top.value,
    left: left.value
  }))

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Animated.View
          style={[styles.ball, animatedStyles]}
        />
      </View>

      <View style={{ padding: 20 }}>

        <Button variant={!isOnAnimation ? "purple" : "yellow"} onPress={handleOnPress}>Click Me!</Button>
      </View>
    </View>
  )
}