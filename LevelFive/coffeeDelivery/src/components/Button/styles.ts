import { Colors } from "@styles/colors";
import { Fonts } from "@styles/fonts";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		borderRadius: 6,
		paddingHorizontal: 8,
		paddingVertical: 12,
		alignItems: "center",
		justifyContent: "center"
	},
	text: {
		color: Colors.white,
		fontSize: Fonts.ButtonFontStyle.fontSize,
		textTransform: "uppercase"
	}
})

export default styles