import { Colors } from "@styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4
	},
	number: {
		color: Colors.gray[100],
		width: 20,
		textAlign: "center"
	}
})

export default styles