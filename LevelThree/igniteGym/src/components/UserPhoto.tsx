import { Image, ImageProps, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"
import cn from "@utils/cn";
import { useEffect } from "react";
import { colors } from "@theme/colors";

type Props = ImageProps & {
    size: number
}
export function UserPhoto({ size, className, ...rest }: Props) {
    return (
        <View
            className={cn("items-center justify-center rounded-full border-2 border-gray-400 overflow-hidden", className)}
            style={{width: size, height: size}}
        >
            <Image
                className="flex-1"
                width={size}
                height={size}

                resizeMode="cover"
                {...rest}
            />
        </View>
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