import { Pressable, View, ViewProps, type PressableProps, type TextProps, } from "react-native";
import { CheckSquare, Square, Circle, RadioButton } from "phosphor-react-native";

import { colors } from "@theme/colors";
import { TextApp } from "@components/atoms/Text";
import { createContext, useContext } from "react";

const size = 24;
const hitSlop = 4; 
const OnPressLabelContext = createContext<CheckableProps["onPressLabel"]>(() => {});

type CheckableProps = ViewProps & {
    checked?: boolean
    onPressLabel?: () => void
}
function Checkable({children, onPressLabel, ...props}: CheckableProps) {
    return (
        <View
            className="flex-row gap-2"
            {...props}
        >
            <OnPressLabelContext.Provider value={ onPressLabel }>
                { children }
            </OnPressLabelContext.Provider>
        </View>
    )
}

type CheckboxProps = PressableProps & {
    checked?: boolean
}
function Checkbox({ checked, ...props }: CheckboxProps) {
    const onPressLabel = useContext(OnPressLabelContext)
    return (
        <Pressable
            onPress={ onPressLabel }
            hitSlop={hitSlop}
            {...props}
        >
            { checked
                ? <CheckSquare color={colors["blue-light"]} weight="fill" size={size}/>
                : <Square color={colors.gray[400]} size={size} />
            }
        </Pressable>
    )
}

type RadioProps = CheckboxProps

function Radio({ checked, ...props }: RadioProps) {
    const onPressLabel = useContext(OnPressLabelContext)
    return (
        <Pressable
            onPress={ onPressLabel }
            hitSlop={hitSlop}
            {...props}
        >
            { checked
                ? <RadioButton color={colors["blue-light"]} weight="fill" size={size}/>
                : <Circle color={colors.gray[400]} size={size} />
            }
        </Pressable>
    )
}

function Title({children, ...props}: TextProps) {
    const onPressLabel = useContext(OnPressLabelContext)
    return (
        <Pressable
            onPress={ onPressLabel }
            disabled={ !onPressLabel }
            hitSlop={hitSlop}
        >
            <TextApp {...props}>
                { children }
            </TextApp>
        </Pressable>
    )
}

Checkable.Checkbox = Checkbox;
Checkable.Radio = Radio;
Checkable.Title = Title

export { Checkable }