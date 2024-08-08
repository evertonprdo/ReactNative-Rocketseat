import { Image, Platform, ScrollView, View } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

import { useCart } from '@hooks/useCart';

import { PRODUCTS } from '@data/products';
import { Sizes } from '@components/Sizes';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ScreenHeader } from '@components/ScreenHeader';
import { ProductCardProps } from '@components/ProductCard';
import { Heading, Text } from '@components/Text';
import Toast from 'react-native-toast-message';

type RouteParamsProps = {
    productId: string;
}

export function Details() {
    const [size, setSize] = useState('35');
    const [quantity, setQuantity] = useState('1');
    const [product, setProduct] = useState<ProductCardProps>({} as ProductCardProps);

    const route = useRoute();
    const { navigate } = useNavigation();
    const { addProductCart } = useCart();

    const { productId } = route.params as RouteParamsProps;

    async function handleAddProductToCart() {
        try {
            await addProductCart({
                id: product.id,
                name: product.name,
                image: product.thumb,
                quantity: Number(quantity),
                size: product.size
            });
            
            Toast.show({
                text1: 'Produto adicionado no carrinho',
                type: 'success'
            });
            
            navigate('cart');
        } catch (error) {
            console.log(error)
            
            Toast.show({
                text1: 'Não foi possível adicionar o produto no carrinho',
                type: 'error'
            });
            
        }
    }

    useFocusEffect(useCallback(() => {
        const selected = PRODUCTS.filter(item => item.id === productId)[0] as ProductCardProps;
        setProduct(selected);
    }, [productId]));

    return (
        <View>
            <ScreenHeader title="Detalhes do Produto" />

            <ScrollView>
                <Image
                    key={String(new Date().getTime())}
                    source={product.image}
                    className='size-56 self-center'
                    resizeMode={Platform.OS === "android" ? "contain" : "cover"}
                    alt="Imagem do produto"
                />

                <View className='p-6 justify-between'>
                    <View className='flex-row w-full justify-between items-center'>
                        <View>
                            <Heading className='text-white text-xl'>
                                {product.name}
                            </Heading>

                            <Heading className='text-gray-200 font-bold'>
                                R$ {product.price}
                            </Heading>
                        </View>

                        <View className='items-end'>
                            <Text className='text-gray-200 text-justify pt-2'>
                                Quantidade
                            </Text>

                            <Input
                                onChangeText={setQuantity}
                                keyboardType='numeric'
                                value={quantity}
                                className='w-14'
                            />
                        </View>
                    </View>

                    <Text className='text-gray-200 text-justify pt-2'>
                        {product.description}
                    </Text>

                    <Sizes onSelect={setSize} selected={size}/>

                    <Button title='Adicionar no carrinho' onPress={handleAddProductToCart}/>
                </View>
            </ScrollView>
        </View>
    )
}