import { useState } from "react";
import { View } from "react-native";

import st from "./styles"
import { PressableIcon } from "@components/PressableIcon";
import { Regular } from "@components/Text";

export function InputNumber() {
	const [count, setCount] = useState(0);

	function handleOnPressPlus() {
		if(count === 99) return
		setCount(count + 1)
	}

	function handleOnPressMinus() {
		if(count === 0) return
		setCount(count - 1)
	}
	return (
		<View style={st.container}>
			<PressableIcon
				variant="minus"
				onPress={handleOnPressMinus}
			/>

			<Regular
				size="md"
				style={st.number}
			>
				{count}
			</Regular>

			<PressableIcon
				variant="plus"
				onPress={handleOnPressPlus}
			/>
		</View>
	)
}