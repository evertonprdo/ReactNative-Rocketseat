import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Trash } from "phosphor-react-native";
import { SvgProps } from "react-native-svg";

import st from "./styles";
import { Colors } from "@styles/colors";
import { Heading, TextRegular } from "@components/Text";
import { InputNumber } from "@components/InputNumber";
import { InputNumberIcon } from "@components/InputNumberIcon";
import { useCart } from "@hooks/useCart";
import { CoffeeSizes, removeItemCart } from "@storage/cartStorage";

type Props = {
  id: number
  icon: React.FC<SvgProps>,
  title: string
  price: string
  amount: number
  size: CoffeeSizes
}

export function CartCard({ id, title, price, amount, size, icon: Icon }: Props) {
  const cartContext = useCart()
  const [count, setCount] = useState(amount)

  function handleOnDelete() {
    cartContext.deleteItem(id, size)
  }

  useEffect(() => {
    cartContext.updateItem({
      id,
      amount: count,
      coffee_size: size
    })
  }, [count])

  return (
    <Swipeable
      containerStyle={st.swipeableContainer}
      overshootRight={false}
      renderRightActions={() => null}
      renderLeftActions={() => (
        <View style={st.backContainer}>
          <Trash size={28} color={Colors.feedback.redDark} />
        </View>
      )}
      onSwipeableOpen={handleOnDelete}
    >
      <View style={st.container}>

        <Icon height={64} width={64} style={st.thumbnail} />

        <View style={st.info}>

          <View style={st.about}>

            <View style={st.header}>

              <TextRegular style={st.title} size="md">
                {title}
              </TextRegular>
              <TextRegular style={st.volume} size="sm">
                {size}
              </TextRegular>
            </View>

            <Heading size="sm" style={st.title}>
              R$ {price}
            </Heading>
          </View>

          <View style={st.actions}>
            <View style={st.inputNumber}>

              <InputNumber
                count={count}
                onCountChange={setCount}
              />

            </View>

            <InputNumberIcon variant="trash" onPress={handleOnDelete}/>
          </View>

        </View>
      </View>
    </Swipeable>
  )
}