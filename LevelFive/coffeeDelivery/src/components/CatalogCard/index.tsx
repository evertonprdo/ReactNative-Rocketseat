import { Pressable, View } from "react-native";

import st from "./styles"
import { Heading, TextRegular } from "@components/Text";
import CooffeSvg from "@assets/coffees/Expresso.svg"

export function CatalogCard() {
	return (
		<Pressable style={st.container}>
			<View style={st.thumbnail}>
				<CooffeSvg height={96} width={96} />
			</View>

			<View style={st.details}>
				<Heading
					style={st.title}
					size="sm"
				>
					Expresso Tradicional
				</Heading>

				<TextRegular style={st.description} size="xs">
					O tradicional café feito com água quente e grãos moídos
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
						9,90
					</Heading>
				</View>
			</View>
		</Pressable>
	)
}