import { Colors } from "@styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		padding: 8
	},
	circle: {
		position: "absolute",
		height: 20,
		width: 20,
		top: -8,
		right: -8,

		backgroundColor: Colors.app.purple,
		
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 9999,
		zIndex: 10
	},
	number: {
		color: Colors.white,
	}
})

export default styles