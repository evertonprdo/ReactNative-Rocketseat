import { TouchableOpacityProps } from "react-native";
import { Check, ClockClockwise } from "phosphor-react-native"
import { Container, Departure, Info, LicensePlate } from "./styles";
import { useTheme } from "styled-components/native";

export type HistoricCardProps = {
	id: string
	licensePlate: string
	created: string
	isSync: boolean
}

type Props = TouchableOpacityProps & {
	data: HistoricCardProps
}

export function HistoricCard({ data, ...rest }: Props) {
	const { COLORS } = useTheme();
	
	const Icon = data.isSync ? Check : ClockClockwise
	const IconColor = data.isSync ? COLORS.BRAND_LIGHT : COLORS.GRAY_400

	return (
		<Container activeOpacity={0.7} {...rest}>
			<Info>
				<LicensePlate>
					{data.licensePlate}
				</LicensePlate>

				<Departure>
					{data.created}
				</Departure>
			</Info>

			<Icon
				size={24}
				color={IconColor}
			/>
		</Container>
	)
}