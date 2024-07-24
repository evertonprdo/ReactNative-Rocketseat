import type { PropsWithChildren } from "react";
import { Image, ScrollView, Text, View } from "react-native";

import BackgroundImg from "@assets/background.png"
import LogoSvg from "@assets/SvgView/Logo"

export function LoginTemplate({ children }: PropsWithChildren) {
    return (
        <ScrollView
            contentContainerClassName="flex-grow"
            showsVerticalScrollIndicator={false}
        >
            <View className="flex-1 px-10 pb-16">
                <Image
                    className="absolute min-w-full bg-gray-700"
                    alt="Pessoas treinando"
                    source={ BackgroundImg }
                    defaultSource={ BackgroundImg }
                    resizeMode="cover"
                />
                
                <View className="my-24 items-center">
                    <LogoSvg className="align-middle"/>

                    <Text className="text-sm font-regular text-gray-100">
                        Treine sua mente e o seu corpo
                    </Text>
                </View>

                { children }
            </View>
        </ScrollView>
    )
}