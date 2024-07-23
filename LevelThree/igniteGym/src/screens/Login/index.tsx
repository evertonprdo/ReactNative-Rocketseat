import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

import BackgroundImg from "@assets/background.png"
import LogoSvg from "@assets/logo.svg"
import SingIn from "./SingIn";
import { SingUp } from "./SingUp";

export function Login() {
    const [ temp, setTemp ] = useState(true)
    return (
        <ScrollView
            contentContainerClassName="flex-grow"
            showsVerticalScrollIndicator={false}
        >
            <View className="flex-1 px-10 pb-16">
                <Image
                    source={ BackgroundImg }
                    alt="Pessoas treinando"
                    className="absolute min-w-full"
                    resizeMode="cover"
                />
                <View className="my-24 items-center">
                    <LogoSvg className="align-middle"/>
                    <Text className="text-sm font-normal text-gray-100">
                        Treine sua mente e o seu corpo
                    </Text>
                </View>
                {temp ? (
                    <SingIn/>
                ) : (
                    <SingUp/>
                )}
            </View>
        </ScrollView>
    )
}