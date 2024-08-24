import { Colors } from "@styles/colors";
import { Fonts } from "@styles/fonts";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.gray[100], flex: 1 },
  navBar: {
    flexDirection: "row",
    paddingHorizontal: 32,
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },
  infoContainer: {
    width: "100%",
    paddingHorizontal: 32,
    gap: 20,
    marginBottom: 32
  },
  mainContainer: {
    flexDirection: "row",
    gap: 2,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },

  title: { gap: 12 },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
    color: Colors.white,
    fontSize: Fonts.TagFontStyle.fontSize,
    borderRadius: 9999,
    backgroundColor: Colors.gray[200]
  },
  coffeeName: { color: Colors.white },

  priceContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "baseline"
  },
  price: { color: Colors.app.yellow },

  description: { color: Colors.gray[500] },

  footer: {
    flex: 1,
    paddingTop: 42,
    paddingHorizontal: 32,
    gap: 20,
    backgroundColor: Colors.gray[900],
  },
  selection: {
    gap: 8
  },
  selectionHeader: {
    fontFamily: Fonts.Roboto.regular,
    fontSize: Fonts.Roboto.sm,
  },
  options: {
    flexDirection: "row",
    gap: 8,
    width: "100%"
  },
  addToCartContainer: {
    flexDirection: "row",

    width: "100%",
    gap: 16,
    padding: 8,
    borderRadius: 6,
    
    backgroundColor: Colors.gray[700],
  },
  buttonContainer: {
    flex: 1,
  }
})

export default styles