import { Pressable, PressableProps, View } from "react-native";
import { ShoppingCart } from "phosphor-react-native";

import st from "./styles"
import { Colors } from "@styles/colors";
import { Regular } from "@components/Text";

type Props = PressableProps & {
	itemsCount?: number
}
export function Cart({ itemsCount, ...props }: Props) {
	const color = itemsCount && itemsCount > 0 ? Colors.app.purpleDark : Colors.app.yellowDark

	return (
		<Pressable
			style={st.container}
			{...props}
		>
			<ShoppingCart size={20} color={color} weight="fill" />
			
			<View style={st.circle}>
				<Regular
					style={st.number}
					size="xs"
				>
					{itemsCount}
				</Regular>
			</View>
		</Pressable>
	)
}