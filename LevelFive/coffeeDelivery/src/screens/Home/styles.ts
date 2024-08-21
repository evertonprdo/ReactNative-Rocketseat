import { Colors } from "@styles/colors";
import { StyleSheet } from "react-native";

export const BANNER_HEIGHT = 400
export const CAROUSEL_HEIGHT = 300
export const FILTER_HEIGHT = 100
export const BANNER_MARGIN_BOTTOM = -70

const styles = StyleSheet.create({
  banner: {
    backgroundColor: Colors.gray[100],
    paddingBottom: 50,
    paddingHorizontal: 32,
    marginBottom: BANNER_MARGIN_BOTTOM,
    height: BANNER_HEIGHT,
  },
  titleContainer: {
    gap: 15,
    zIndex: 10,
    paddingTop: 58
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
    height: FILTER_HEIGHT,
    width: "100%",
    
    position: "absolute",

    backgroundColor: Colors.gray[900],
  },
  innerFilterContainer: {
    flex: 1,
    gap: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
    justifyContent: "flex-end",
  },
  sectionFilter: {
    flexDirection: "row",
    gap: 8,
  },
  sectionTitle: {
    color: Colors.gray[300]
  },

  catalogContainer: {
    marginTop: FILTER_HEIGHT,
    paddingHorizontal: 32,
    gap: 48,
    paddingBottom: 50
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