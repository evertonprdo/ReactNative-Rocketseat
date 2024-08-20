import { Colors } from "@styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  intro: {
    backgroundColor: Colors.gray[100],
    paddingBottom: 50,
    paddingHorizontal: 32,
    marginBottom: -70,
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

  // ==================== //

  sectionHeader: {
    gap: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  sectionFilter: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 32
  },
  sectionTitle: {
    color: Colors.gray[300]
  },

  // ==================== //

  catalogContainer: {
    paddingHorizontal: 32,
    gap: 48,
    paddingBottom: 50
  }
})

export default styles