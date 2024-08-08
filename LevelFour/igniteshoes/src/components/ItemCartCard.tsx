import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Heading, Text } from "@components/Text";
import { StorageCartProps } from '@storage/storageCart';
import { colors } from '@theme/colors';

type Props = {
    onRemove: () => void;
    data: StorageCartProps;
}

export function ItemCartCard({ data, onRemove }: Props) {
    const resizeMode = Platform.OS === "android" ? "contain" : "cover"

    return (
        <View className='flex-row w-full h-20 bg-gray-500 rounded-md items-center px-4 mb-2'>
            <Image
                className='w-16 h-16'
                source={data.image}
                alt='Imagem do produto'
                resizeMode={resizeMode}
            />

            <View className='flex-1 ml-2'>
                <Heading className='text-white text-lg mt-2'>
                    {data.name}
                </Heading>

                <Text className='text-gray-200'>
                    {data.quantity} unidades
                </Text>
            </View>

            <TouchableOpacity onPress={onRemove}>
                <Feather
                    name='trash'
                    size={24}
                    color={colors.red[500]}
                />
            </TouchableOpacity>
        </View>
    )
}