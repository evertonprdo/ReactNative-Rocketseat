import { useState } from "react";
import { Pressable, PressableProps } from "react-native";

import { Colors } from "@styles/colors";

import st from "./styles";
import { TextBold } from "@components/Text";

type Variants = "yellow" | "purple"
type Props = PressableProps & {
	children?: string
	variant?: Variants
}

const purpleColors = [Colors.app.purpleDark, Colors.app.purple]
const yellowColors = [Colors.app.yellowDark, Colors.app.yellow]

export function Button({ children, variant = "purple", ...props }: Props) {
	const [isPressedIn, setIsPressedIn] = useState(false);
	const bgColors = variant === "purple" ? purpleColors : yellowColors

	const backgroundColor = isPressedIn ? bgColors[1] : bgColors[0]
	
	return (
		<Pressable
			style={[st.container, { backgroundColor }]}
			onPressIn={() => setIsPressedIn(true)}
			onPressOut={() => setIsPressedIn(false)}
			{...props}
		>
			<TextBold style={st.text}>
				{children}
			</TextBold>
		</Pressable>
	)
}