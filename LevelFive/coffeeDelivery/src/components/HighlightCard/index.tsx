import { Pressable, View } from "react-native";
import st from "./styles";

import CooffeeSvg from "@assets/coffees/Irlandes.svg"
import { Baloo2, Regular, TagText } from "@components/Text";

export function HighlightCard() {
	return (
		<Pressable style={st.container}>
			<View style={st.thumbnail}>
				<CooffeeSvg width={120} height={120} />
			</View>

			<TagText style={st.tag}>
				Especial
			</TagText>

			<View style={st.details}>
				<Baloo2
					size="md"
					style={st.title}
				>
					Irlandês
				</Baloo2>

				<Regular
					size="xs"
					style={st.description}
				>
					Bebida a base de café, uísque irlandês, açúcar e chantilly
				</Regular>
			</View>

			<View style={st.price}>
				<Regular
					size="sm"
					style={st.priceText}
				>
					R$
				</Regular>
				<Baloo2
					size="lg"
					style={st.priceText}
				>
					9,90
				</Baloo2>
			</View>
		</Pressable>
	)
}