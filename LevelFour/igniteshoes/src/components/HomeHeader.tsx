import { Image, View } from "react-native";
import { Feather } from '@expo/vector-icons';

import userPhotoDefault from "@assets/userPhotoDefault.png";
import { colors } from "@theme/colors";
import { Heading, Text } from "@components/Text";

export function HomeHeader() {
    return (
        <View className="flex-row pt-16 pb-5 px-8 bg-gray-600 items-center">
            <Image
                source={userPhotoDefault}
                className="size-16 mr-4 border-2 border-gray-400 rounded-full"
            />

            <View className="flex-1">
                <Text className="text-gray-100">
                    Olá
                </Text>

                <Heading className="text-gray-100 font-bold">
                    Rodrigo gonçalves
                </Heading>
            </View>

            <Feather
                name="log-out"
                color={colors.gray[200]}
                size={28}
            />
        </View>
    )
}