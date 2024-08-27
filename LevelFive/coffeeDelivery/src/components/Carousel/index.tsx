import { useMemo, useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import st, { CARDS_GAP } from "./styles";
import { HighlightCard, CARD_WIDTH_ON_BLUER } from "@components/HighlightCard";
import { CARD_WIDTH } from "@components/HighlightCard/styles"

import type { CoffeeProps } from "@data/coffee";
import type { HomeScreenProps } from "@screens/Home";
import { Dimensions } from "react-native";

const DURATION = 333

const ScreeWidth = Dimensions.get("screen").width

type Props = {
  coffeeArray: CoffeeProps[]
  navigation: HomeScreenProps["navigation"]
}

export function Carousel({ coffeeArray, navigation }: Props) {

  const [snapPoints, setSnapPoints] = useState<number[]>([]);

  const offsetX = useSharedValue(CARDS_GAP);

  const pan = Gesture.Pan()
    .onChange((event) => {
      offsetX.value += event.changeX
    })
    .onEnd((event) => {
      const translationX = offsetX.value + event.translationX;

      let pointIndex = 0

      const closestPoint = snapPoints.reduce((prev, curr, i) => {
        const isCloserThanPrev = Math.abs(curr - translationX) < Math.abs(prev - translationX)

        pointIndex = isCloserThanPrev ? i : pointIndex
        return isCloserThanPrev ? curr : prev;
      })

      offsetX.value = withTiming(closestPoint, { duration: DURATION });
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }]
  }));

  useMemo(() => {
    const values: number[] = []
    const lastIndex = coffeeArray.length - 1

    const magicNumber = 3 // This magic number allows the card to be centered

    const screenXCenter = ScreeWidth / 2
    const focusCardXCenter = (CARD_WIDTH / 2)

    coffeeArray.forEach((_, i) => {
      if (i === 0) {
        return values.push(CARDS_GAP)
      }
      const targetPosition = focusCardXCenter + ((CARD_WIDTH_ON_BLUER + CARDS_GAP) * i)

      const offsetXUntilCurrentFocus = targetPosition - screenXCenter - magicNumber

      if (i === lastIndex) {
        const valueToRollBack = screenXCenter - focusCardXCenter
        const lastPosition = offsetXUntilCurrentFocus - valueToRollBack + CARDS_GAP + magicNumber

        return values.push(-lastPosition)
      }
      values.push(-offsetXUntilCurrentFocus);
    })

    setSnapPoints(values);
    offsetX.value = CARDS_GAP;
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
            offsetX={offsetX}
            ownPosition={snapPoints[i] ?? 0}
          />
        ))}

      </Animated.View>
    </GestureDetector>
  )
}