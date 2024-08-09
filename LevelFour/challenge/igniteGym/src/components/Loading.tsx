import { ActivityIndicator } from "react-native";
import { colors } from "@theme/colors";

export function Loading() {
    return (
        <ActivityIndicator color={colors.green[500]} className="bg-gray-700 flex-1 justify-center items-center"/>
    )
}