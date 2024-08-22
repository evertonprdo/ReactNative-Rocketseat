import { useEffect, useState } from "react";
import { Dimensions, Image, View, StatusBar, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated, { interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { ArrowClockwise } from "phosphor-react-native";

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

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'home'>;

const ScreenDimensions = Dimensions.get("screen")
const initialArray = coffeeSearchArray.sort(() => 0.5 - Math.random()).slice(0, 5);

export function Home({ navigation }: HomeScreenProps) {
  const [anime, setAnime] = useState(false)

  const [statusBarStyle, setStatusBarStyle] = useState(false);
  const [isIntroFinished, setIsIntroFinished] = useState(false)

  const scrollY = useSharedValue(0);

  const traditionalSV = useSharedValue(true);
  const sweetSV = useSharedValue(false);
  const specialSV = useSharedValue(false);

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

  function handleOnScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    scrollY.value = event.nativeEvent.contentOffset.y

    if (scrollY.value < 1200) {
      if (traditionalSV.value) return

      specialSV.value = false
      sweetSV.value = false

      traditionalSV.value = true
      return
    }
    
    if (scrollY.value < 1750) {
      if (sweetSV.value) return

      traditionalSV.value = false
      specialSV.value = false

      sweetSV.value = true
      return
    }
    
    if (specialSV.value) return

    traditionalSV.value = false
    sweetSV.value = false

    specialSV.value = true
  }

  function handleOnScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (event.nativeEvent.contentOffset.y > 300) {
      return setStatusBarStyle(true)
    }
    return setStatusBarStyle(false)
  }

  useEffect(() => {
    bannerHeight.value = 0
    carouselMargin.value = ScreenDimensions.width
    setIsIntroFinished(false)

    const localDuration = DURATION * 2
    bannerHeight.value = withDelay(DURATION, withTiming(100, { duration: localDuration }))
    carouselMargin.value = withDelay(DURATION * 1.2, withTiming(0, { duration: localDuration },
      () => runOnJS(setIsIntroFinished)(true)
    ))
  }, [anime])

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle={statusBarStyle ? "dark-content" : "light-content"}
        backgroundColor={"transparent"}
        translucent
      />

      <Pressable
        onPress={() => setAnime(!anime)}
        style={{ position: "absolute", height: 50, width: 50, right: 15, bottom: 15, borderRadius: 100, backgroundColor: "green", justifyContent: "center", alignItems: 'center', zIndex: 30 }}
      >
        <ArrowClockwise color="white" />
      </Pressable>

      <TopBarHome
        interpolateValue={scrollY}
        onCartPress={() => navigation.navigate("cart")}
        anime={anime}
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

        <Animated.View
          style={[st.carouselContainer, {
            marginLeft: carouselMargin,
            marginBottom: carouselMargin
          }]}
        >
          <Carousel
            navigation={navigation}
            coffeeArray={coffeeSearchArray}
          />
        </Animated.View>

        <View style={st.filterContainer}>
          <Heading size="sm" style={st.filtersTitle}>
            Nossos cafés
          </Heading>

          <View style={st.filterOptionsContainer}>

            <Tag isActive={traditionalSV}>Tradicionais</Tag>
            <Tag isActive={sweetSV}>Doces</Tag>
            <Tag isActive={specialSV}>Especiais</Tag>

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