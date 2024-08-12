import { Colors } from "@styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		width: 208,
		alignItems: "center",

		gap: 14,
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
		height: 120,
		width: 120,
		marginTop: -48,
	},
	details: {
		gap: 4,
		alignItems: "center"
	},
	price: {
		flexDirection: 'row',
		alignItems: "baseline",
		gap: 4,
		marginTop: 2
	},

	tag: {
		borderRadius: 100,
		paddingHorizontal: 8,
		paddingVertical: 4,
		color: Colors.app.purpleDark,
		backgroundColor: Colors.app.purpleLight
	},
	priceText: {
		color: Colors.app.yellowDark
	},
	title: {
		color: Colors.gray[200],
	},
	description: {
		color: Colors.gray[400],
		textAlign: "center"
	}
})

export default styles