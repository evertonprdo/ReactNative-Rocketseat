import { Image, Pressable, PressableProps, View } from "react-native";
import { PencilSimpleLine } from "phosphor-react-native"

import UserImg from "@assets/avatar.png"
import { colors } from "@theme/colors";
import cn from "@utils/cn";

type ImagePickProps = {
    className?: string
    children?: React.ReactNode
}
function UserImage({ className, children }: ImagePickProps) {
    return (
        <View
            className={cn("size-[88px] rounded-full border-[3px] border-blue-light", className)}
        >
            <Image
                source={ UserImg }
                className="w-full h-full"
                resizeMode="cover"
            />
                {children}
        </View>
    )
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

export { UserImage }