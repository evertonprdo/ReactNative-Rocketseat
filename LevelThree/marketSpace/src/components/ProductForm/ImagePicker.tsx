import { Pressable, View } from "react-native";
import { Plus } from "phosphor-react-native";

import { TextApp } from "@components/base/Text";
import { colors } from "@theme/colors";

export function ImagePicker() {
    return (
        <View className="gap-4">
            <TextApp className="font-bold">Imagens</TextApp>

            <TextApp className="text-sm text-gray-300">Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!</TextApp>

            <View className="flex-row gap-2 w-full">
                <Pressable
                    className="bg-gray-500 rounded-md items-center justify-center"
                    style={{ width: 100, height: 100 }}
                >
                    <Plus color={colors.gray[400]} size={24} />
                </Pressable>
            </View>
        </View>
    )
}