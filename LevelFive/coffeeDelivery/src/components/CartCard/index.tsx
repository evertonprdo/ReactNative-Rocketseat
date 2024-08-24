import { useEffect, useState } from "react";
import { View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Trash } from "phosphor-react-native";
import { SvgProps } from "react-native-svg";

import st from "./styles";
import { Colors } from "@styles/colors";
import { Heading, TextRegular } from "@components/Text";
import { InputNumber } from "@components/InputNumber";
import { InputNumberIcon } from "@components/InputNumberIcon";

type Props = {
	icon: React.FC<SvgProps>,
	title: string
	price: string
	amount: React.MutableRefObject<number>
	size: string
}

export function CartCard({ title, price, amount, size, icon: Icon }: Props) {
	const [count, setCount] = useState(amount.current)

	useEffect(() => {
		amount.current = count
	}, [count])
	return (
		<Swipeable
			containerStyle={st.swipeableContainer}
			overshootRight={false}
			renderRightActions={() => null}
			renderLeftActions={() => (
				<View style={st.backContainer}>
					<Trash size={28} color={Colors.feedback.redDark} />
				</View>
			)}
		>
			<View style={st.container}>

				<Icon height={64} width={64} style={st.thumbnail} />

				<View style={st.info}>

					<View style={st.about}>

						<View style={st.header}>

							<TextRegular style={st.title} size="md">
								{title}
							</TextRegular>
							<TextRegular style={st.volume} size="sm">
								{size}
							</TextRegular>
						</View>

						<Heading size="sm" style={st.title}>
							R$ {price}
						</Heading>
					</View>

					<View style={st.actions}>
						<View style={st.inputNumber}>

							<InputNumber
								count={count}
								onCountChange={setCount}
							/>

						</View>

						<InputNumberIcon variant="trash" />
					</View>

				</View>
			</View>
		</Swipeable>
	)
}