import { StyleSheet } from "react-native";

const heightOfGreatestSmoke = 137
const smokeMarginBottom = -77

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: -52,

    zIndex: 10,
  },
  smokeContainer: {
    width: "100%",
    height: heightOfGreatestSmoke,
    overflow: 'hidden',
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: smokeMarginBottom,
    opacity: 0.2
  },
})

export default styles