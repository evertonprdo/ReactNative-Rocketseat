import { Image, Text, TouchableOpacity, View, type TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons"
import { colors } from "@theme/colors";

type Props = TouchableOpacityProps & {
    name: string
}

export function ExerciseCard({name, ...rest}: Props) {
    return (
        <TouchableOpacity {...rest}>
            <View className="flex-row bg-gray-500 p-2 pr-4 rounded-md mb-3 items-center">
                <Image
                    source={{uri: "https://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg"}}
                    alt="Imagem do exercício"
                    className="size-16 rounded-md mr-4"
                    resizeMode="center"
                />

                <View className="flex-1">
                    <Text className="font-bold text-gray-100 text-lg">
                        { name }
                    </Text>

                    <Text
                        className="font-regular text-sm text-gray-200 my-1"
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        3 séries x 12 repetições
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