import { useEffect, useState } from "react";
import { Dimensions, Image, View, StatusBar, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

import st, { BANNER_HEIGHT } from "./styles";

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

export const ANIMATION_CONFIG = {
  duration: 1750
}

const initialArray = coffeeSearchArray.sort(() => 0.5 - Math.random()).slice(0, 5);

export function Home({ navigation }: HomeScreenProps) {
  const [filters, setFilters] = useState({
    "Tradicionais": true,
    "Doces": true,
    "Especiais": true,
  })
  const [statusBarStyle, setStatusBarStyle] = useState(false);

  const marginTop = useSharedValue(-BANNER_HEIGHT);
  const marginLeft = useSharedValue(width);
  const paddingTop = useSharedValue(height);

  const scrollY = useSharedValue(0);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(scrollY.value, [50, 300], [Colors.gray[100], Colors.gray[900]]),
    marginTop: marginTop.value
  }))

  const carouselAnimatedStyle = useAnimatedStyle(() => ({
    marginLeft: marginLeft.value
  }))

  const catalogAnimatedStyle = useAnimatedStyle(() => ({
    paddingTop: paddingTop.value,
  }))

  function handleFilterPress(key: keyof typeof filters) {
    const newFiltersStatus = {
      ...filters,
      [key]: !filters[key]
    }

    if (!Object.values(newFiltersStatus).includes(true)) return

    setFilters(newFiltersStatus)
  }

  function handleOnScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (event.nativeEvent.contentOffset.y > 300) {
      return setStatusBarStyle(true)
    }
    return setStatusBarStyle(false)
  }

  useEffect(() => {
    marginTop.value = withTiming(0, ANIMATION_CONFIG)
    marginLeft.value = withDelay(200, withTiming(0, ANIMATION_CONFIG))
    paddingTop.value = withDelay(400, withTiming(0, ANIMATION_CONFIG))
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.gray[100] }}>
      <StatusBar
        barStyle={statusBarStyle ? "dark-content" : "light-content"}
        backgroundColor={"transparent"}
        translucent
      />

      <TopBarHome interpolateValue={scrollY} onCartPress={() => navigation.navigate("cart")} />

      <ScrollView
        onScroll={(event) => scrollY.value = event.nativeEvent.contentOffset.y}
        onMomentumScrollEnd={handleOnScrollEnd}
        stickyHeaderIndices={[2]}
        showsVerticalScrollIndicator={false}
        decelerationRate={"fast"}
        contentContainerStyle={{ backgroundColor: Colors.gray[900] }}
      >

        <Animated.View style={[st.banner, headerAnimatedStyle]}>

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


        <View style={st.filterContainer}>

          <Heading
            size="sm"
            style={st.filtersTitle}
          >
            Nossos cafés
          </Heading>

          <View style={st.filterOptionsContainer}>
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
      </ScrollView>
    </View>
  )
}