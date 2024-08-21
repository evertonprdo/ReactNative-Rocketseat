import { Colors } from "@styles/colors";
import { Dimensions, StyleSheet } from "react-native";

export const BANNER_HEIGHT = 400
export const CAROUSEL_HEIGHT = 300
export const BANNER_MARGIN_BOTTOM = -70

const styles = StyleSheet.create({
  banner: {
    paddingBottom: 50,
    paddingHorizontal: 32,
    marginBottom: BANNER_MARGIN_BOTTOM,
  },
  titleContainer: {
    gap: 15,
    zIndex: 10,
    paddingTop: 10
  },
  title: {
    color: Colors.white
  },
  coffeeBeans: {
    alignSelf: "flex-end",
    marginRight: -28
  },

  carouselContainer: {
    height: CAROUSEL_HEIGHT
  },

  filterContainer: {
    width: "100%",
    justifyContent: "flex-end",

    paddingHorizontal: 32,
    paddingVertical: 16,

    backgroundColor: Colors.gray[900],
  },
  filterOptionsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  filtersTitle: {
    color: Colors.gray[300],
    marginBottom: 12
  },

  catalogContainer: {
    paddingHorizontal: 32,
    gap: 48,
    paddingBottom: 100,
  },

  tempButton: {
    position: "absolute",
    height: 50,
    width: 50,
    right: 15,
    bottom: 15,
    borderRadius: 100,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: 'center',
    zIndex: 30 
  }
})

export default styles