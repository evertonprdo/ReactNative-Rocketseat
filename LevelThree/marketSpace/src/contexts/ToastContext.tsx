import { createContext, type PropsWithChildren, useEffect, useState } from "react";
import Animated, { useSharedValue, withTiming, Easing, ReduceMotion } from "react-native-reanimated";

import { wait } from "@utils/util";

import { Toast } from "@components/base/Toast";

type Variants = "red" | "gray" | "green"

type ShowToastConfigType = {
    message: string
    backgroundColor?: string
    variant?: Variants
}
type ToastContextProps = {
    showToast: (config: ShowToastConfigType) => void
}

export const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

export function ToastProvider({ children }: PropsWithChildren) {
    const [isVisible, setIsVisible] = useState(false);
    const [ isCustomColor, setIsCustomColor ] = useState(false);
    
    const [bgColor, setBgColor] = useState('')
    const [message, setMessage] = useState('');

    const anim = {
        top: {
            start: -75,
            end: 50,
            sv: useSharedValue(-75)
        },
        config: {
            duration: 1000,
            easing: Easing.out(Easing.cubic),
            reduceMotion: ReduceMotion.System
        },
        messageDuration: 2000
    }

    function showToast({ message, backgroundColor, variant = "gray" }: ShowToastConfigType) {
        if(!backgroundColor) {
            const color = variant === "gray"
                ? "bg-gray-300"
                : variant === "green"
                ? "bg-green-500"
                : "bg-red-500"
            ;
            setIsCustomColor(false);
            setBgColor(color);
        } else {
            setIsCustomColor(true);
            setBgColor(backgroundColor);
        }
        setMessage(message);
        setIsVisible(true);
    };

    function toastAnimation(val: number) {
        anim.top.sv.value = withTiming(val, anim.config)
    }

    async function popToast() {
        toastAnimation(anim.top.end);
        await wait(anim.config.duration + anim.messageDuration)

        toastAnimation(anim.top.start);
        await wait(anim.config.duration)

        setIsVisible(false);
    }

    useEffect(() => {
        if (isVisible) {
            popToast();
        }
    }, [isVisible])

    return (
        <ToastContext.Provider value={{ showToast }}>
            {isVisible && (
                <Animated.View className="w-full items-center px-4 absolute z-50" style={{ top: anim.top.sv }}>
                    <Toast
                        message={message}
                        bgColor={isCustomColor ? "" : bgColor}
                        style={isCustomColor && { backgroundColor: bgColor }}
                    />

                </Animated.View>
            )}

            {children}
        </ToastContext.Provider>
    )
}