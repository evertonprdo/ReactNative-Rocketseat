import { Pressable, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@routes/app.routes";

import { Colors } from "@styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "phosphor-react-native";
import { CartIcon } from "@components/CartIcon";
import { Heading, TextBold, TextRegular } from "@components/Text";
import { AnimatedCoffee } from "@components/AnimatedCoffee";
import st from "./styles";
import { Select } from "@components/Select";
import { InputNumber } from "@components/InputNumber";
import { Button } from "@components/Button";

type Props = NativeStackScreenProps<RootStackParamList, 'product'>;

export default function Product({ navigation, route }: Props) {
  const { id } = route.params

  console.log(id)
  return (
    <SafeAreaView style={st.container}>

      <View style={st.navBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={Colors.white} />
        </Pressable>

        <CartIcon onPress={() => navigation.navigate("cart")} />
      </View>

      <View style={st.infoContainer}>
        <View style={st.mainContainer}>
          <View style={st.title}>

            <TextBold style={st.tag}>
              ESPECIAL
            </TextBold>

            <Heading size="lg" style={st.coffeeName}>Irlandês</Heading>
          </View>

          <View style={st.priceContainer}>
            <TextRegular size="sm" style={st.price}>R$</TextRegular>
            <Heading size="xl" style={st.price}>9,90</Heading>
          </View>
        </View>

        <TextRegular style={st.description} size="md">
          Bebida a base de café, uísque irlandês, açúcar e chantilly
        </TextRegular>
      </View>

      <AnimatedCoffee />

      <View style={st.footer}>
        <View style={st.selection}>
          <Text style={st.selectionHeader}>Selecione o tamanho:</Text>

          <View style={st.options}>
            <Select>114ml</Select>
            <Select>140ml</Select>
            <Select>227ml</Select>
          </View>
        </View>

        <View style={st.addToCartContainer}>
          <InputNumber/>
          <Button>Adicionar</Button>
        </View>
      </View>
    </SafeAreaView>
  )
}