import { Pressable, PressableProps, Text } from "react-native";
import st from "./styles";
import { Colors } from "@styles/colors";
import { Fonts } from "@styles/fonts";

type Props = PressableProps & {
	active?: boolean
}
export function Select({ active, ...props }: Props) {
	const backgroundColor = active ? "transparent" : Colors.gray[700]
	const borderColor = active ? Colors.app.purple : "transparent"

	const fontWeight = active ? "bold" : "regular"
	const color = active ? Colors.app.purple : Colors.gray[300]

	return (
		<Pressable
			style={[
				st.container,
				{ backgroundColor, borderColor }
			]}
			{...props}
		>
			<Text style={{
				fontSize: Fonts.Roboto.sm,
				fontWeight,
				color
			}}>
				Label
			</Text>
		</Pressable>
	)
}