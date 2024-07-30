import { createContext, useContext, useState } from "react";
import { Pressable, type TextProps, type PressableProps, GestureResponderEvent } from "react-native";
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
    onPressIn,
    onPressOut,
    ...props
}: ButtonProps) {
    const [ pressIn, setPressIn ] = useState(false);

    function handlePressIn(event: GestureResponderEvent) {
        setPressIn(true);
        if(onPressIn) {
            onPressIn(event);
        }
    }
    function handlePressOut(event: GestureResponderEvent) {
        setPressIn(false);
        if(onPressOut) {
            onPressOut(event);
        }
    }
    return (
        <Pressable
            className={cn("flex-row p-3 justify-center items-center rounded-md gap-2",{
                "bg-gray-100": variant === "black",
                "bg-gray-500": variant === "gray",
                "bg-blue-light": variant === "blue",
                "bg-gray-200": variant === "black" && pressIn,
                "bg-gray-400": variant === "gray" && pressIn,
                "bg-blue": variant === "blue" && pressIn,
            }, className)}
            style= {disabled && {pointerEvents: "none"}}
            {...props}
            onPressIn={(e) => handlePressIn(e)}
            onPressOut={(e) => handlePressOut(e)}
        >
            <ThemeContext.Provider value={{ variant }}>
                { isLoading
                    ? <Loading
                        className={cn({
                            "color-gray-700": variant === "gray" || variant === "black",
                            "color-gray-300": variant === "gray"
                        })}
                    />
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
                "text-gray-700": variant === "black" || variant === "blue",
                "text-gray-200": variant === "gray",
            }, className)}
            {...props}
        >
            { children }
        </TextApp>
    )
}

Button.Title = Title;

export { Button }