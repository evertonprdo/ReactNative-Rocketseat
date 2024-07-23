import cn from "@utils/cn";
import { Text, Pressable, PressableProps } from "react-native";

type Props = PressableProps & {
    name: string
    isActive?: boolean
}

export function Group({ name, isActive, ...rest }: Props) {
    return (
        <Pressable
            className={cn("mr-3 w-24 h-10 bg-gray-600 rounded-md items-center justify-center overflow-hidden border-[1px] border-transparent",
                {
                    "border-green-500": isActive
                }
            )}
            {...rest}
        >
            <Text className={cn("text-gray-200 uppercase text-xs", 
                {
                    "text-green-500": isActive
                }
            )}>
                { name }
            </Text>
        </Pressable>
    )
}