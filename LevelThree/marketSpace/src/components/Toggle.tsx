import { Pressable, PressableProps, View } from "react-native";
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import cn from "@utils/cn";

import { colors } from "@theme/colors";

type ToggleProps = PressableProps & {
    value?: boolean
}
function Toggle({value, className, ...props}: ToggleProps) {
    const tooglePadding = 2;
    const padding = 22;
    const anim = {
        pl: {
            start: padding,
            end: tooglePadding,
            sv: useSharedValue(padding)
        },
        pr: {
            start: tooglePadding,
            end: padding,
            sv: useSharedValue(padding)
        },
        bg: {
            start: colors["blue-light"],
            end: colors.gray[500],
            sv: useSharedValue(colors["blue-light"])
        },
        config: {
            duration: 150,
            easing: Easing.ease,
            reduceMotion: ReduceMotion.System
        }
    }

    function animation(pr: number, pl: number, bg: string) {
        anim.pr.sv.value = withTiming(pr, anim.config)
        anim.pl.sv.value = withTiming(pl, anim.config)
        anim.bg.sv.value = withTiming(bg, anim.config)
    }

    const animatedStyle = useAnimatedStyle(() => ({
        backgroundColor: anim.bg.sv.value
    }))
    const paddingLeft = anim.pl.sv
    const paddingRight = anim.pr.sv
    
    if(value) {
        animation(anim.pr.start, anim.pl.start, anim.bg.start);
    } else {
        animation(anim.pr.end, anim.pl.end, anim.bg.end);
    }

    return (
        <Pressable className={cn("items-start", className)} hitSlop={5} {...props}>
            <Animated.View
                className="p-[2px] rounded-full"
                style={[{paddingLeft, paddingRight}, animatedStyle]}
            >
                <View className="size-6 bg-gray-700 rounded-full"/>
            </Animated.View>
        </Pressable>
    )
}

export { Toggle }