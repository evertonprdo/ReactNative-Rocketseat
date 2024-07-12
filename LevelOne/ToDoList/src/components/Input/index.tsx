import { createContext, useContext, useState, type ReactNode } from "react";
import { TextInput, type TextInputProps, View, type ViewProps } from "react-native";

import st from "./styles";
import { colors } from "../../styles/colors";

const SetFocusContext = createContext<((val: boolean) => void) | null>(null);

type InputProps = ViewProps & {
    children: ReactNode
}
function Input({ children, ...props  }: InputProps) {
    const [ focus, setFocus ] = useState(false)

    return (
        <SetFocusContext.Provider value= { setFocus }>
            <View
                style= {[
                    st.container,
                    focus && st.containerFocus
                ]}
                {...props}
            >
                { children }
            </View>
        </SetFocusContext.Provider>
    )
}

function Field({...props}: TextInputProps) {
    const setFocus = useContext(SetFocusContext) as (val:boolean) => void;
    
    return (
        <TextInput 
            style= { st.field }

            placeholderTextColor={colors.gray[300]}
            cursorColor={colors.gray[100]}

            onFocus={ () => setFocus(true) }
            onBlur={ () => setFocus(false) }
            {...props}
        />
    )
}

Input.Field = Field

export { Input }