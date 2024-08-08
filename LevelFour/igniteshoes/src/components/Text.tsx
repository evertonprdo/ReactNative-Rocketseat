import { Text as RNText, TextProps } from "react-native"
import cn from "@utils/cn"

export function Text({ className, children, ...rest }: TextProps) {
    return (
        <RNText className={cn("font-regular text-base text-gray-200", className)} {...rest}>
            {children}
        </RNText>
    )
}

export function Heading({className, children, ...rest}: TextProps) {
    return (
        <Text className={cn("font-bold", className)} {...rest}>
            {children}
        </Text>
    )
}