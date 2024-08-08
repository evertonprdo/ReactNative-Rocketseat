import { FlatList, View } from 'react-native';

import { Size } from '@components/Size';
import { Heading, Text } from '@components/Text';

type Props = {
    onSelect: (value: string) => void;
    selected: string;
}

export function Sizes({ onSelect, selected }: Props) {

    return (
        <View className='my-8'>
            <Heading className='text-gray-200 mb-3'>
                Tamanhos
            </Heading>

            <FlatList
                data={['35', '36', '37', '38', '39', '40', '41']}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Size
                        size={item}
                        isActive={selected === item}
                        onPress={() => onSelect(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName='pr-8'
                className='max-h-10 min-h-10'
            />
        </View>
    )
}