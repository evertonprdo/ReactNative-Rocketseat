import { Colors } from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: 32,
    paddingVertical: 26,

    borderBottomWidth: 1,
    borderColor: Colors.gray[700]
  },
  emptyView: {
    width: 24,
    height: 24
  },

  order: {
    width: '100%',
    paddingHorizontal: 32,
    paddingBottom: 40,
    paddingTop: 28,
    gap: 20,
    backgroundColor: Colors.white,
    elevation: 8
  },
  orderInfo: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "baseline"
  },
});

export default styles