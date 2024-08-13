import { Pressable, PressableProps } from "react-native";

import st from "./styles";
import { Colors } from "@styles/colors";
import { TagText } from "@components/Text";

type Props = PressableProps & {
	active?: boolean
	children?: React.ReactNode 
}
export function Tag({ active, children, ...props }: Props) {
	const backgroundColor = active ?  Colors.app.purpleDark : "transparent"
	const color = active ? Colors.white : Colors.app.purpleDark

	return (
		<Pressable
			style={[
				st.container,
				{ backgroundColor }
			]}
			{...props}
		>
			<TagText style={{ color }}>
				{children}
			</TagText>
		</Pressable>
	)
}