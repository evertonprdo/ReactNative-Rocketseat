import { useState } from "react";
import { Pressable, PressableProps } from "react-native";
import { Minus, Plus, Trash } from "phosphor-react-native";

import st from "./styles"
import { Colors } from "@styles/colors";

const plusLessColors = [Colors.gray[700], "transparent"]
const removeColors = [Colors.gray[600], Colors.gray[700]]

type Variants = "plus" | "trash" | "minus"

type Props = PressableProps & {
	variant?: Variants
}

export function PressableIcon({ variant = "plus", ...props }: Props) {
	const [isPressedIn, setIsPressedIn] = useState(false);
	const isPlusOrLess = variant === "plus" || variant === "minus"

	const bgColors = isPlusOrLess ? plusLessColors : removeColors
	const weight = isPlusOrLess ? "bold" : "regular"

	const color = isPressedIn ? Colors.app.purple : Colors.app.purpleDark
	const backgroundColor = isPressedIn ? bgColors[0] : bgColors[1]

	const Icon = !isPlusOrLess ? Trash : variant === "plus" ? Plus : Minus
	
	return (
		<Pressable
			style={[st.container, { backgroundColor }]}
			onPressIn={() => setIsPressedIn(true)}
			onPressOut={() => setIsPressedIn(false)}
			{...props}
		>
			<Icon size={20} color={color} weight={weight} />
		</Pressable>
	)
}