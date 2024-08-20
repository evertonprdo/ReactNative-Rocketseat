import { useEffect } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { Easing, interpolate, interpolateColor, SharedValue, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { MapPin } from "phosphor-react-native";

import st from "./styles";
import { CartIcon } from "@components/CartIcon";
import { Colors } from "@styles/colors";

type Props = {
  onCartPress: () => void
  interpolateValue: SharedValue<number>
  anime?: boolean
}

const ScrollInputRange = [0, 300]
const DELAY = 500
const Duration = 1750

export function TopBarHome({ onCartPress, interpolateValue, anime }: Props) {
  const Insets = useSafeAreaInsets();
  const top = useSharedValue(-73);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      zIndex: 50,

      width: "100%",
      top: top.value,
      paddingTop: Insets.top,

      borderBottomWidth: 1,

      borderBottomColor: interpolateColor(interpolateValue.value, ScrollInputRange, [Colors.gray[100], Colors.gray[900]]),
      backgroundColor: interpolateColor(interpolateValue.value, ScrollInputRange, [Colors.gray[100], Colors.gray[900]]),
    }
  });

  const animatedInnerStyle = useAnimatedStyle(() => ({
    paddingTop: interpolate(interpolateValue.value, ScrollInputRange, [20, 8]),
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(interpolateValue.value, ScrollInputRange, [Colors.gray[800], Colors.gray[100]])
  }));

  useEffect(() => {
    top.value = -73
    top.value = withDelay(DELAY, withTiming(0, { duration: Duration - DELAY, easing: Easing.sin }))
  }, [anime]);

  return (
    <Animated.View style={animatedContainerStyle}>
      <Animated.View style={[animatedInnerStyle, st.navbarContainer]}>

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