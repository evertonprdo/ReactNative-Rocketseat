import { Colors } from "@styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		alignSelf: "flex-start",

		paddingHorizontal: 12,
		paddingVertical: 6,

		borderRadius: 9999,
		borderWidth: 1,
		borderColor: Colors.app.purple
	}
})

export default styles