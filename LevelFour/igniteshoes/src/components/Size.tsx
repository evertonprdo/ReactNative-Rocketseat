import { Pressable, PressableProps } from "react-native";
import cn from "@utils/cn";

import { Text } from "@components/Text";

type Props = PressableProps & {
    size: string;
    isActive: boolean;
}

export function Size({ size, isActive, className, ...rest }: Props) {
    return (
        <Pressable
            className={cn(
                "mr-3 w-10 h-10 border border-transparent bg-gray-600 rounded-sm justify-center items-center overflow-hidden", {
                    "border-green-500": isActive
                }, className
            )}
            {...rest}
        >
            <Text className={cn("text-xs text-green-200", {"text-green-500": isActive})}>
                {size}
            </Text>
        </Pressable>
    )
}