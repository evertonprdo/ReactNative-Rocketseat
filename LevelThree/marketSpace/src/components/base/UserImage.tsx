import { Image, ImageProps, Pressable, PressableProps, View } from "react-native";
import Animated, { Easing, interpolateColor, ReduceMotion, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { PencilSimpleLine } from "phosphor-react-native"
import cn from "@utils/cn";

import UserImg from "@assets/avatar.png"

import { colors } from "@theme/colors";
import { useEffect } from "react";

type ImagePickProps = ImageProps & {
    className?: string
    children?: React.ReactNode
    isLoading?: boolean
    imageUri?: string
}
function UserImage({ className, children, isLoading, imageUri, ...props }: ImagePickProps) {
    return (
        <View
            className={cn("size-[88px] rounded-full border-[3px] border-blue-light", className)}
        >
            { !isLoading
                ? (
                    <Image
                        source={ imageUri ? { uri: imageUri } : UserImg}
                        className="rounded-full h-full w-full overflow-hidden"
                        resizeMode="cover"
                        {...props}
                    />
                ) : <UserImageSkeleton/>
            }
                {children}
        </View>
    )
}

function UserImageSkeleton() {
    const anim = {
        bg: {
            start: colors.gray[400],
            end: colors.gray[600],
        },
        progress: useSharedValue(1),
        config: {
            duration: 750,
            easing: Easing.ease,
            reduceMotion: ReduceMotion.System
        }
    }

    function animation() {
        anim.progress.value = withRepeat(
            withTiming(
                -anim.progress.value, anim.config
            ), -1, true
        )
    }

    const animatedStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            anim.progress.value,
            [-1, 1],
            [anim.bg.start, anim.bg.end],
            'RGB'
        )
    }))

    useEffect(() => {
        animation();
    }, [])

    return <Animated.View style={animatedStyle} className="flex-1 rounded-full"/>
}

function Edit({className, ...props}: PressableProps) {
    return (
        <Pressable
            className={cn("absolute rounded-full active:bg-blue bg-blue-light p-3 bottom-0 -right-2", className)}
            {...props}
        >
            <PencilSimpleLine color={colors.gray[600]} size={16}/>
        </Pressable>
    )
}

UserImage.Edit = Edit
UserImage.Skeleton = UserImageSkeleton

export { UserImage }