import { TextInput, TextInputProps } from "react-native";
import cn from "@utils/cn";

export function Input({ className, ...rest }: TextInputProps) {
    return (
        <TextInput
            className={cn(
                "bg-gray-800 h-14 px-4 border border-gray-600 font-regular text-white focus:bg-gray-800 focus:border-gray-600",
                className
            )}
            placeholderClassName="text-gray-300"
            {...rest}
        />
    )
}