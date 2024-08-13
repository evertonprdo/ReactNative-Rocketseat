import { useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { MagnifyingGlass } from "phosphor-react-native";

import st from "./styles";
import { Colors } from "@styles/colors";

export function Input({ value, ...props }: TextInputProps) {
	const [isOnFocus, setIsOnFocus] = useState(false);
	const isInputFill = value && value.length > 0

	const iconColor =
		isOnFocus
			? Colors.app.yellow
			: isInputFill
				? Colors.app.yellowDark
				: Colors.gray[400]

	const borderColor = isInputFill || isOnFocus ? Colors.gray[300] : "transparent"

	return (
		<View style={[st.container, { borderColor }]}>
			<MagnifyingGlass size={16} color={iconColor} />

			<TextInput
				style={st.field}
				cursorColor={Colors.gray[400]}
				placeholderTextColor={Colors.gray[400]}
				onFocus={() => setIsOnFocus(true)}
				onBlur={() => setIsOnFocus(false)}
				{...props}
			/>
		</View>
	)
}