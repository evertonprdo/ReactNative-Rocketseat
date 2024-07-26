import { createContext, useContext } from "react";
import { Pressable, type TextProps, type PressableProps, View, ViewProps } from "react-native";
import cn from "@utils/cn";

import { TextApp } from "@components/atoms/Text";
import { Loading } from "@components/atoms/Loading";

type Variants = "black" | "blue" | "gray"

const ThemeContext = createContext<{variant?: Variants}>({})

type ButtonProps = PressableProps & {
    variant?: Variants
    isLoading?: boolean
    children?: React.ReactNode
}

function Button({
    variant = "gray",
    children,
    disabled,
    isLoading,
    className,
    ...props
}: ButtonProps) {
    return (
        <Pressable
            className={cn("p-3 justify-center items-center rounded-md",{
                "bg-gray-100 active:bg-gray-200": variant === "black",
                "bg-gray-500 active:bg-gray-400": variant === "gray",
                "bg-blue-light active:bg-blue": variant === "blue"
            }, className)}
            style= {disabled && {pointerEvents: "none"}}
            {...props}
        >
            <ThemeContext.Provider value={{ variant }}>
                { isLoading
                    ? <Loading/>
                    : children 
                }
            </ThemeContext.Provider>
        </Pressable>
    )
}

function Title({children, className, ...props}: TextProps) {
    const { variant } = useContext(ThemeContext)
    return (
        <TextApp
            className={cn("font-bold text-sm",{
                "text-white": variant === "black" || variant === "blue",
                "text-gray-200": variant === "gray",
            }, className)}
            {...props}
        >
            { children }
        </TextApp>
    )
}

function HView({children, ...props}: ViewProps) {
    return (
        <View className="flex-row items-center justify-center gap-2" {...props}>
            { children }
        </View>
    )
}

Button.Title = Title;
Button.HView = HView;

export { Button }