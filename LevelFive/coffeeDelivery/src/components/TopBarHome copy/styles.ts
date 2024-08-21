import { StyleSheet } from "react-native";
import { Fonts } from "@styles/fonts";

const styles = StyleSheet.create({
  navbarContainer: {

  },
  innerNavbarContainer: {
    width: "100%",
    flexDirection: 'row',

    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 32
  },
  location: {
    flexDirection: "row",
    gap: 4
  },
  locationTitle: {
    fontFamily: Fonts.Roboto.regular,
    fontSize: Fonts.Roboto.sm,
  },
})

export default styles