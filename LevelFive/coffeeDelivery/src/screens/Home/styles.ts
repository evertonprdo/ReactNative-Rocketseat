import { Colors } from "@styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	navbarContainer: {
		flexDirection: 'row',

		paddingVertical: 20,

		alignItems: "center",
		justifyContent: "space-between"
	},
	location: {
		flexDirection: "row",
		gap: 4
	},
	locationTitle: {
		color: Colors.gray[900]
	},

	// ==================== //

	intro: {
		backgroundColor: Colors.gray[100],
		gap: -55,
		height: 342,
		paddingHorizontal: 32,
	},
	titleContainer: {
		gap: 15,
		zIndex: 10
	},
	title: {
		color: Colors.white
	},
	coffeeBeans: {
		alignSelf: "flex-end",
		marginRight: -28
	},

	// ==================== //

	carrosel: {
		marginTop: -84,
		zIndex: 30
	},
	contentCarrosel: {
		gap: 32,
		paddingHorizontal: 32,
		paddingTop: 28,
		zIndex: 30,

	},

	// ==================== //

	sectionHeader: {
		gap: 12,
		paddingHorizontal: 32,
		paddingVertical: 16
	},
	sectionFilter: {
		flexDirection: "row",
		gap: 8
	},
	sectionTitle: {}
})

export default styles