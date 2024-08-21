import { useEffect } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { Easing, interpolate, interpolateColor, SharedValue, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { MapPin } from "phosphor-react-native";

import { Colors } from "@styles/colors";
import st from "./styles";
import { CartIcon } from "@components/CartIcon";

type Props = {
  //onCartPress: () => void
  interpolateValue: SharedValue<number>
  anime?: boolean
}

const ScrollInputRange = [50, 300]
const DELAY = 500
const Duration = 1750

export function TopBarHome({interpolateValue }: Props) {
  const Insets = useSafeAreaInsets();
  const top = useSharedValue(-73);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      width: "100%",
      paddingTop: Insets.top,

      borderBottomWidth: 1,

      borderBottomColor: interpolateColor(interpolateValue.value, ScrollInputRange, [Colors.gray[100], Colors.gray[900]]),
      backgroundColor: interpolateColor(interpolateValue.value, ScrollInputRange, [Colors.gray[100], Colors.gray[900]]),
    }
  });

  const animatedInnerStyle = useAnimatedStyle(() => ({
    paddingVertical: interpolate(interpolateValue.value, ScrollInputRange, [20, 8]),
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(interpolateValue.value, ScrollInputRange, [Colors.gray[800], Colors.gray[100]])
  }));

  useEffect(() => {
    top.value = withDelay(DELAY, withTiming(0, { duration: Duration - DELAY, easing: Easing.sin }))
  }, []);

  return (
    <Animated.View style={animatedContainerStyle}>
      <Animated.View style={[animatedInnerStyle, st.innerNavbarContainer]}>

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
        <CartIcon/>

      </Animated.View>
    </Animated.View>
  )
}