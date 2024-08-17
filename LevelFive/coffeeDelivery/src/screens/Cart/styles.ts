import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'blue',
    position: "absolute",
    transform: [{ translateX: -50 }]
  },

  container: {
    flex: 1,
    marginTop: 100,
    justifyContent: "center"
  }
});

export default styles