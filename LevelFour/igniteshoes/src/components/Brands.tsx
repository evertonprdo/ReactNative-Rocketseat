import { FlatList } from 'react-native';

import { Brand } from '@components/Brand';
import { BRANDS } from '@data/brands';

type Props = {
    onSelect: (value: string) => void;
    selected: string;
}

export function Brands({ onSelect, selected }: Props) {
    return (
        <FlatList
            data={BRANDS}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <Brand
                    image={item.image}
                    isActive={selected === item.name}
                    onPress={() => onSelect(item.name)}
                />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            className='mt-10 max-h-10 min-h-10'
            contentContainerClassName='px-8'
        />
    )
}