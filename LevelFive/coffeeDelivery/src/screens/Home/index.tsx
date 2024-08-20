import { useEffect, useState } from "react";
import { Dimensions, Image, Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowClockwise } from "phosphor-react-native";

import st from "./styles";

import { Input } from "@components/Input";
import { Heading } from "@components/Text";
import { Tag } from "@components/Tag";
import { Carousel } from "@components/Carousel";

import { RootStackParamList } from "@routes/app.routes";

import CoffeeBeans from "@assets/coffeeBeans.png"
import DATA, { coffeeSearchArray } from "@data/coffee";
import { CatalogCard } from "@components/CatalogCard";
import { TopBarHome } from "@components/TopBarHome";
import { Colors } from "@styles/colors";

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'home'>;

const initialArray = coffeeSearchArray.sort(() => 0.5 - Math.random()).slice(0, 5);
const { width, height } = Dimensions.get("window")

const HEADER_HEIGHT = 342
export const ANIMATION_CONFIG = {
  duration: 1750
}

export function Home({ navigation }: HomeScreenProps) {
  const [anime, setAnime] = useState(false)
  const Insets = useSafeAreaInsets();

  const marginTop = useSharedValue(-HEADER_HEIGHT)
  const marginLeft = useSharedValue(width)
  const paddingTop = useSharedValue(height - HEADER_HEIGHT - 300)

  const scrollY = useSharedValue(0)

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    marginTop: marginTop.value
  }))

  const carouselAnimatedStyle = useAnimatedStyle(() => ({
    marginLeft: marginLeft.value
  }))

  const catalogAnimatedStyle = useAnimatedStyle(() => ({
    paddingTop: paddingTop.value,
  }))

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    }
  })

  useEffect(() => {
    marginTop.value = -HEADER_HEIGHT
    marginLeft.value = width
    paddingTop.value = height - HEADER_HEIGHT + 100

    marginTop.value = withTiming(0, ANIMATION_CONFIG)
    marginLeft.value = withDelay(200, withTiming(0, ANIMATION_CONFIG))
    paddingTop.value = withDelay(400, withTiming(0, ANIMATION_CONFIG))
  }, [anime])

  return (
    <View style={{ flex: 1 }}>

      <TopBarHome interpolateValue={scrollY} onCartPress={() => navigation.navigate("cart")} anime={anime} />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        <Animated.View style={[st.intro, headerAnimatedStyle, { paddingTop: Insets.top + 50 }]}>

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

        <Animated.View style={carouselAnimatedStyle}>
          <Carousel
            navigation={navigation}
            coffeeArray={initialArray}
          />
        </Animated.View>

        <Animated.View style={[{ flex: 1 }, catalogAnimatedStyle]}>
          <View style={st.sectionHeader}>
            <Heading
              size="sm"
              style={st.sectionTitle}
            >
              Nossos cafés
            </Heading>

            <View style={st.sectionFilter}>
              <Tag>Tradicionais</Tag>
              <Tag>Doces</Tag>
              <Tag>Especiais</Tag>
            </View>
          </View>

          <View style={st.catalogContainer}>
            {
              DATA.map((section) => (
                <View key={section.title} style={{ gap: 32 }}>
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
                    />
                  ))}
                </View>
              ))
            }
          </View>

        </Animated.View>

        <Pressable
          onPress={() => setAnime(!anime)}
          style={{ position: "absolute", height: 50, width: 50, right: 15, top: 777, borderRadius: 100, backgroundColor: "green", justifyContent: "center", alignItems: 'center' }}
        >
          <ArrowClockwise color="white" />
        </Pressable>
      </Animated.ScrollView>
    </View>
  )
}