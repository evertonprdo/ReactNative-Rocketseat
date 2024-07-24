import { Text, TextInput, View, type TextInputProps } from "react-native";
import cn from "@utils/cn";

import { colors } from "@theme/colors";

type Variants = "default" | "error" | "disabled"

type InputProps = TextInputProps & {
    variant?: Variants
    errorMessage?: string | null
}

export function Input({variant = "default", className, errorMessage, ...rest }: InputProps) {
    const invalid = !!errorMessage

    return (
        <View className="w-full">
            {invalid && <Text className="text-red-500 text-xs mb-1 font-regular">
                { errorMessage }
            </Text>}

            <TextInput
                className={cn("bg-gray-700 mb-4 font-regular h-14 px-4 text-base text-white rounded-md p-4 border border-transparent focus:border-green-500",
                    {
                        "border-red-500 focus:border-red-500": invalid || variant === "error",
                        "opacity-50": variant === "disabled",
                    },
                    className
                )}
                placeholderTextColor={colors.gray[300]}
                editable={ variant === "disabled" ? false : true}
                { ...rest }
            />
        </View>
    )
}