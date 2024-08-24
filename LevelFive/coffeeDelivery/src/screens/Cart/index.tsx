import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import st from "./styles";
import { coffeeSearchArray } from "@data/coffee"

import { RootStackParamList } from "@routes/app.routes";
import { FlatList, View } from "react-native";
import { Colors } from "@styles/colors";
import { Heading, TextRegular } from "@components/Text";
import { CartCard } from "@components/CartCard";
import { useRef } from "react";
import { Button } from "@components/Button";
import { PressableArrowLeft } from "@components/PressableArrowLeft";

type Props = NativeStackScreenProps<RootStackParamList, 'cart'>;

const fakeCart = coffeeSearchArray.slice(0, 3)

export default function Cart({ navigation, route }: Props) {
  const amountRef = useRef(3)

  return (
    <SafeAreaView style={st.container}>
      <View style={st.navBar}>
        <PressableArrowLeft onPress={() => navigation.goBack()} color={Colors.gray[100]} />

        <Heading size="sm">
          Carrinho
        </Heading>

        <View style={st.emptyView} />
      </View>

      <FlatList
        data={fakeCart}
        keyExtractor={item => `Coffee_${item.id}`}
        renderItem={({item}) => (
          <CartCard
            icon={item.icon}
            title={item.title}
            size="227ml"
            price={(item.price / 100).toFixed(2).replace('.',',')}
            amount={amountRef}
          />
        )}
        contentContainerStyle={{ flex: 1 }}
        style={{ flex: 1 }}
      />

      <View style={st.order}>
        <View style={st.orderInfo}>
          <TextRegular size="md">
            Valor total
          </TextRegular>

          <Heading size="md">R$ 9,90</Heading>
        </View>

        <Button>
          Corfirmar pedido
        </Button>
      </View>
    </SafeAreaView>
  )
}