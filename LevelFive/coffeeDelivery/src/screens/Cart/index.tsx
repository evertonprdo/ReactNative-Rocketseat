import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import st from "./styles";

import { Colors } from "@styles/colors";
import { FlatList, View } from "react-native";
import { Heading, TextRegular } from "@components/Text";
import { CartCard } from "@components/CartCard";
import { Button } from "@components/Button";
import { PressableArrowLeft } from "@components/PressableArrowLeft";

import { RootStackParamList } from "@routes/app.routes";

import { useCart } from "@hooks/useCart";

type Props = NativeStackScreenProps<RootStackParamList, 'cart'>;

export default function Cart({ navigation, route }: Props) {
  const { cart } = useCart()
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
        data={cart.items}
        keyExtractor={item => `Coffee_${item.id}_${item.coffee_size}`}
        renderItem={({ item }) => (
          <CartCard
            icon={item.icon}
            title={item.title}
            size={item.coffee_size}
            price={(item.price / 100).toFixed(2).replace('.', ',')}
            amount={item.amount}
          />
        )}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      />

      <View style={st.order}>
        <View style={st.orderInfo}>
          <TextRegular size="md">
            Valor total
          </TextRegular>

          <Heading size="md">R$ {(cart.total_amount / 100).toFixed(2).replace('.', ',')}</Heading>
        </View>

        <Button>
          Corfirmar pedido
        </Button>
      </View>
    </SafeAreaView>
  )
}