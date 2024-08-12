import { Pressable, View } from "react-native";

import st from "./styles"
import { Baloo2, Regular } from "@components/Text";
import CooffeSvg from "@assets/coffees/Expresso.svg"

export function CatalogCard() {
	return (
		<Pressable style={st.container}>
			<View style={st.thumbnail}>
				<CooffeSvg height={96} width={96} />
			</View>

			<View style={st.details}>
				<Baloo2
					style={st.title}
					size="sm"
				>
					Expresso Tradicional
				</Baloo2>

				<Regular style={st.description} size="xs">
					O tradicional café feito com água quente e grãos moídos
				</Regular>

				<View style={st.price}>
					<Regular
						size="sm"
						style={st.priceText}
					>
						R$
					</Regular>

					<Baloo2
						size="md"
						style={st.priceText}
					>
						9,90
					</Baloo2>
				</View>
			</View>
		</Pressable>
	)
}