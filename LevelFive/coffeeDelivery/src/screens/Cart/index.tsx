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
import { EmptyCart } from "@components/EmptyCart";

type Props = NativeStackScreenProps<RootStackParamList, 'cart'>;

export default function Cart({ navigation, route }: Props) {
  const { cart, onFinishPurchase } = useCart()

  function onPressConfim() {
    onFinishPurchase()

    navigation.navigate("purchase")
  }

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
        key={cart.lenght}
        data={cart.items}
        keyExtractor={item => `Coffee_${item.id}_${item.coffee_size}`}
        renderItem={({ item }) => (
          <CartCard
            id={item.id}
            icon={item.icon}
            title={item.title}
            size={item.coffee_size}
            price={(item.price * item.amount / 100).toFixed(2).replace('.', ',')}
            amount={item.amount}
          />
        )}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <EmptyCart onPress={navigation.popToTop}/>}
      />

      {cart.lenght > 0 &&
        <View style={st.order}>
          <View style={st.orderInfo}>
            <TextRegular size="md">
              Valor total
            </TextRegular>

            <Heading size="md">R$ {(cart.total_amount / 100).toFixed(2).replace('.', ',')}</Heading>
          </View>

          <Button onPress={onPressConfim}>
            Corfirmar pedido
          </Button>
        </View>
      }
    </SafeAreaView>
  )
}