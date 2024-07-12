import { useState, type ReactNode } from "react";
import { Pressable, type PressableProps } from "react-native";
import st from "./styles";
import { PlusCircle, Trash2 } from "lucide-react-native";
import { colors } from "../../styles/colors";

type ButtonProps = PressableProps & {
    variant: "add" | "delete"
}
export function Button({ variant, ...props }: ButtonProps) {
    const [ pressIn, setPressIn ] = useState(false);
    const style = variant === "add"
        ? [st.addButton, pressIn && st.addButtonPressIn ]
        : [ st.deleteButton, pressIn && st.deleteButtonPressIn ]

    return (
        <Pressable
            style= {[ st.container, ...style ]}
            onPressIn={() => setPressIn(true)}
            onPressOut={() => setPressIn(false)}
            {...props}
        >
            { variant === "add" ? (
                <PlusCircle
                    color={colors.gray[100]}
                    size={20}
                    strokeWidth={2}
                />
            ) : (
                <Trash2
                    color={ pressIn ? colors.feedback.danger : colors.gray[300]}
                    size={16}
                />
            ) }
        </Pressable>
    )
}