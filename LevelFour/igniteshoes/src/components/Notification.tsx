import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '@components/Text';

type Props = {
    title: string;
    onClose: () => void;
}

export function Notification({ title, onClose }: Props) {
    return (
        <View className='flex-row w-full p-4 pt-12 justify-between items-center bg-gray-200 absolute top-0'>

            <Ionicons
                name='notifications-circle-outline'
                size={20}
                color={"black"}
                className='mr-2'
            />

            <Text className='text-black flex-1'>
                {title}
            </Text>

            <Text>Icon button aqui!</Text>
        </View>
    )
}