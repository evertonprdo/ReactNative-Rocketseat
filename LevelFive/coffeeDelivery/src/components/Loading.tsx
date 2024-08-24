import { Colors } from "@styles/colors";
import { ActivityIndicator, ActivityIndicatorProps, StyleSheet } from "react-native";

type Props = ActivityIndicatorProps

export function Loading({ ...rest }: Props) {
  return (
    <ActivityIndicator
      color={Colors.app.yellow}
      style={styles.loading}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: Colors.gray[100],
    justifyContent: "center",
    alignItems: "center"
  }
})