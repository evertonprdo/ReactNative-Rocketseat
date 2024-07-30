import React, { Children, createContext, useContext, useState } from "react";
import { Pressable, TextProps, View, ViewProps } from "react-native";
import Animated, { Easing, ReduceMotion, useSharedValue, withTiming } from "react-native-reanimated"
import { CaretDown, CaretUp } from "phosphor-react-native"

import { TextApp } from "@components/base/Text";
import cn from "@utils/cn";

type SelectedContextProps = {
    selected: string
    setSelected?: (v: string) => void,
    setShowOptions: (v: boolean) => void,
}
const SelectedContext = createContext({} as SelectedContextProps);

type OptionChildProps = {
    [key: string]: TextProps["children"]
}
type SelectProps = ViewProps & {
    selected?: string
    setSelected?: (val: string) => void
    children: React.ReactNode
}
function Select({ selected = "", setSelected, className, children, ...props }: SelectProps) {
    const [showOptions, setShowOptions] = useState(false);

    const childProps = {} as OptionChildProps
    Children.map<void, React.ReactNode>(children, child => {
        if(React.isValidElement(child)) {
            const name = child.props["name"]
            const optChild = child.props["children"]
            childProps[name] = optChild
        }
    })
    const anOpt = {
        maxh: {
            sv: useSharedValue(0),
            start: 0,
            end: Children.count(children) * 40,
        },
        py: {
            sv: useSharedValue(0),
            start: 0,
            end: 6
        },
        config: {
            duration: 275,
            easing: Easing.inOut(Easing.ease),
            reduceMotion: ReduceMotion.System
        }
    }

    function animation(py: number, maxh: number) {
        anOpt.maxh.sv.value = withTiming(maxh, anOpt.config)
        anOpt.py.sv.value = withTiming(py, anOpt.config)
    }
    function handleOnSelectPress(val: boolean) {
        if (val && val !== showOptions) {
            setShowOptions(val)
            animation(anOpt.py.end, anOpt.maxh.end);
            return
        }
        if (!val && val !== showOptions) {
            setShowOptions(val)
            animation(anOpt.py.start, anOpt.maxh.start);
            return
        }
    }
    const maxHeight = anOpt.maxh.sv
    const paddingVertical = anOpt.py.sv
    
    return (
        <SelectedContext.Provider value={{ selected, setSelected, setShowOptions: handleOnSelectPress }}>
            <View className={cn("w-28 z-50", className)} {...props}>
                <Pressable
                    className="w-full items-center flex-row gap-2 px-3 py-2 rounded-md border border-gray-400"
                    onPress={ () => handleOnSelectPress(!showOptions) }
                >
                    <TextApp
                        className="text-sm text-gray-100 flex-1"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        { selected ? childProps[selected] : "Selecione" }
                    </TextApp>

                    { showOptions ? <CaretUp size={16} /> : <CaretDown size={16}/> }
                </Pressable>

                <Animated.View
                    className="w-full absolute bg-gray-700 top-10 rounded-md shadow-md overflow-hidden"
                    style={{ maxHeight, paddingVertical }}

                >
                    { children }
                </Animated.View>
            </View>
        </SelectedContext.Provider>
    )
}

type OptionProps = {
    name: string
    children: TextProps["children"]
    className?: string
}
function Option({ name, children, className, ...props }: OptionProps) {
    const { selected, setSelected, setShowOptions } = useContext(SelectedContext);
    const isSelected = selected === name;

    function handleOnPressOption() {
        if(setSelected) { setSelected(name) }
        setShowOptions(false)
    }
    return (
        <Pressable
            className={cn("py-[6px] px-3 rounded-md", className)}
            onPress={ handleOnPressOption }
            disabled={ isSelected }
            {...props}
        >
            <TextApp
                className={ isSelected ? "font-bold" : '' }
                disabled={ isSelected }
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                { children }
            </TextApp>
        </Pressable>
    )
}

Select.Option = Option

export { Select }