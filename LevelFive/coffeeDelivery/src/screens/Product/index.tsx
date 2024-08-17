import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@routes/app.routes";

type Props = NativeStackScreenProps<RootStackParamList, 'product'>;

export default function Product({ navigation, route }: Props) {
  return null
}