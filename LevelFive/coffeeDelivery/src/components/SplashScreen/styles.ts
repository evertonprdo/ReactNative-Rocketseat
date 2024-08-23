import { Colors } from "@styles/colors";
import { Dimensions, StyleSheet } from "react-native";

const ScreenDimensions = Dimensions.get("screen")
const purpleCircleSize = ScreenDimensions.width * 2.5

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.app.purpleDark
  },
  innerContainer: {
    height: purpleCircleSize,
    width: purpleCircleSize,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.app.purple,
    borderRadius: 9999
  },
})

export default styles