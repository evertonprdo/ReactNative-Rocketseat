import { HistoryDTO } from "@dtos/HistoryDTO";
import { Text, View } from "react-native";

type Props = {
    data: HistoryDTO
}
export function HistoryCard({ data }: Props) {
    return (
        <View className="flex-row w-full px-5 py-4 mb-3 bg-gray-600 rounded-md items-center justify-between">
            <View className="mr-5 flex-1">
                <Text
                    className="text-gray-100 font-bold capitalize"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {data.group}
                </Text>

                <Text
                    className="text-gray-100 text-lg font-regular"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {data.name}
                </Text>
            </View>

            <Text className="text-gray-300 font-regular">
                {data.hour}
            </Text>
        </View>
    )
}