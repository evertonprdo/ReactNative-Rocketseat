import { Dimensions, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@routes/app.routes";
import HomeScreenTemplate from "src/templates/HomeScreenTemplate";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, 'product'>;

export default function Product({ navigation, route }: Props) {
  const { height } = Dimensions.get("screen")
  const Insets = useSafeAreaInsets();

  const ScreenHeight = height - Insets.top

  return (
    <HomeScreenTemplate
      headerComponent={(
        <View style={{ height: 500, backgroundColor: "red" }} />
      )}
      stickyBodyComponent={(
        <View style={{ height: 100, backgroundColor: "pink" }} />
      )}
    >
      <View style={{ height: ScreenHeight / 1.2, backgroundColor: "blue" }} />
      <View style={{ height: ScreenHeight / 1.2, backgroundColor: "green" }} />
    </HomeScreenTemplate>
  )
}