import { useEffect } from "react";
import { Pressable, PressableProps, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SvgProps } from "react-native-svg";

import st from "./styles";
import { Heading, TextRegular, TextBold } from "@components/Text";

export type CardProps = {
  title: string,
  description: string
  price: string
  category: string
  icon: React.FC<SvgProps>
}

type Props = PressableProps & CardProps & {
  isCurrentFocus?: boolean
}

const ON_FOCUS_SCALE = 1
const ON_BLUER_SCALE = 0.8

export function HighlightCard({ isCurrentFocus, category, description, price, title, icon: IconSvg, ...rest }: Props) {
  const isOnFocus = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    marginHorizontal: isOnFocus.value ? 0 : -21,
    transform: [{ scale: withTiming(isOnFocus.value ? ON_FOCUS_SCALE : ON_BLUER_SCALE) }]
  }))

  useEffect(() => {
    isOnFocus.value = isCurrentFocus ?? false
  }, [isCurrentFocus])

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