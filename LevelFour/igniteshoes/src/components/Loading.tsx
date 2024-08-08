import { ActivityIndicator, View } from "react-native";

export function Loading() {
    return (
        <View className="items-center justify-center flex-1">
            <ActivityIndicator className="color-green-500"/>
        </View>
    )
}