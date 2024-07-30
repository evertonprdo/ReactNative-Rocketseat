import { useState } from "react";
import { type GestureResponderEvent, Pressable, type PressableProps } from "react-native";
import cn from "@utils/cn";

export function PressableIcon({onPressIn, onPressOut, children, className, ...props}: PressableProps) {
    const [ pressIn, setPressIn ] = useState(false);

    function handleOnPressIn(event: GestureResponderEvent) {
        setPressIn(true)

        if(onPressIn) { onPressIn(event) }
    }
    function handleOnPressOut(event: GestureResponderEvent) {
        setPressIn(false)

        if(onPressOut) { onPressOut(event) }
    }
    return (
        <Pressable
            className={cn("p-3 rounded-full", {
                "bg-gray-500": pressIn
            }, className)}
            onPressIn={(e) => handleOnPressIn(e)}
            onPressOut={(e) => handleOnPressOut(e)}
            {...props}
        >
            { children }
        </Pressable>
    )
}