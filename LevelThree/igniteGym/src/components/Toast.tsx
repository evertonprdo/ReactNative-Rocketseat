import { Text, View } from "react-native";

type Props = {
    message: string
}
export function Toast({ message }: Props) {
    return (
        <View className="bg-red-500 p-3 rounded-md">

            <Text className="font-bold text-white">
                { message }
            </Text>
        </View>
    )
}