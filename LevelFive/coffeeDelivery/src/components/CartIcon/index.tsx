import { Pressable, PressableProps, View } from "react-native";
import { ShoppingCart } from "phosphor-react-native";

import st from "./styles"
import { Colors } from "@styles/colors";
import { TextRegular } from "@components/Text";

type Props = PressableProps & {
	itemsCount?: number
}
export function CartIcon({ itemsCount, ...props }: Props) {
	const hasItemsInCart = itemsCount && itemsCount > 0
	const color = hasItemsInCart ? Colors.app.purpleDark : Colors.app.yellowDark

	return (
		<Pressable
			style={st.container}
			{...props}
		>
			<ShoppingCart size={20} color={color} weight="fill" />

			{hasItemsInCart &&
				<View style={st.circle}>
					<TextRegular
						style={st.number}
						size="xs"
					>
						{itemsCount}
					</TextRegular>
				</View>
			}
		</Pressable>
	)
}