import { View, Image } from "react-native";

import CoffeePng from "@assets/productCoffe.png"
import SmokeGif from "@assets/Smoke.gif"

import st from "./styles";

export function AnimatedCoffee() {

  return (
    <View style={st.container}>
      <Image
        source={SmokeGif}
        resizeMode="contain"
        style={st.smokeContainer}
      />

      <Image
        source={CoffeePng}
        height={260}
        width={295}
        resizeMode="contain"
      />
    </View>
  )
}