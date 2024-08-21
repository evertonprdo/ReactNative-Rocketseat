import { useEffect, useState } from "react";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import st from "./styles";
import { HighlightCard } from "@components/HighlightCard";

import type { CoffeeProps } from "@data/coffee";
import type { HomeScreenProps } from "@screens/Home";

const CARD_WIDTH = 166.4
const FOCUS_CARD_WIDTH = 208
const PADDING = 32

type Props = {
  coffeeArray: CoffeeProps
  navigation: HomeScreenProps["navigation"]
}

export function Carousel({ coffeeArray, navigation }: Props) {

  const [snapPoints, setSnapPoints] = useState<number[]>([]);

  const offset = useSharedValue(0);
  const [currentFocus, setCurrentFocus] = useState(0);

  const pan = Gesture.Pan()
    .onChange((event) => {
      offset.value += event.changeX
    })
    .onFinalize((event) => {
      const translationX = offset.value + event.translationX;

      let pointIndex = 0

      const closestPoint = snapPoints.reduce((prev, curr, i) => {
        const isCloserThanPrev = Math.abs(curr - translationX) < Math.abs(prev - translationX)

        pointIndex = isCloserThanPrev ? i : pointIndex
        return isCloserThanPrev ? curr : prev;
      })

      offset.value = withTiming(closestPoint, { duration: 300 });

      runOnJS(setCurrentFocus)(pointIndex)
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }]
  }));

  useEffect(() => {
    const values: number[] = []
    coffeeArray.forEach((_, i) => {
      const lastIndex = coffeeArray.length - 1

      if (i === 0) {
        return values.push(0)
      }
      const focusCardXCenter = (FOCUS_CARD_WIDTH / 2)
      const offsetXUntilCurrentFocus = (CARD_WIDTH + PADDING) * (i - 1) + PADDING

      const value = focusCardXCenter + offsetXUntilCurrentFocus

      if (i === lastIndex) {
        const offsetXWhenIsLastIndex = value - (FOCUS_CARD_WIDTH / 2) + 32
        return values.push(-offsetXWhenIsLastIndex)
      }

      values.push(-value);
    })

    setSnapPoints(values)
  }, [coffeeArray])

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[st.container, animatedStyle]}>

        {coffeeArray.map((item, i) => (
          <HighlightCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
            category={item.category}
            price={(item.price / 100).toFixed(2).replace('.', ',')}
            onPress={() => { navigation.navigate("product", { id: item.id }) }}
            isCurrentFocus={i === currentFocus}
            style={{ display: currentFocus + 2 >= i ? "flex" : "none" }}
          />
        ))}

      </Animated.View>
    </GestureDetector>
  )
}