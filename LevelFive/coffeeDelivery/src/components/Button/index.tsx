import { ButtonText } from "@components/Text";
import { Colors } from "@styles/colors";
import { Pressable } from "react-native";
import st from "./styles";
import { useState } from "react";

type Variants = "yellow" | "purple"
type Props = {
	children?: string
	variant?: Variants
}

const purpleColors = [Colors.app.purpleDark, Colors.app.purple]
const yellowColors = [Colors.app.yellowDark, Colors.app.yellow]

export function Button({ children, variant = "purple" }: Props) {
	const [isPressedIn, setIsPressedIn] = useState(false);
	const bgColors = variant === "purple" ? purpleColors : yellowColors

	const backgroundColor = isPressedIn ? bgColors[1] : bgColors[0]
	
	return (
		<Pressable
			style={[st.container, { backgroundColor }]}
			onPressIn={() => setIsPressedIn(true)}
			onPressOut={() => setIsPressedIn(false)}
		>
			<ButtonText style={st.text}>
				{children}
			</ButtonText>
		</Pressable>
	)
}