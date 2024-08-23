import { StyleSheet } from "react-native";
import { Colors } from "@styles/colors";
import { Fonts } from "@styles/fonts";

export const CARD_WIDTH = 208

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,

    alignItems: "center",

    gap: 14,
    paddingVertical: 16,
    paddingRight: 16,
    paddingLeft: 8,

    backgroundColor: Colors.gray[800],

    borderRadius: 6,
    borderColor: Colors.gray[700],
    borderWidth: 1,
    borderTopRightRadius: 36,
    borderBottomLeftRadius: 36,

    elevation: 1
  },
  thumbnail: {
    height: 120,
    width: 120,
    marginTop: -48,
  },
  details: {
    gap: 4,
    alignItems: "center"
  },
  price: {
    flexDirection: 'row',
    alignItems: "baseline",
    gap: 4,
    marginTop: 2
  },

  tag: {
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: Colors.app.purpleDark,
    backgroundColor: Colors.app.purpleLight,
    textTransform: "uppercase",
    fontSize: Fonts.TagFontStyle.fontSize
  },
  priceText: {
    color: Colors.app.yellowDark
  },
  title: {
    color: Colors.gray[200],
    textAlign: "center",
    lineHeight: 25
  },
  description: {
    color: Colors.gray[400],
    textAlign: "center"
  }
})

export default styles