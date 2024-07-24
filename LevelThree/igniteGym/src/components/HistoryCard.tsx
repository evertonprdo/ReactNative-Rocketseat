import { Text, View } from "react-native";

export function HistoryCard() {
    return (
        <View className="flex-row w-full px-5 py-4 mb-3 bg-gray-600 rounded-md items-center justify-between">
            <View className="mr-5 flex-1">
                <Text
                    className="text-gray-100 font-bold capitalize"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    Costas
                </Text>

                <Text
                    className="text-gray-100 text-lg"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    Puxada frontal
                </Text>
            </View>

            <Text className="text-gray-300 font-regular">
                08:56
            </Text>
        </View>
    )
}