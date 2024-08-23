import { Pressable, PressableProps, View } from "react-native";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { SvgProps } from "react-native-svg";

import st, { CARD_WIDTH } from "./styles";
import { Heading, TextRegular, TextBold } from "@components/Text";

export type CardProps = {
  title: string,
  description: string
  price: string
  category: string
  icon: React.FC<SvgProps>,
}

type Props = PressableProps & CardProps & {
  ownPosition: number,
  offsetX: SharedValue<number>
}

const CARD_SCALE_ON_FOCUS = 1
export const CARD_SCALE_ON_BLUER = 0.8

export const CARD_WIDTH_ON_BLUER = CARD_WIDTH * CARD_SCALE_ON_BLUER

const MARGIN_FIX_ON_BLUER = (CARD_WIDTH_ON_BLUER - CARD_WIDTH ) / 2
const DESVIATION = Math.round(CARD_WIDTH_ON_BLUER / 2 - MARGIN_FIX_ON_BLUER)

export function HighlightCard({ category, description, price, ownPosition, title, offsetX, icon: IconSvg, ...rest }: Props) {
  const inputRange = [ownPosition - DESVIATION, ownPosition, ownPosition + DESVIATION]

  const animatedStyle = useAnimatedStyle(() => ({
    marginHorizontal: interpolate(
      offsetX.value,
      inputRange,
      [MARGIN_FIX_ON_BLUER, 0, MARGIN_FIX_ON_BLUER],
      Extrapolation.CLAMP
    ),

    transform: [{
      scale: interpolate(
        offsetX.value,
        inputRange,
        [CARD_SCALE_ON_BLUER, CARD_SCALE_ON_FOCUS, CARD_SCALE_ON_BLUER],
        Extrapolation.CLAMP
      )
    }]
  }))

  return (
    <Pressable {...rest}>

      <Animated.View style={[st.container, animatedStyle]}>

        <View style={st.thumbnail}>
          <IconSvg width={120} height={120} />
        </View>

        <TextBold style={st.tag}>
          {category}
        </TextBold>

        <View style={st.details}>
          <Heading
            size="md"
            style={st.title}
          >
            {title}
          </Heading>

          <TextRegular
            size="xs"
            style={st.description}
          >
            {description}
          </TextRegular>
        </View>

        <View style={st.price}>
          <TextRegular
            size="sm"
            style={st.priceText}
          >
            R$
          </TextRegular>
          <Heading
            size="lg"
            style={st.priceText}
          >
            {price}
          </Heading>
        </View>
      </Animated.View>

    </Pressable>
  )
}