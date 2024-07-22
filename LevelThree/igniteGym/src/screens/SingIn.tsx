import { Image, View } from "react-native";

import BackgroundImg from "@assets/background.png"
import LogoSvg from "@assets/logo.svg"

export default function SingIn() {
    return (
        <View className="flex-1">
            <Image
                source={ BackgroundImg }
                alt="Pessoas treinando"
                className="absolute min-w-full"
                resizeMode="cover"
            />

        </View>
    )
}