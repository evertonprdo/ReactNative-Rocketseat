import { Pressable, PressableProps, type TextProps, View } from "react-native";
import { XCircle } from "phosphor-react-native"
import cn from "@utils/cn";

import { TextApp } from "@components/atoms/Text";

type TagProps = PressableProps & {
    selected?: boolean
    children?: TextProps["children"]
}
export function Tag({ selected, children, className, ...props }: TagProps) {
    return (
        <Pressable
            className={cn("flex-row rounded-full gap-[6px] self-start", {
                "bg-blue-light p-[6px] pl-4": selected,
                "bg-gray-500 px-4 py-[6px]": !selected
            }, className)}
            {...props}
        >
            <TextApp
                className={cn("font-bold text-xs uppercase", {
                    "text-white": selected,
                    "text-gray-300": !selected,
                }, className)}
            >
                { children }
            </TextApp>

            { selected &&
                <XCircle weight="fill" size={13} color="#fff"/>
            }
        </Pressable>
    )
}