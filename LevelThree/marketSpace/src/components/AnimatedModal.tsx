import { useEffect, useState } from "react";
import { Modal, ModalProps, Pressable, useWindowDimensions, View } from "react-native";
import Animated, { ReduceMotion, useSharedValue, withDelay, withTiming, Easing } from "react-native-reanimated";
import { X } from "phosphor-react-native";

import { colors } from "@theme/colors";
import { TextApp } from "./base/Text";
import { wait } from "@utils/util";

type FilterProps = Omit<ModalProps, "visible"> & {
    title?: string
    onCloseModal?: () => void
    showModal?: boolean
}
export function AnimatedModal({ title, showModal, onCloseModal, children, ...props }: FilterProps) {
    const { height } = useWindowDimensions();
    const [show, setShow] = useState(showModal);

    const anim = {
        bottom: {
            start: -height,
            end: 0,
            sv: useSharedValue(-height)
        },
        bgOpacity: {
            start: 0,
            end: 1,
            sv: useSharedValue(0),
            duration: 300
        },
        config: {
            duration: 750,
            easing: Easing.out(Easing.ease),
            reduceMotion: ReduceMotion.System
        }
    }

    function slideUpAnimation(bottom: number, delay = 1) {
        anim.bottom.sv.value = withDelay(delay, withTiming(
            bottom, anim.config
        ))
    }

    function bgOpacityAnimation(bgOpacity: number, delay = 1) {
        anim.bgOpacity.sv.value = withDelay(delay,
            withTiming(bgOpacity, {
                ...anim.config,
                duration: anim.bgOpacity.duration,
            })
        )
    }

    async function handleOnCloseModal() {
        slideUpAnimation(-height)
        bgOpacityAnimation(anim.bgOpacity.start, anim.config.duration)

        await wait(anim.config.duration)
        setShow(false)

        if (onCloseModal) {
            onCloseModal();
        }
    }

    useEffect(() => {
        if (showModal && !show) {
            setShow(true)

            slideUpAnimation(0, anim.bgOpacity.duration -100)
            bgOpacityAnimation(anim.bgOpacity.end)
            return
        }
        if (!showModal && show) {
            handleOnCloseModal();
        }
    }, [showModal])

    const bottom = anim.bottom.sv
    return (
        <Modal
            statusBarTranslucent
            transparent
            animationType="none"
            visible={show}
            {...props}
        >
            <Animated.View
                className="bg-black/60 flex-1"
                style={{ opacity: anim.bgOpacity.sv }}
            >
                <Animated.View
                    className="absolute w-full p-6 bg-gray-600 rounded-t-3xl gap-6"
                    style={{ bottom }}
                >

                    <View className="w-14 h-1 bg-gray-400 self-center -mt-3 mb-8" />

                    <View className="flex-row">
                        <TextApp className="font-bold text-xl text-gray-100 flex-1">{title}</TextApp>

                        <Pressable
                            onPress={handleOnCloseModal}
                        >
                            <X size={20} color={colors.gray[400]} />
                        </Pressable>
                    </View>

                    {children}
                </Animated.View>
            </Animated.View>
        </Modal>
    )
}