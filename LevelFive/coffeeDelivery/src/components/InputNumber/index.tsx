import { useState } from "react";
import { View } from "react-native";

import st from "./styles"
import { PressableIcon } from "@components/PressableIcon";
import { TextRegular } from "@components/Text";

export function InputNumber() {
	const [count, setCount] = useState(1);

	function handleOnPressPlus() {
		if(count === 99) return
		setCount(count + 1)
	}

	function handleOnPressMinus() {
		if(count === 1) return
		setCount(count - 1)
	}
	return (
		<View style={st.container}>
			<PressableIcon
				variant="minus"
				onPress={handleOnPressMinus}
			/>

			<TextRegular
				size="md"
				style={st.number}
			>
				{count}
			</TextRegular>

			<PressableIcon
				variant="plus"
				onPress={handleOnPressPlus}
			/>
		</View>
	)
}