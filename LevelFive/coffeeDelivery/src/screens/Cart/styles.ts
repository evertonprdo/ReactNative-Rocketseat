import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
});

export default styles