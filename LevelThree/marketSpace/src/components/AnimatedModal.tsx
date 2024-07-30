import { useEffect, useState } from "react";
import { Modal, ModalProps, Pressable, useWindowDimensions, View } from "react-native";
import Animated, { ReduceMotion, useSharedValue, withDelay, withTiming, Easing } from "react-native-reanimated";
import { X } from "phosphor-react-native";

import { colors } from "@theme/colors";
import { TextApp } from "./atoms/Text";
import { wait } from "@utils/util";

type FilterProps = Omit<ModalProps, "visible"> & {
    title?: string
    onCloseModal?: () => void
    showModal?: boolean
}
export function AnimatedModal({title, showModal, onCloseModal, children, ...props }: FilterProps) {
    const { height } = useWindowDimensions();
    const [ show, setShow ] = useState(showModal);

    const anim = {
        bottom: {
            start: -height,
            end: 0,
            sv: useSharedValue(-height)
        },
        config: {
            duration: 1000,
            easing: Easing.out(Easing.ease),
            reduceMotion: ReduceMotion.System
        }
    }

    function animation(bottom: number) {
        anim.bottom.sv.value = withDelay(300, withTiming(
            bottom, anim.config
        ))
    }

    async function handleOnCloseModal() {
        animation(-height)

        await wait(anim.config.duration)
        setShow(false)
        
        if(onCloseModal) {
            onCloseModal()
        }
    }
    
    useEffect(() => {
        if(showModal) {
            setShow(true)
            animation(0)
            return
        } 
        if(!showModal) {
            handleOnCloseModal();
            return
        }
    }, [showModal])

    const bottom = anim.bottom.sv
    return (
        <Modal
            statusBarTranslucent
            transparent
            animationType="fade"
            visible={show}
            {...props}
        >
            <View className="bg-black/60 flex-1">
                <Pressable
                    onPress={ handleOnCloseModal }
                    className="flex-1"
                />

                <Animated.View
                    className="absolute w-full p-6 bg-gray-600 rounded-t-3xl gap-6"
                    style={{bottom}}
                >

                    <View className="w-14 h-1 bg-gray-400 self-center -mt-3 mb-8" />

                    <View className="flex-row">
                        <TextApp className="font-bold text-xl text-gray-100 flex-1">{ title }</TextApp>

                        <Pressable
                            onPress={handleOnCloseModal}
                        >
                            <X size={20} color={colors.gray[400]} />
                        </Pressable>
                    </View>

                    { children }
                </Animated.View>
            </View>
        </Modal>
    )
}