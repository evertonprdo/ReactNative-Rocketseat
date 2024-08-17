import { Pressable, PressableProps } from "react-native";

import { Colors } from "@styles/colors";
import { Fonts } from "@styles/fonts";

import st from "./styles";
import { TextBold } from "@components/Text";

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
			<TextBold style={{ color, fontSize: Fonts.TagFontStyle.fontSize }}>
				{children}
			</TextBold>
		</Pressable>
	)
}