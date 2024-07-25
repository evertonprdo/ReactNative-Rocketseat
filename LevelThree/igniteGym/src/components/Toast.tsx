import { Text, View } from "react-native";

type Props = {
    message: string
    bgColor?: string
}
export function Toast({ message, bgColor = "bg-red-500" }: Props) {
    return (
        <View className={`${bgColor} p-3 rounded-md`}>

            <Text className="font-bold text-white">
                { message }
            </Text>
        </View>
    )
}