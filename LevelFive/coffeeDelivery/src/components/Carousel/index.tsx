import { useEffect, useState } from "react";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import st from "./styles";
import { DURATION, HighlightCard } from "@components/HighlightCard";

import type { CoffeeProps } from "@data/coffee";
import type { HomeScreenProps } from "@screens/Home";
import { Dimensions } from "react-native";

const FOCUS_CARD_WIDTH = 208
const CARD_WIDTH = Math.round(FOCUS_CARD_WIDTH * 0.8)
const PADDING = 32
const ScreeWidth = Dimensions.get("screen").width

type Props = {
  coffeeArray: CoffeeProps
  navigation: HomeScreenProps["navigation"]
}

export function Carousel({ coffeeArray, navigation }: Props) {

  const [snapPoints, setSnapPoints] = useState<number[]>([]);

  const offset = useSharedValue(PADDING);
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

      offset.value = withTiming(closestPoint, {duration: DURATION});
      runOnJS(setCurrentFocus)(pointIndex)
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }]
  }));

  useEffect(() => {
    const values: number[] = []
    const lastIndex = coffeeArray.length - 1

    coffeeArray.forEach((_, i) => {
      if (i === 0) {
        return values.push(PADDING)
      }
      const magicNumber = 3 // This magic number allows the card to be centered

      const screenXCenter = ScreeWidth / 2
      const focusCardXCenter = (FOCUS_CARD_WIDTH / 2)
      const targetPosition = focusCardXCenter + ((CARD_WIDTH + PADDING) * i)
      
      const offsetXUntilCurrentFocus = targetPosition - screenXCenter -magicNumber
      
      if (i === lastIndex) {
        const valueToRollBack = screenXCenter - focusCardXCenter
        const lastPosition = offsetXUntilCurrentFocus - valueToRollBack + PADDING + magicNumber

        return values.push(-lastPosition)
      }
      values.push(-offsetXUntilCurrentFocus);
    })

    setSnapPoints(values)
    setCurrentFocus(0);
    offset.value = PADDING;
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
          />
        ))}

      </Animated.View>
    </GestureDetector>
  )
}