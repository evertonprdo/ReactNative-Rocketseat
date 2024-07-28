import { createContext, useContext, useState } from "react";
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, type TextInputProps, View, type ViewProps } from "react-native";
import cn from "@utils/cn";

import { colors } from "@theme/colors";

const FocusContext = createContext((v: boolean) => {});

function Input({ children, className, ...props }: ViewProps) {
    const [ isFocus, setIsFocus ] = useState(false);
    
    return (
        <FocusContext.Provider value={ setIsFocus }>
            <View
                className={cn("bg-gray-700 flex-row items-center gap-2 border border-transparent rounded-md", {
                    "border-gray-300": isFocus === true
                }, className)}
                {...props}
            >
                { children }
            </View>
        </FocusContext.Provider>
    )
}

function Field({ onFocus, onBlur, ...props }: TextInputProps) {
    const setIsFocus = useContext(FocusContext)

    function handleOnFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
        setIsFocus(true);
        if(onFocus) {
            onFocus(e)
        }
    }
    function handleOnBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
        setIsFocus(false);
        if(onBlur) {
            onBlur(e);
        }
    }

    return (
        <TextInput
            className=" flex-1 text-gray-200 font-regular text-base px-4 py-3"
            placeholderTextColor={colors.gray[400]}
            cursorColor={colors.gray[300]}
            onFocus={(e) => handleOnFocus(e)}
            onBlur={(e) => handleOnBlur(e)}
            {...props}
        />
    )
}

Input.Field = Field

export { Input }