import { useState } from "react";
import { Pressable, PressableProps } from "react-native";
import cn from "@utils/cn";

import { Heading } from "@components/Text";

type Props = PressableProps & {
    title: string;
}

export function Button({ title, className, onPressIn, onPressOut, ...rest }: Props) {
    const [isActive, setIsActive] = useState(false);

    return (
        <Pressable
            className={cn(
                "flex-1 min-h-14 max-h-14 items-center justify-center bg-green-700 rounded-sm", {
                "bg-green-500": isActive
            },
                className
            )}
            onPressIn={(e) => { setIsActive(true); if (onPressIn) onPressIn(e) }}
            onPressOut={(e) => { setIsActive(false); if (onPressOut) onPressOut(e) }}
            {...rest}
        >
            <Heading className="text-white text-sm">
                {title}
            </Heading>
        </Pressable>
    )
}