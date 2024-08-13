import { Colors } from "@styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",

		paddingHorizontal: 32,
		paddingVertical: 16,
		gap: 20,

		backgroundColor: Colors.gray[900],
		borderColor: Colors.gray[700],
		borderBottomWidth: 1,
	},
	thumbnail: {},
	info: {
		flex: 1,
		gap: 8
	},
	about: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between"
	},
	header: {
		flex: 1,
		gap: 2,
	},
	actions: {
		flexDirection: "row",
		gap: 8
	},
	inputNumber: {
		borderRadius: 6,
		borderWidth: 1,
		borderColor: Colors.gray[600]
	},
	swipeableContainer: {
		backgroundColor: Colors.feedback.redLight,
	},
	backContainer: {
		flex: 1,
		paddingHorizontal: 32,
		paddingVertical: 16,
		justifyContent: "center"
	},

	title: {
		color: Colors.gray[100]
	},
	volume: {
		color: Colors.gray[400]
	},
})

export default styles