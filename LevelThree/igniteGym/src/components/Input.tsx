import { TextInput, type TextInputProps } from "react-native";
import cn from "@utils/cn";

import { colors } from "@theme/colors";

type Variants = "default" | "error" | "disabled"

type InputProps = TextInputProps & {
    variant?: Variants
}

export function Input({variant = "default", ...rest }: InputProps) {
    return (
        <TextInput
            className={cn("bg-gray-600 h-14 px-4 text-base text-white mb-4 w-full rounded-md p-4 border-[1px] border-transparent focus:border-green-500",
                {
                    "border-red-500 focus:border-red-500": variant === "error",
                    "bg-gray-700": variant === "disabled",
                },
            )}
            placeholderTextColor={colors.gray[300]}
            editable={ variant === "disabled" ? false : true}
            { ...rest }
        />
    )
}