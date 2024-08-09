import { Image, Text, TouchableOpacity, View, type TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons"
import { colors } from "@theme/colors";

import { api } from "@services/api";

import type { ExerciseDTO } from "@dtos/ExerciseDTO";

type Props = TouchableOpacityProps & {
    data: ExerciseDTO
}

export function ExerciseCard({data, ...rest}: Props) {
    return (
        <TouchableOpacity {...rest}>
            <View className="flex-row bg-gray-500 p-2 pr-4 rounded-md mb-3 items-center">
                <Image
                    source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }}
                    alt="Imagem do exercício"
                    className="size-16 rounded-md mr-4"
                    resizeMode="cover"
                />

                <View className="flex-1">
                    <Text className="font-bold text-gray-100 text-lg">
                        { data.name }
                    </Text>

                    <Text
                        className="font-regular text-sm text-gray-200 my-1"
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {data.series} séries x {data.repetitions} repetições
                    </Text>

                </View>

                <Entypo
                    name="chevron-thin-right"
                    color={colors.gray[300]}
                    size={18}
                />
            </View>
        </TouchableOpacity>
    )
}