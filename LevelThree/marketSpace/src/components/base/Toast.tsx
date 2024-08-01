import { View, ViewProps } from "react-native";
import { TextApp } from "./Text";

type Props = ViewProps & {
    message: string
    bgColor: string
}
export function Toast({ message, bgColor, ...props }: Props) {
    return (
        <View
            className={`${bgColor} p-3 rounded-md`}
            {...props}
        >
            <TextApp className="font-bold text-gray-700 text-center">
                { message }
            </TextApp>
        </View>
    )
}