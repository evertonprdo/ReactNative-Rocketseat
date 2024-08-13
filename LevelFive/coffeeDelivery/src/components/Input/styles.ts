import { Colors } from "@styles/colors"
import { Fonts } from "@styles/fonts"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		gap: 8,
		backgroundColor: Colors.gray[200],
		borderRadius: 4,
		borderWidth: 1,
	},
	field: {
		flex: 1,
		fontFamily: Fonts.Roboto.regular,
		color: Colors.gray[700],
		fontSize: Fonts.Roboto.sm
	},
})

export default styles