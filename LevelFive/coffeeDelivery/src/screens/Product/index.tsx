import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { PressableArrowLeft } from "@components/PressableArrowLeft";

import { RootStackParamList } from "@routes/app.routes";
import { CoffeeSizes } from "@storage/cartStorage";

import { useCart } from "@hooks/useCart";
import Toast from "react-native-toast-message";
import { Audio } from "expo-av";

type Props = NativeStackScreenProps<RootStackParamList, 'product'>;

const COFFEE_SIZES: CoffeeSizes[] = ["114ml", "140ml", "227ml"]

export default function Product({ navigation, route }: Props) {
  const { id: queryId } = route.params
  const cart = useCart();

  const [isLoadingCoffee, setIsLoadingCoffee] = useState(true);
  const [alertFlag, setAlertFlag] = useState(false)
  const [coffeeSize, setCoffeeSize] = useState<CoffeeSizes | null>(null)
  const [amount, setAmount] = useState(1)

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

  async function playAudio(isGood: boolean) {
    const file = isGood ? require('@assets/correct.mp3') : require("@assets/wrong.mp3")

    const { sound } = await Audio.Sound.createAsync(file, { shouldPlay: true })
    await sound.setPositionAsync(0);
    await sound.playAsync();
  }

  async function handleOnAddToCart() {
    if (coffeeSize === null) {
      setAlertFlag(true)
      playAudio(false)
      return
    }

    try {
      await cart.addItem({
        id: queryId,
        coffee_size: coffeeSize,
        amount: amount,
      })

      Toast.show({
        type: "info",
        text1: coffee.title,
        text2: coffeeSize,
        onPress: () => navigation.navigate("cart")
      })

      playAudio(true)

      navigation.goBack()
    } catch (error) {
      console.log(error)
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
        <PressableArrowLeft onPress={() => navigation.goBack()} />

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
          <InputNumber
            count={amount}
            onCountChange={setAmount}
          />

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