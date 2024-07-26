import { Pressable, PressableProps, View } from "react-native";
import Animated, { Easing, ReduceMotion, useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated"
import cn from "@utils/cn";
import { colors } from "@theme/colors";

type ToggleProps = PressableProps & {
    value?: boolean
}

function Toggle({value, className, ...props}: ToggleProps) {
    const padding = 22;
    const userConfig = {
        duration: 150,
        easing: Easing.ease,
        reduceMotion: ReduceMotion.System
    }

    const paddingRight = useSharedValue(padding);
    const paddingLeft = useSharedValue(padding);
    const backgroundColor = useSharedValue(colors["blue-light"]);

    const animatedStyle = useAnimatedProps(() => ({
        paddingLeft: withTiming(value ? paddingRight.value : 2, userConfig),
        paddingRight: withTiming(value ? 2 : paddingLeft.value, userConfig),
        backgroundColor: withTiming(value ? backgroundColor.value : colors.gray[500], userConfig),
    }))

    return (
        <Pressable className={cn("items-start", className)} hitSlop={5} {...props}>
            <Animated.View
                className="p-[2px] rounded-full"
                style={[ animatedStyle ]}
            >
                <View className="size-6 bg-gray-700 rounded-full"/>
            </Animated.View>
        </Pressable>
    )
}

export { Toggle }

