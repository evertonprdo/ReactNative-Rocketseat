import { ActivityIndicator, type ActivityIndicatorProps } from "react-native";

export function Loading({...props}: ActivityIndicatorProps) {
    return (
        <ActivityIndicator
            {...props}
        />
    )
}