import { createContext, PropsWithChildren, useContext, useState } from "react";
import { NativeSyntheticEvent, Pressable, TextInput, TextInputFocusEventData, type TextInputProps, View, type ViewProps } from "react-native";
import { Eye, EyeClosed } from "phosphor-react-native";
import cn from "@utils/cn";

import { colors } from "@theme/colors";
import { TextProps } from "react-native-svg";
import { TextApp } from "./Text";

const FocusContext = createContext((v: boolean) => {});

function Input({ children, className, ...props }: ViewProps) {
    const [ isFocus, setIsFocus ] = useState(false);
    
    return (
        <FocusContext.Provider value={ setIsFocus }>
            <View
                className={cn("bg-gray-700 flex-row items-center gap-2 border border-transparent rounded-md px-4 py-3", {
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
            className=" flex-1 text-gray-200 font-regular text-base px-4 py-3 -mx-4 -my-3"
            placeholderTextColor={colors.gray[400]}
            cursorColor={colors.gray[300]}
            onFocus={(e) => handleOnFocus(e)}
            onBlur={(e) => handleOnBlur(e)}
            {...props}
        />
    )
}

function AlertBox({ children }: PropsWithChildren) {
    return (
        <View className="absolute -top-5 left-1">
            <TextApp className="text-red-500 text-xs">
                { children }
            </TextApp>
        </View>
    )
}

type InputTemplateProps = TextInputProps & {
    name?: string
    secureTextEntry?: boolean
    alert?: string
}
function Template({ secureTextEntry, alert, ...props }: InputTemplateProps) {
    const [passwordVisibility, setPassordVisibility] = useState(secureTextEntry)
    
    return (
        <Input>
            <Input.Field
                secureTextEntry={passwordVisibility}
                { ...props }
            />

            {secureTextEntry && (
                <Pressable
                    onPress={() => setPassordVisibility(!passwordVisibility)}
                    hitSlop={34}
                >
                    {passwordVisibility
                        ? <Eye size={20} color={colors.gray[300]} />
                        : <EyeClosed size={20} color={colors.gray[300]} />
                    }
                </Pressable>
            )}

            { alert && <AlertBox>{ alert }</AlertBox> }
        </Input>
    )
}

Input.Field = Field
Input.Template = Template

export { Input }