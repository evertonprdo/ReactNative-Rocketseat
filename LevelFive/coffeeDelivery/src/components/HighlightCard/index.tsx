import { Pressable, View } from "react-native";
import st from "./styles";

import CooffeeSvg from "@assets/coffees/Irlandes.svg"
import { Heading, TextRegular, TextBold} from "@components/Text";

type Props = {
	onPress: () => void
}

export function HighlightCard({ onPress }: Props) {
	return (
		<Pressable style={st.container} onPress={onPress}>
			<View style={st.thumbnail}>
				<CooffeeSvg width={120} height={120} />
			</View>

			<TextBold style={st.tag}>
				Especial
			</TextBold>

			<View style={st.details}>
				<Heading
					size="md"
					style={st.title}
				>
					Irlandês
				</Heading>

				<TextRegular
					size="xs"
					style={st.description}
				>
					Bebida a base de café, uísque irlandês, açúcar e chantilly
				</TextRegular>
			</View>

			<View style={st.price}>
				<TextRegular
					size="sm"
					style={st.priceText}
				>
					R$
				</TextRegular>
				<Heading
					size="lg"
					style={st.priceText}
				>
					9,90
				</Heading>
			</View>
		</Pressable>
	)
}