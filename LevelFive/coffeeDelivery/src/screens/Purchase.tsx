import { useCallback } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@routes/app.routes";
import { useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";

import DeliverySvg from "@assets/delivery.svg"
import { Heading, TextRegular } from "@components/Text";
import { Colors } from "@styles/colors";
import { Button } from "@components/Button";
import Animated, { FadeIn, SlideInLeft } from "react-native-reanimated";

type Props = NativeStackScreenProps<RootStackParamList, 'purchase'>;

export default function Purchase({ navigation, route }: Props) {
  async function playAudio() {
    const file = require('@assets/motorcycle.mp3')

    const { sound } = await Audio.Sound.createAsync(file, { shouldPlay: true })
    await sound.setPositionAsync(0);
    await sound.playAsync();
  }

  useFocusEffect(useCallback(() => {
    playAudio()
  }, []))
  
  return (
    <View style={{ justifyContent: "center", flex: 1, padding: 64 }}>
      <View style={{ alignItems: "center", marginBottom: 64 }}>

        <Animated.View entering={SlideInLeft.duration(1750)}>
          <DeliverySvg style={{ marginBottom: 40 }} />
        </Animated.View>

        <Animated.View entering={FadeIn.duration(1500).delay(500)}>
          <Heading size="lg" style={{ color: Colors.app.yellowDark, marginBottom: 8 }}>Uhu! Pedido confirmado</Heading>

          <TextRegular size="sm" style={{ color: Colors.gray[200], textAlign: "center" }}>Agora é só aguardar que logo o café{"\n"} chegará até você!</TextRegular>
        </Animated.View>
      </View>

      <Animated.View entering={FadeIn.duration(1500).delay(500)}>
        <Button onPress={navigation.popToTop}>Ir para a home</Button>
      </Animated.View>
    </View>
  )
}