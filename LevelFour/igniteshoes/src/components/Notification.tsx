import { Pressable, TouchableOpacity } from 'react-native';
import { OSNotification } from 'react-native-onesignal';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '@components/Text';
import { colors } from '@theme/colors';

type Props = {
    data: OSNotification
    onClose: () => void;
}

type AdditionalDataProps = {
    route?: string
    product_id?: string
}

export function Notification({ data, onClose }: Props) {
    const { navigate } = useNavigation()
    function handleOnPress() {
        const { route, product_id } = data.additionalData as AdditionalDataProps
        console.log(route, product_id)

        if(route === "details" && product_id) {
            navigate("details", {productId: product_id})
            onClose()
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