import { StyleSheet } from "react-native";
import { Fonts } from "@styles/fonts";

const styles = StyleSheet.create({
  navbarContainer: {
    width: "100%",
    borderBottomWidth: 1,
  },
  innerNavbarContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 32,
    
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