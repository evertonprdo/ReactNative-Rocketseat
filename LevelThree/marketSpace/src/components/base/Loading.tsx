import { ActivityIndicator, type ActivityIndicatorProps } from "react-native";
import { colors } from "@theme/colors";

export function Loading({...props}: ActivityIndicatorProps) {
    return (
        <ActivityIndicator
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
            color={colors.gray[300]}
            {...props}
        />
    )
}