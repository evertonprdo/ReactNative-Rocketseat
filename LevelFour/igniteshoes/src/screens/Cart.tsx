import { View } from 'react-native';

import { ItemsCart } from '@components/ItemsCart';
import { ScreenHeader } from '@components/ScreenHeader';

export function Cart() {
    return (
        <View className='flex-1'>
            <ScreenHeader title='Carrinho' />
            <ItemsCart />
        </View>
    )
}