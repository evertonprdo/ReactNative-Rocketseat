import { View } from "react-native";

import st from "./styles";
import { HighlightCard } from "@components/HighlightCard";

export function Carrosel() {
  return (
    <View style={st.container}>
      <HighlightCard onPress={() => { }} />
      <HighlightCard onPress={() => { }} />
      <HighlightCard onPress={() => { }} />
    </View>
  )
}