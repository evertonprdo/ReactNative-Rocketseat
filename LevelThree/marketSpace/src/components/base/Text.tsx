import cn from "@utils/cn";
import { Text, type TextProps } from "react-native";

function TextApp({ children, className, ...props}: TextProps) {
    return (
        <Text
            className={cn("font-regular text-base text-gray-200", className)}
            {...props}
        >
            {children}
        </Text>
    )
}

export { TextApp }