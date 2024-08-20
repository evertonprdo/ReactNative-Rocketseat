import { useMemo, useState } from "react";
import st from "./styles";
import { HighlightCard } from "@components/HighlightCard";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { CoffeeProps, coffeeSearchArray } from "@data/coffee";

const CARD_WIDTH = 166.4
const FOCUS_CARD_WIDTH = 208
const PADDING = 32

export function Carrosel() {
  const [searchCoffeeArray, setSearchCoffeeArray] = useState<CoffeeProps>(coffeeSearchArray);
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

  useMemo(() => {
    const values: number[] = []
    searchCoffeeArray.forEach((_, i) => {
      const lastIndex = searchCoffeeArray.length - 1

      if (i === 0) {
        return values.push(0)
      }

      if (i === lastIndex) {
        const offsetXWhenIsLastIndex = FOCUS_CARD_WIDTH + (CARD_WIDTH * (lastIndex - 1)) - PADDING
        return values.push(-offsetXWhenIsLastIndex)
      }
      const currentCardCenterX = (FOCUS_CARD_WIDTH / 2)

      const offsetXUntilCurrentFocus = (CARD_WIDTH + PADDING) * (i - 1) + PADDING

      const value = currentCardCenterX + offsetXUntilCurrentFocus

      values.push(-value);
    })

    setSnapPoints(values)
  }, [searchCoffeeArray])

  console.log(snapPoints)
  return (
    <>
      <GestureDetector gesture={pan}>
        <Animated.View style={[st.container, animatedStyle]}>

          {searchCoffeeArray.map((item, i) => (
            <HighlightCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
              category={item.category}
              price={(item.price / 100).toFixed(2).replace('.', ',')}
              isCurrentFocus={i === currentFocus}
              onPress={() => { }}
            />
          ))}

        </Animated.View>
      </GestureDetector>
    </>
  )
}