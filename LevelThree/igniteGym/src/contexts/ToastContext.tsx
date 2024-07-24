import { Toast } from "@components/Toast";
import { createContext, type PropsWithChildren, useEffect, useState } from "react";
import Animated, { useSharedValue, withTiming, Easing } from "react-native-reanimated";

export const ToastContext = createContext({ showToast: (message: string) => {} });

export function ToastProvider({ children }: PropsWithChildren) {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');

    const top = useSharedValue(-52)
    const duration = 1000
    const messageDuration = 2000

    function showToast(message:string) {
        setMessage(message);
        setIsVisible(true);
    };

    function toastAnimation() {
        top.value = withTiming(-top.value, {
            duration,
            easing: Easing.out(Easing.cubic)
        })
    }

    async function popToast() {
        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

        toastAnimation();
        await wait(duration + messageDuration)

        toastAnimation();
        await wait(duration)

        setIsVisible(false);
    }

    useEffect(() => {
        if(isVisible) {
            popToast();
        }
    }, [isVisible])

    return (
        <ToastContext.Provider value={{ showToast }}>
            { isVisible && (
                <Animated.View className="w-full items-center px-4 absolute z-30" style={{ top }}>
                    <Toast message={ message }/>
                </Animated.View>
            )}
            
            {children}
        </ToastContext.Provider>
    )
}