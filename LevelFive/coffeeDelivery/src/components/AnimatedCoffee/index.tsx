import { Image, View } from "react-native";

import CoffeePng from "@assets/productCoffe.png"
import SmokeSvg from "@assets/smoke/Smoke4.svg"
import st from "./styles";

export function AnimatedCoffee() {
  return (
    <View style={st.container}>
      <View style={st.smokeContainer}>

        <SmokeSvg />
      </View>
      <Image
        source={CoffeePng}
        height={260}
        width={295}
        style={st.image}
        resizeMode="contain"
      />
    </View>
  )
}