import { View, Image as RNImage } from "react-native";

import CoffeePng from "@assets/productCoffe.png"

import st from "./styles";
import { Canvas, Image, useAnimatedImageValue } from "@shopify/react-native-skia";

export function AnimatedCoffee() {
  const smoke = useAnimatedImageValue(
    require("@assets/Smoke.gif")
  );
  console.log(smoke)
  return (
    <View style={st.container}>

      <Canvas style={st.smokeContainer}>
        <Image
          image={smoke}
          width={86}
          height={137}
          fit="cover"
        />
      </Canvas>

      <RNImage
        source={CoffeePng}
        height={260}
        width={295}
        resizeMode="contain"
      />
    </View>
  )
}