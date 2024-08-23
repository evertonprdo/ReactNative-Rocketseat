import { StyleSheet } from "react-native";

const heightOfGreatestSmoke = 136
const imageMarginTop = -75

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: -55,

    zIndex: 10,
  },
  smokeContainer: {
    justifyContent: "flex-end",
    height: heightOfGreatestSmoke
  },
  image: { marginTop: imageMarginTop }
})

export default styles