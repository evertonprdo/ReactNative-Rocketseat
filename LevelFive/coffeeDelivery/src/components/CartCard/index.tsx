import { View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Trash } from "phosphor-react-native";

import CoffeeSvg from "@assets/coffees/Arabe.svg"

import st from "./styles";
import { Colors } from "@styles/colors";
import { Heading, TextRegular } from "@components/Text";
import { InputNumber } from "@components/InputNumber";
import { PressableIcon } from "@components/PressableIcon";

export function CartCard() {
	return (
		<Swipeable
			containerStyle={st.swipeableContainer}
			overshootRight={false}
			renderRightActions={() => null}
			renderLeftActions={() => (
				<View style={st.backContainer}>
					<Trash size={28} color={Colors.feedback.redDark}/>
				</View>
			)}
		>
			<View style={st.container}>

				<CoffeeSvg height={64} width={64} style={st.thumbnail} />

				<View style={st.info}>

					<View style={st.about}>

						<View style={st.header}>

							<TextRegular style={st.title} size="md">Irlandês</TextRegular>
							<TextRegular style={st.volume} size="sm">227ml</TextRegular>
						</View>

						<Heading size="sm" style={st.title}>
							R$ 9,90
						</Heading>
					</View>

					<View style={st.actions}>
						<View style={st.inputNumber}>
							<InputNumber />
						</View>

						<PressableIcon variant="trash" />
					</View>

				</View>
			</View>
		</Swipeable>
	)
}