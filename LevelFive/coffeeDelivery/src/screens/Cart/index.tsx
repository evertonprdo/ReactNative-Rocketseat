import { useState } from "react";
import { Image, Text, View } from "react-native";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import styles from "./styles";
import { HeaderCart } from "@components/HeaderCart";

import { RootStackParamList } from "@routes/app.routes";

const UpImgUri = "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
const DownImgUri = "https://images.nightcafe.studio/jobs/QFN6dBmJDqD8F6riDiTU/QFN6dBmJDqD8F6riDiTU--1--lh91l.jpg?tr=w-9999,c-at_max"

type Props = NativeStackScreenProps<RootStackParamList, 'cart'>;

export default function Cart({ navigation, route }: Props) {
  const pressed = useSharedValue(false);
  const [imgUri, setImgUri] = useState(UpImgUri)

  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  function handleIsUpChange() {
    setImgUri(UpImgUri)
  }

  function handleIsDownChange() {
    setImgUri(DownImgUri)
  }

  const tap = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      offsetX.value += event.changeX
      offsetY.value += event.changeY

      if (event.changeY < 0) {
        runOnJS(handleIsUpChange)()
      } else {
        runOnJS(handleIsDownChange)()
      }
    })
    .onFinalize(() => {
      offsetX.value = withSpring(0)
      offsetY.value = withSpring(0)
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: pressed.value ? "blue" : "red",
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
      { scale: withTiming(pressed.value ? 1.2 : 1) }
    ]
  }))

  return (
    <SafeAreaView style={styles.container}>
      <HeaderCart onPressIcon={() => navigation.goBack()}/>

      <GestureDetector gesture={tap}>
        <Animated.View style={[animatedStyles, styles.ball]} />
      </GestureDetector>

      <View>
        <Image
          width={250}
          height={250}
          source={{ uri: imgUri }}
          style={{ borderRadius: 10, marginBottom: 10 }}
        />
        <Text>Pan & Move Up or Down the ball</Text>
      </View>
    </SafeAreaView>
  )
}