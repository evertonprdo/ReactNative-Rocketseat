import { FlatList, Image, ScrollView, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { MapPin } from "phosphor-react-native";

import CoffeeBeans from "@assets/coffeeBeans.png"

import st from "./styles";
import { Colors } from "@styles/colors";
import { CartIcon } from "@components/CartIcon";
import { Input } from "@components/Input";
import { HighlightCard } from "@components/HighlightCard";
import { Heading, TextRegular } from "@components/Text";
import { Tag } from "@components/Tag";

import { RootStackParamList } from "@routes/app.routes";
import { useState } from "react";
import { Carrosel } from "@components/Carrosel";

type Props = NativeStackScreenProps<RootStackParamList, 'home'>;

export function Home({ navigation, route }: Props) {
  const [currentFocus, setCurrentFocus] = useState(0);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={st.intro}>
        <SafeAreaView style={st.navbarContainer}>
          <View style={st.location}>
            <MapPin
              weight="fill"
              size={20}
              color={Colors.app.purpleDark}
            />

            <TextRegular
              size="sm"
              style={st.locationTitle}
            >
              Porto Alegre, RS
            </TextRegular>
          </View>

          <CartIcon onPress={() => navigation.navigate("cart")} />
        </SafeAreaView>

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
      </View>

      <Carrosel/>

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
    </ScrollView>
  )
}