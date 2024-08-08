import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HeaderList } from '@components/HeaderList';

import { ProductCard, ProductCardProps } from '@components/ProductCard';
import { PRODUCTS } from '@data/products';

type Props = {
    brand: string;
    data: ProductCardProps[];
}

export function Products({ data, brand }: Props) {
    const { navigate } = useNavigation();

    return (
        <View className='flex-1'>
            <HeaderList
                title={brand}
                counter={PRODUCTS.length}
            />

            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ProductCard
                        data={item}
                        onPress={() => navigate('details', { productId: item.id })}
                    />
                )}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerClassName='items-center pb-20'
                columnWrapperClassName='w-full'
            />
        </View>
    )
}