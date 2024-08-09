import { Pressable, TouchableOpacity, Linking, Text } from 'react-native';
import { OSNotification } from 'react-native-onesignal';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@theme/colors';

type Props = {
    data: OSNotification
    onClose: () => void;
}

export function Notification({ data, onClose }: Props) {
    function handleOnPress() {
        if(data.launchURL) {
            Linking.openURL(data.launchURL);
            onClose();
        }
    }

    return (
        <Pressable
            className='flex-row w-full p-4 pt-12 justify-between items-center bg-gray-200 absolute top-0'
            onPress={handleOnPress}
        >
            <Ionicons
                name='notifications-outline'
                size={20}
                color={"black"}
                className='mr-2'
            />

            <Text className='text-black flex-1'>
                {data.title}
            </Text>

            <TouchableOpacity onPress={onClose}>
                <Ionicons
                    name='close'
                    size={15}
                    color={colors.gray[600]}
                    className='mr-2'
                />
            </TouchableOpacity>
        </Pressable>
    )
}