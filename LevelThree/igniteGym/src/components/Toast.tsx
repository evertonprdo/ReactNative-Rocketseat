import { createContext, type PropsWithChildren, useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Animated, { useSharedValue, withTiming, Easing } from "react-native-reanimated";

const ToastContext = createContext({ showToast: (message: string) => {} });

export function useToast() {
    return useContext(ToastContext)
}

export function ToastProvider({ children }: PropsWithChildren) {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');

    const top = useSharedValue(-50)
    const duration = 1000
    const messageDuration = 2000

    function showToast(message:string) {
        setMessage(message);
        setIsVisible(true);
    };

    function hideToast() {
        setIsVisible(false);
    };

    function popToastAnimation() {
        top.value = withTiming(-top.value, {
            duration,
            easing: Easing.out(Easing.cubic)
        })
    }

    async function popToast() {
        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

        popToastAnimation();
        await wait(duration + messageDuration)

        popToastAnimation();
        await wait(duration)

        hideToast();
    }

    useEffect(() => {
        if(isVisible) {
            popToast();
        }
    }, [isVisible])

    return (
        <ToastContext.Provider value={{ showToast }}>
            { isVisible && (
                <Animated.View className="w-full px-4 absolute z-30" style={{ top }}>
                    <View className="bg-red-500 p-3 rounded-md">

                        <Text className="font-bold text-white">
                            { message }
                        </Text>
                    </View>
                </Animated.View>
            )}
            
            {children}
        </ToastContext.Provider>
    )
}