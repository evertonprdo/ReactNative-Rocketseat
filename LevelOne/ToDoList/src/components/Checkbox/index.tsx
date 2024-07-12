import { Pressable, type PressableProps } from "react-native";
import { Check } from "lucide-react-native"

import st from "./styles";
import { colors } from "../../styles/colors";
import { useState } from "react";

type CheckboxProps = PressableProps & {
    checked: boolean
}
export function Checkbox({ checked, ...props }: CheckboxProps) {
    const [ pressIn, setPressIn ] = useState(false);
    const hover = !pressIn ? undefined : checked  ? st.checkedPressIn : st.uncheckedPressIn

    return (
        <Pressable
            style= {[ 
                st.container,
                !checked ? st.checked : st.unchecked,
                hover
            ]}
            hitSlop={7}
            onPressIn={ () => setPressIn(true) }
            onPressOut={ () => setPressIn(false) }
            {...props}
        >
            { checked && 
                <Check
                    color={colors.gray[100]}
                    size={14}
                    strokeWidth={3}/>
            }
        </Pressable>
    )
}