import { useEffect, useState } from "react";
import { Dimensions, Image, View, StatusBar, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated, { interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

import { Colors } from "@styles/colors";
import st from "./styles";

import { Input } from "@components/Input";
import { Heading } from "@components/Text";
import { Tag } from "@components/Tag";
import { Carousel } from "@components/Carousel";
import { CatalogCard } from "@components/CatalogCard";
import { TopBarHome, DURATION } from "@components/TopBarHome";

import { RootStackParamList } from "@routes/app.routes";

import CoffeeBeans from "@assets/coffeeBeans.png"
import DATA, { coffeeSearchArray } from "@data/coffee";
import Toast from "react-native-toast-message";

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'home'>;

const EnteringDuration = DURATION * 2
const BottomEnteringDelay = DURATION * 1.4

const ScreenDimensions = Dimensions.get("screen")
const initialArray = coffeeSearchArray.sort(() => 0.5 - Math.random()).slice(0, 5);

export function Home({ navigation }: HomeScreenProps) {
  const [statusBarStyle, setStatusBarStyle] = useState(false);
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  const scrollY = useSharedValue(0);
  const currentSectionOnFocus = useSharedValue(0);

  const bannerHeight = useSharedValue(0);
  const carouselMargin = useSharedValue(ScreenDimensions.width);

  const bannerAnimationStyles = useAnimatedStyle(() => ({
    height: `${bannerHeight.value}%`,

    backgroundColor: interpolateColor(
      scrollY.value,
      [50, 300],
      [Colors.gray[100], Colors.gray[900]]
    )
  }))

  const carouselAnimationStyles = useAnimatedStyle(() => ({
    marginLeft: carouselMargin.value,
    marginBottom: carouselMargin.value
  }))

  function handleOnScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    scrollY.value = event.nativeEvent.contentOffset.y

    if (scrollY.value < 1200) {
      if (currentSectionOnFocus.value === 0) return

      currentSectionOnFocus.value = 0
      return
    }

    if (scrollY.value < 1750) {
      if (currentSectionOnFocus.value === 1) return

      currentSectionOnFocus.value = 1
      return
    }

    if (currentSectionOnFocus.value === 2) return

    currentSectionOnFocus.value = 2
  }

  function handleOnScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (event.nativeEvent.contentOffset.y > 300) {
      return setStatusBarStyle(true)
    }
    return setStatusBarStyle(false)
  }

  useEffect(() => {
    bannerHeight.value = withDelay(DURATION, withTiming(100, { duration: EnteringDuration }))

    carouselMargin.value = withDelay(BottomEnteringDelay, withTiming(0,
      { duration: EnteringDuration },
      (finished) => {
        'worklet'
        if (finished)
          runOnJS(setIsIntroFinished)(true)
      }
    ))
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle={statusBarStyle ? "dark-content" : "light-content"}
        backgroundColor={"transparent"}
        translucent
      />

      <TopBarHome
        interpolateValue={scrollY}
        onCartPress={() => navigation.navigate("cart")}
      />

      <ScrollView
        onScroll={handleOnScroll}
        onMomentumScrollEnd={handleOnScrollEnd}
        scrollEnabled={isIntroFinished}
        stickyHeaderIndices={[2]}
        overScrollMode="never"
        decelerationRate={"fast"}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={st.contentScrollView}
      >
        <View style={st.topContainer}>
          <Animated.View style={[st.banner, bannerAnimationStyles]}>

            <View style={st.titleContainer}>
              <Heading size="md" style={st.title}>
                Encontre o café perfeito para{"\n"}qualquer hora do dia
              </Heading>

              <Input
                placeholder="Pesquisar"
              />
            </View>

            <Image
              source={CoffeeBeans}
              width={83}
              height={83}
              style={st.coffeeBeans}
            />

          </Animated.View>
        </View>

        <Animated.View style={[st.carouselContainer, carouselAnimationStyles]}>
          <Carousel
            navigation={navigation}
            coffeeArray={initialArray}
          />
        </Animated.View>

        <View style={st.filterContainer}>
          <Heading size="sm" style={st.filtersTitle}>
            Nossos cafés
          </Heading>

          <View style={st.filterOptionsContainer}>

            <Tag currentFocus={currentSectionOnFocus} ownIndex={0} >Tradicionais</Tag>
            <Tag currentFocus={currentSectionOnFocus} ownIndex={1} >Doces</Tag>
            <Tag currentFocus={currentSectionOnFocus} ownIndex={2} >Especiais</Tag>

          </View>
        </View>

        <View style={st.catalogContainer}>
          {
            DATA.map((section) => (
              <View
                key={section.title}
                style={{ gap: 32 }}
              >
                <Heading size="sm" style={{ color: Colors.gray[400] }}>
                  {section.title}
                </Heading>

                {section.data.map((item) => (
                  <CatalogCard
                    key={item.id}
                    title={item.title}
                    price={(item.price / 100).toFixed(2).replace('.', ',')}
                    icon={item.icon}
                    description={item.description}
                    onPress={() => navigation.navigate("product", { id: item.id })}
                  />
                ))}
              </View>
            ))
          }
        </View>

      </ScrollView>
    </View>
  )
}