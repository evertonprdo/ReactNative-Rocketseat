import { Image, ImageProps } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"
import cn from "@utils/cn";
import { useEffect } from "react";
import { colors } from "@theme/colors";

type Props = ImageProps & {
    size: number
}
export function UserPhoto({ size, className, ...rest }: Props) {
    return (
        <Image
            className={cn("rounded-full border-2 border-gray-400", className)}
            width={size}
            height={size}
            {...rest}
        />
    )
}

export function UserPhotoSkeleton() {
    const sv = useSharedValue<string>(colors.gray[400]);

    useEffect(() => {
        sv.value = withRepeat(
            withTiming(colors.gray[600], { duration: 750 }),
            0,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        backgroundColor: sv.value
    }));

    return (
        <Animated.View
            className="size-33 rounded-full"
            style={animatedStyle}
        />
    );
}