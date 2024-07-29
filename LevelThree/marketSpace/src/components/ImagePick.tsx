import { Image, View } from "react-native";
import { PencilSimpleLine } from "phosphor-react-native"

import UserImg from "@assets/avatar.png"
import { colors } from "@theme/colors";
import cn from "@utils/cn";

type ImagePickProps = {
    className?: string
}
function ImagePick({ className }: ImagePickProps) {
    return (
        <View
            className={cn("size-[88px] rounded-full border-[3px] border-blue-light", className)}
        >
            <Image
                source={ UserImg }
                className="w-full h-full"
                resizeMode="cover"
            />
                <EditIcon/>
        </View>
    )
}

function EditIcon() {
    return (
        <View className="absolute rounded-full bg-blue-light p-3 bottom-0 -right-2">
            <PencilSimpleLine color={colors.gray[600]} size={16}/>
        </View>
    )
}

export { ImagePick }