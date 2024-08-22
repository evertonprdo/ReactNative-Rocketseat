import { useEffect } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { Extrapolation, interpolate, interpolateColor, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { MapPin } from "phosphor-react-native";

import { Colors } from "@styles/colors";
import st from "./styles";
import { CartIcon } from "@components/CartIcon";

type Props = {
  onCartPress: () => void
  interpolateValue: SharedValue<number>
  anime?: boolean
}

const ScrollInputRange = [50, 300]
export const DURATION = 500

export function TopBarHome({ onCartPress, interpolateValue, anime }: Props) {
  const Insets = useSafeAreaInsets();

  const innerHeight = useSharedValue(0);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -innerHeight.value }],

    borderBottomColor: interpolateColor(
      interpolateValue.value,
      ScrollInputRange,
      [Colors.gray[100], Colors.gray[800]]
    ),

    backgroundColor: interpolateColor(
      interpolateValue.value,
      ScrollInputRange,
      [Colors.gray[100], Colors.gray[900]]
    ),
  }))

  const animatedInnerStyle = useAnimatedStyle(() => ({
    paddingVertical: interpolate(
      interpolateValue.value,
      ScrollInputRange, [20, 8],
      Extrapolation.CLAMP
    ),
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(interpolateValue.value, ScrollInputRange, [Colors.gray[800], Colors.gray[100]])
  }));

  useEffect(() => {
    innerHeight.value = 100
    innerHeight.value = withTiming(0, { duration: DURATION })
  }, [anime]);

  return (
    <Animated.View
      style={[
        st.navbarContainer,
        containerAnimatedStyle,
        { paddingTop: Insets.top }
      ]}
    >
      <Animated.View style={[st.innerNavbarContainer, animatedInnerStyle]}>

        <View style={st.location}>
          <MapPin
            weight="fill"
            size={20}
            color={Colors.app.purpleDark}
          />
          <Animated.Text style={animatedTextStyle}>
            Porto Alegre, RS
          </Animated.Text>
        </View>
        <CartIcon onPress={onCartPress} />

      </Animated.View>
    </Animated.View>
  )
}