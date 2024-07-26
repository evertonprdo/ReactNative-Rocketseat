import { createContext, useContext, useState } from "react";
import { Pressable, type PressableProps, TextProps } from "react-native";
import Animated, { Easing, ReduceMotion, useSharedValue, withTiming } from "react-native-reanimated"
import { CaretDown, CaretUp } from "phosphor-react-native"

import { TextApp } from "@components/atoms/Text";
import cn from "@utils/cn";

const SelectedContext = createContext({selected: ""});

type SelectProps = Omit<PressableProps, "onPress"> & {
    selected?: string
    children?: React.ReactNode
}
function Select({ selected = "", children, ...props }: SelectProps) {
    const [showOptions, setShowOptions] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const [display, setDisplay] = useState<"none" | "flex">("none");
    const paddingVertical = useSharedValue(0);
    const maxHeight = useSharedValue(0);

    const userConfig = {
        duration: 275,
        easing: Easing.inOut(Easing.ease),
        reduceMotion: ReduceMotion.System
    }

    function wait(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function animation(pad: number, maxh: number) {
        paddingVertical.value = withTiming(pad, userConfig)
        maxHeight.value = withTiming(maxh, userConfig)
    }

    async function handleOnPress() {
        setShowOptions(v => v = !showOptions);

        if (!showOptions && display === "none") {
            setDisplay("flex");
            animation(12, 999);

            await wait(125);
            setShowContent(true);

            return
        }
        if (showOptions && display === "flex") {
            animation(0, 0);

            await wait(100);
            setShowContent(false);

            await wait(userConfig.duration);
            setDisplay("none");
            return
        }
    }

    return (
        <SelectedContext.Provider value={{ selected }}>
            <Pressable
                className="w-28 items-center flex-row rounded-md px-3 py-2 gap-2 border border-gray-400 justify-between"
                onPress={ handleOnPress }
                {...props}
            >
                <TextApp className="text-sm text-gray-100">
                    { !selected ? "Select" : selected }
                </TextApp>

                { showOptions ? <CaretUp size={16} /> : <CaretDown size={16}/> }

                <Animated.View
                    className="w-28 absolute px-3 bg-gray-700 top-10 border border-transparent rounded-md shadow-md gap-6"
                    style={{ display, paddingVertical, maxHeight }}
                >
                    { showContent && children }
                </Animated.View>
            </Pressable>
        </SelectedContext.Provider>
    )
}

type OptionProps = PressableProps & {
    children?: TextProps["children"] | React.ReactNode
}
function Option({ children, className, ...props }: OptionProps) {
    const { selected } = useContext(SelectedContext);
    const isSelected = selected.toLowerCase() === children?.toString().toLowerCase();

    return (
        <Pressable
            className={cn("active:bg-gray-500 -m-3 py-2 px-3 rounded-md", className)}
            {...props}
        >
            <TextApp
                className={ isSelected ? "font-bold" : '' }>
                {children}
            </TextApp>
        </Pressable>
    )
}

Select.Option = Option

export { Select }