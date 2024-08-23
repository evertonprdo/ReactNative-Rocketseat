import { Pressable, PressableProps, Text } from "react-native";
import st from "./styles";
import { Colors } from "@styles/colors";
import { Fonts } from "@styles/fonts";

type Props = PressableProps & {
	isActive?: boolean
	children?: React.ReactNode
}
export function Select({ isActive, children, ...props }: Props) {
	const backgroundColor = isActive ? "transparent" : Colors.gray[700]
	const borderColor = isActive ? Colors.app.purple : "transparent"

	const fontWeight = isActive ? "bold" : "regular"
	const color = isActive ? Colors.app.purple : Colors.gray[300]

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
				{children}
			</Text>
		</Pressable>
	)
}