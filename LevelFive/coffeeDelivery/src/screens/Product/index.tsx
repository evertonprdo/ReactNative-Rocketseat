import { useCallback, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "phosphor-react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

import { Colors } from "@styles/colors";
import { coffeeSearchArray } from "@data/coffee"

import st from "./styles";
import { CartIcon } from "@components/CartIcon";
import { Heading, TextBold, TextRegular } from "@components/Text";
import { AnimatedCoffee } from "@components/AnimatedCoffee";
import { Select, ALERT_ANIMATION_CONFIG } from "@components/Select";
import { InputNumber } from "@components/InputNumber";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";

import { RootStackParamList } from "@routes/app.routes";

type Props = NativeStackScreenProps<RootStackParamList, 'product'>;

const COFFEE_SIZES = ["114ml", "140ml", "227ml"]

export default function Product({ navigation, route }: Props) {
  const { id: queryId } = route.params

  const [isLoadingCoffee, setIsLoadingCoffee] = useState(true);
  const [alertFlag, setAlertFlag] = useState(false)
  const [coffeeSize, setCoffeeSize] = useState<String | null>(null)

  const [coffee, setCoffee] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  })

  const buttonAnimatedStyles = useAnimatedStyle(() => ({
    opacity: coffeeSize === null ? 0.3 : withTiming(1)
  }))

  const textAnimatedStyles = useAnimatedStyle(() => ({
    color: coffeeSize === null && alertFlag
      ? withTiming(Colors.feedback.redDark, ALERT_ANIMATION_CONFIG)
      : withTiming(Colors.gray[400])
  }))

  function handleOnAddToCart() {
    if (coffeeSize === null) {
      setAlertFlag(true)
      return
    }
  }

  useFocusEffect(useCallback(() => {
    setIsLoadingCoffee(true)

    const { title, category, description, price } = coffeeSearchArray.filter(coffee => coffee.id === queryId)[0]

    const formatedCoffee = {
      title,
      category: category.toUpperCase(),
      description,
      price: (price / 100).toFixed(2).replace('.', ',')
    }

    setCoffee(formatedCoffee)
    setIsLoadingCoffee(false)
  }, [queryId]))

  useEffect(() => {
    if (coffeeSize) setAlertFlag(false)
  }, [coffeeSize])

  if (isLoadingCoffee) return <Loading />

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
              {coffee.category}
            </TextBold>

            <Heading size="lg" style={st.coffeeName}>
              {coffee.title}
            </Heading>
          </View>

          <View style={st.priceContainer}>
            <TextRegular size="sm" style={st.price}>R$</TextRegular>
            <Heading size="xl" style={st.price}>
              {coffee.price}
            </Heading>
          </View>
        </View>

        <TextRegular style={st.description} size="md">
          {coffee.description}
        </TextRegular>
      </View>

      <AnimatedCoffee />

      <View style={st.footer}>
        <View style={st.selection}>

          <Animated.Text style={[st.selectionHeader, textAnimatedStyles]}>
            Selecione o tamanho:
          </Animated.Text>

          <View style={st.options}>
            {COFFEE_SIZES.map(size => (
              <Select
                key={size}
                isActive={coffeeSize === size}
                onPress={() => setCoffeeSize(size)}
                aletFlag={alertFlag}
              >
                {size}
              </Select>
            ))}
          </View>
        </View>

        <View style={st.addToCartContainer}>
          <InputNumber />

          <Animated.View style={[buttonAnimatedStyles, st.buttonContainer]}>
            <Button onPress={handleOnAddToCart}>
              Adicionar
            </Button>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  )
}