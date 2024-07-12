import { createContext, useContext, type ReactNode } from "react";
import { View, type ViewProps, type TextProps, Text as RNText } from "react-native";

import { Checkbox } from "../Checkbox";
import st from "./styles";
import { Button } from "../Button";

const CheckedContext = createContext(false);

type TaskProps = ViewProps & {
    checked?: boolean
    children: ReactNode
    onDelete: () => void
    onChangeStatus: () => void
}
function Task({ checked= false, children, onDelete, onChangeStatus, ...props }: TaskProps) {
    return (
        <CheckedContext.Provider value= { checked }>
            <View
                style= {st.container}
                { ...props }
            >
                <Checkbox
                    checked= { checked }
                    onPress= { onChangeStatus }
                />

                { children }

                <Button 
                    variant="delete"
                    onPress={ onDelete }    
                />
            </View>
        </CheckedContext.Provider>
    )
}

function Text({ children }: TextProps) {
    const checkedTask = useContext(CheckedContext)
    return (
        <RNText
            style= {[
                st.text,
                checkedTask && st.textDone
            ]}
        >
            { children }
        </RNText>
    )
}

Task.Text = Text

export { Task }