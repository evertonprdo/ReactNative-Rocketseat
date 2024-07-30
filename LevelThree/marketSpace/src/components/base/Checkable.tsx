import { Pressable, type PressableProps, type TextProps, } from "react-native";
import { CheckSquare, Square, Circle, RadioButton } from "phosphor-react-native";

import { colors } from "@theme/colors";
import { TextApp } from "@components/base/Text";
import cn from "@utils/cn";

const size = 24;
const hitSlop = 4; 

type CheckboxProps = PressableProps & {
    variant?: "checkbox" | "radio"
    checked?: boolean
    children?: TextProps["children"]
}
function Checkable({ variant = "checkbox", children, checked, className, ...props }: CheckboxProps) {
    return (
        <Pressable
            hitSlop={ hitSlop }
            className={cn("flex-row gap-2", className)}
            {...props}
        >
            { variant !== "checkbox"
                ? null : checked
                ? <CheckSquare color={colors["blue-light"]} weight="fill" size={size}/>
                : <Square color={colors.gray[400]} size={size} />
            }

            { variant !== "radio"
                ? null : checked
                ? <RadioButton color={colors["blue-light"]} weight="fill" size={size}/>
                : <Circle color={colors.gray[400]} size={size} />
            }
            <TextApp>
                { children }
            </TextApp>
        </Pressable>
    )
}

export { Checkable }