import { useEffect, useState } from "react";
import { Dimensions, Image, View, StatusBar } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated, { Extrapolation, interpolate, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import st, { BANNER_HEIGHT, CAROUSEL_HEIGHT, BANNER_MARGIN_BOTTOM } from "./styles";

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

const { width, height } = Dimensions.get("window")

const MARGIN_TOP_FILTER = 32
export const ANIMATION_CONFIG = {
  duration: 1750
}

const initialArray = coffeeSearchArray.sort(() => 0.5 - Math.random()).slice(0, 5);

export function Home({ navigation }: HomeScreenProps) {
  const Insets = useSafeAreaInsets();

  const [filters, setFilters] = useState({
    "Tradicionais": true,
    "Doces": true,
    "Especiais": true,
  })
  const [statusBarStyle, setStatusBarStyle] = useState(false);

  const initialFilterTop = BANNER_HEIGHT + CAROUSEL_HEIGHT + BANNER_MARGIN_BOTTOM - Insets.top - MARGIN_TOP_FILTER

  const marginTop = useSharedValue(-BANNER_HEIGHT);
  const marginLeft = useSharedValue(width);
  const paddingTop = useSharedValue(height);

  const scrollY = useSharedValue(0);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    marginTop: marginTop.value
  }))

  const carouselAnimatedStyle = useAnimatedStyle(() => ({
    marginLeft: marginLeft.value
  }))

  const catalogAnimatedStyle = useAnimatedStyle(() => ({
    paddingTop: paddingTop.value,
  }))

  const filterAnimatedStyle = useAnimatedStyle(() => ({
    marginTop: paddingTop.value + Insets.top + MARGIN_TOP_FILTER,
    top: interpolate(scrollY.value, [0, 350], [initialFilterTop, 0], Extrapolation.CLAMP),
    zIndex: interpolate(scrollY.value, [0, 400], [0, 20], Extrapolation.CLAMP),
    elevation: interpolate(scrollY.value, [100, 400], [0, 3], Extrapolation.CLAMP)
  }))

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
    onMomentumEnd: (event) => {
      scrollY.value = event.contentOffset.y

      'worklet'
      if (event.contentOffset.y > 300) {
        runOnJS(setStatusBarStyle)(true)
      } else {
        runOnJS(setStatusBarStyle)(false)
      }
    }
  })

  function handleFilterPress(key: keyof typeof filters) {
    const newFiltersStatus = {
      ...filters,
      [key]: !filters[key]
    }

    if (!Object.values(newFiltersStatus).includes(true)) return

    setFilters(newFiltersStatus)
  }

  useEffect(() => {
    marginTop.value = withTiming(0, ANIMATION_CONFIG)
    marginLeft.value = withDelay(200, withTiming(0, ANIMATION_CONFIG))
    paddingTop.value = withDelay(400, withTiming(0, ANIMATION_CONFIG))
  }, [])

  return (
    <View style={{ flex: 1 }}>

      <TopBarHome interpolateValue={scrollY} onCartPress={() => navigation.navigate("cart")} />

      <Animated.View style={[st.filterContainer, filterAnimatedStyle]}>
        <View style={st.innerFilterContainer}>
          <Heading
            size="sm"
            style={st.sectionTitle}
          >
            Nossos cafés
          </Heading>

          <View style={st.sectionFilter}>
            {(Object.keys(filters) as Array<keyof typeof filters>).map((title) => (
              <Tag
                key={title}
                active={filters[title]}
                onPress={() => handleFilterPress(title)}
              >
                {title}
              </Tag>
            ))}
          </View>

        </View>
      </Animated.View>

      <Animated.ScrollView
        style={{ flex: 1, zIndex: 1 }}
        contentContainerStyle={{ minHeight: height * 2 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        decelerationRate={"fast"}
      >
        <StatusBar
          barStyle={statusBarStyle ? "dark-content" : "light-content"}
          backgroundColor={"transparent"}
          translucent
        />

        <Animated.View style={[st.banner, headerAnimatedStyle, { paddingTop: Insets.top + 50 }]}>

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

        <Animated.View style={[carouselAnimatedStyle, st.carouselContainer]}>
          <Carousel
            navigation={navigation}
            coffeeArray={initialArray}
          />
        </Animated.View>

        <Animated.View style={[{ flex: 1 }, catalogAnimatedStyle]}>
          <View style={st.catalogContainer}>
            {
              DATA.map((section) => (
                <View
                  key={section.title}
                  style={{ gap: 32, display: filters[section.title as keyof typeof filters] ? "flex" : "none" }}
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
        </Animated.View>
      </Animated.ScrollView>
    </View>
  )
}