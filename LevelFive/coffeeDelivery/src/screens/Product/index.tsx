import { Dimensions, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@routes/app.routes";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, 'product'>;

export default function Product({ navigation, route }: Props) {
  const { height } = Dimensions.get("screen")
  const Insets = useSafeAreaInsets();

  const ScreenHeight = height - Insets.top

  return (
    <></>
  )
}