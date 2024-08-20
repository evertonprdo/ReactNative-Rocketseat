import { StyleSheet } from "react-native";
import { Fonts } from "@styles/fonts";

const styles = StyleSheet.create({
  navbarContainer: {
    flex: 1,
    flexDirection: 'row',

    alignItems: "center",
    justifyContent: "space-between",

    paddingBottom: 8,
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