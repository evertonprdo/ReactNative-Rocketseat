import { Text as RNText, TextProps } from "react-native";
import { Baloo2SizesType, RobotoSizesType, Fonts } from "@styles/fonts";

export type Baloo2Props = TextProps & {
	size?: Baloo2SizesType
}
export type RobotoProps = TextProps & {
	size?: RobotoSizesType
}

function Baloo2({ style, size = "md", children, ...props }: Baloo2Props) {
	return (
		<RNText
			style={[
				{
					fontFamily: Fonts.Baloo2.bold,
					fontSize: Fonts.Baloo2[size]
				},
				style
			]}
			{...props}
		>
			{children}
		</RNText>
	)
}

function Bold({ style, size = "md", children, ...props }: RobotoProps) {
	return (
		<RNText
			style={[
				{
					fontFamily: Fonts.Roboto.bold,
					fontSize: Fonts.Roboto[size]
				},
				style
			]}
			{...props}
		>
			{children}
		</RNText>
	)
}

function Regular({ style, size = "md", children, ...props }: RobotoProps) {
	return (
		<RNText
			style={[
				{
					fontFamily: Fonts.Roboto.regular,
					fontSize: Fonts.Roboto[size]
				},
				style
			]}
			{...props}
		>
			{children}
		</RNText>
	)
}

function Tag({ style, children, ...props }: TextProps) {
	return (
		<RNText
			style={[
				{ ...Fonts.TagFontStyle },
				style
			]}
			{...props}
		>
			{children}
		</RNText>
	)
}

function Button({ style, children, ...props }: TextProps) {
	return (
		<RNText
			style={[
				{ ...Fonts.ButtonFontStyle },
				style
			]}
			{...props}
		>
			{children}
		</RNText>
	)
}

export const Text = { Baloo2, Bold, Regular, Button, Tag }