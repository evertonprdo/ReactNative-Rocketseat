import { Pressable, PressableProps, View } from "react-native";

import st from "./styles"
import { Heading, TextRegular } from "@components/Text";

import type { CardProps } from "@components/HighlightCard";

type Props = Omit<CardProps, "category"> & PressableProps

export function CatalogCard({ description, icon: Icon, price, title }: Props) {
  return (
    <Pressable style={st.container}>
      <View style={st.thumbnail}>
        <Icon height={96} width={96} />
      </View>

      <View style={st.details}>
        <Heading
          style={st.title}
          size="sm"
        >
          {title}
        </Heading>

        <TextRegular style={st.description} size="xs">
          {description}
        </TextRegular>

        <View style={st.price}>
          <TextRegular
            size="sm"
            style={st.priceText}
          >
            R$
          </TextRegular>

          <Heading
            size="md"
            style={st.priceText}
          >
            {price}
          </Heading>
        </View>
      </View>
    </Pressable>
  )
}