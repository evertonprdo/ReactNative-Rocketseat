import { FlatList, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { HeaderList } from '@components/HeaderList';
import { ItemCartCard } from '@components/ItemCartCard';
import { Button } from '@components/Button';

import { useCart } from '@hooks/useCart';

export function ItemsCart() {
    const { cart, removeProductCart } = useCart();
    const hasItemsInCart = cart.length > 0

    async function handleItemRemove(productId: string) {
        try {
            await removeProductCart(productId);

            Toast.show({
                text1: 'Produto removido',
                type: 'success'
            });
        } catch (error) {
            Toast.show({
                text1: 'Não foi possível remover o produto',
                type: 'error'
            });
        }
    }

    return (
        <View className='flex-1'>
            <HeaderList title='Produtos' counter={cart.length} />

            <FlatList
                data={cart}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ItemCartCard
                        data={item}
                        onRemove={() => handleItemRemove(item.id)}
                    />
                )}
                contentContainerClassName='items-center pb-5'
                className='px-8 mt-2'
                showsVerticalScrollIndicator={false}
            />

            {hasItemsInCart &&
                <Button
                    title='Finalizar compra'
                    className='mx-8 my-3'
                />
            }
        </View>


    )
}