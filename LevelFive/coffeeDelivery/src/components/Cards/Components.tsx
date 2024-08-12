import { Baloo2Props, RobotoProps, Text } from "@components/Text";
import { Colors } from "@styles/colors";
import { Pressable, PressableProps, View, ViewProps } from "react-native";

function Root({ style, children, ...props }: PressableProps) {
	return (
		<Pressable
			{...props}
		>
			{children}
		</Pressable>
	)
}

function Container({ children, ...props }: ViewProps) {
	const biggerRadius = 36

	return (
		<View
			style={{
				flexDirection: "row",
				backgroundColor: Colors.gray[800],
				borderRadius: 6,
				borderTopRightRadius: biggerRadius,
				borderBottomLeftRadius: biggerRadius,
				padding: 16,
				paddingLeft: 0,
			}}
			{...props}
		>
			{children}
		</View>
	)
}

function Thumbnail({ children, ...props }: ViewProps) {
	return (
		<View style={{ flexDirection: 'row' }} {...props}>
			{children}
		</View>
	)
}

function Details({ children, ...props }: ViewProps) {
	return (
		<View
			style={{

			}}
			{...props}
		>
			{children}
		</View>
	)
}

function Price({ children, ...props }: ViewProps) {
	return (
		<View style={{ flexDirection: 'row' }} {...props}>
			{children}
		</View>
	)
}

function Title({ children, ...props }: Baloo2Props) {
	return (
		<Text.Baloo2 size="sm" {...props}>
			{children}
		</Text.Baloo2>
	)
}

function Description({ children, ...props }: RobotoProps) {
	return (
		<Text.Regular size="xs" {...props}>
			{children}
		</Text.Regular>
	)
}

function Currency({ children, ...props }: RobotoProps) {
	return (
		<Text.Regular size="xs" {...props}>
			{children}
		</Text.Regular>
	)
}

function Value({ children, ...props }: RobotoProps) {
	return (
		<Text.Regular size="xs" {...props}>
			{children}
		</Text.Regular>
	)
}

Root.Container = Container
Root.Details = Details
Root.Thumbnail = Thumbnail
Root.Price = Price

Root.Title = Title
Root.Description = Description
Root.Currency = Currency
Root.Value = Value

export default Root