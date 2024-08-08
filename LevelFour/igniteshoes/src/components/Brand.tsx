import cn from "@utils/cn";
import { Image, ImageSourcePropType, Platform, Pressable, PressableProps } from "react-native";

type Props = PressableProps & {
    image: ImageSourcePropType;
    isActive: boolean;
}

export function Brand({image, isActive, className, ...rest}: Props) {
    const resizeMode = Platform.OS === "android" ? "contain" : "cover"
    
    return (
        <Pressable
            className={cn(
                "mr-3 w-24 h-10 bg-gray-600 border border-transparent rounded-md justify-center items-center overflow-hidden",
                {"border-green-500": isActive},
                className
            )}
            {...rest}
        >
            <Image
                source={image}
                className="w-20 h-7"
                resizeMode={resizeMode}
            />
        </Pressable>
    )
}