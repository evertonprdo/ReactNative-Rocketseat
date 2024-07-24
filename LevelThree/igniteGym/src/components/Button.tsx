import { Pressable, Text, type PressableProps } from "react-native"
import cn from "@utils/cn"

type Variant = "outline" | "solid"
type Props = PressableProps & {
    title: string
    variant?: Variant
}

export function Button({title, variant, className, ...rest }: Props) {
    return (
        <Pressable
            className={cn("w-full h-14 bg-green-700 rounded-md active:bg-green-500 justify-center items-center border border-transparent",
                {
                    "border-green-500 bg-transparent active:bg-gray-500": variant === "outline"
                },
                className
            )}
            {...rest}
        >
            <Text className={cn("text-white font-bold text-sm",
                {
                    "text-green-500": variant === "outline"
                }
            )}>
                {title}
            </Text>
        </Pressable>
    )
}