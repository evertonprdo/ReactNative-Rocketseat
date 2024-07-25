import { ActivityIndicator, Pressable, Text, type PressableProps } from "react-native"
import cn from "@utils/cn"
import { colors } from "@theme/colors"

type Variant = "outline" | "solid"
type Props = PressableProps & {
    title: string
    variant?: Variant
    isLoading?: boolean
}

export function Button({title, variant, className, isLoading, ...rest }: Props) {
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
            {isLoading
            ? <ActivityIndicator color={variant === "outline" ? colors.green[500] : colors.white}/>
            : (
                <Text className={cn("text-white font-bold text-sm",
                    {
                        "text-green-500": variant === "outline"
                    }
                )}>
                    {title}
                </Text>
            )}
        </Pressable>
    )
}