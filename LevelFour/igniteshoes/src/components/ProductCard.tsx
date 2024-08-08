import { Image, ImageSourcePropType, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Heading, Text } from '@components/Text';

export type ProductCardProps = {
    id: string;
    brand: string;
    name: string;
    price: string;
    thumb: ImageSourcePropType;
    image: ImageSourcePropType;
    quantity: number;
    size: number;
    description: string;
}

type Props = TouchableOpacityProps & {
    data: ProductCardProps;
}

export function ProductCard({ data, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <View className='size-40 bg-gray-500 rounded-md items-center p-2 m-2'>
                <Image
                    source={data.thumb}
                    alt='Imagem do produto'
                    className='flex-1'
                    resizeMode='cover'
                />

                <Heading className='text-white text-lg mt-2'>
                    {data.name}
                </Heading>

                <Text className='text-gray-200 text-sm'>
                    R$ {data.price}
                </Text>
            </View>
        </TouchableOpacity>
    )
}