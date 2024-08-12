import { Colors } from "@styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		height: 120,
		flexDirection: "row",
		alignItems: "flex-start",
		
		gap: 12,
		paddingVertical: 16,
		paddingRight: 16,
		paddingLeft: 8,

		backgroundColor: Colors.gray[800],

		borderRadius: 6,
		borderColor: Colors.gray[700],
		borderWidth: 1,
		borderTopRightRadius: 36,
		borderBottomLeftRadius: 36,
	},
	thumbnail: {
		height: 96,
		width: 96,
		marginTop: -32,

	},
	details: {
		flex: 1,
		gap: 4
	},
	price: {
		flexDirection: 'row',
		alignItems: "baseline",
		gap: 4,
		marginTop: 2
	},

	priceText: {
		color: Colors.app.yellowDark
	},
	title: {
		color: Colors.gray[200]
	},
	description: {
		color: Colors.gray[400]
	}
})

export default styles