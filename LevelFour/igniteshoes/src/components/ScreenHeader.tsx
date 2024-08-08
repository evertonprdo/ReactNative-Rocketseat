import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@theme/colors';
import { Heading } from '@components/Text';

type Props = {
    title: string;
}

export function ScreenHeader({ title }: Props) {
    const { goBack } = useNavigation();

    return (
        <View className='flex-row bg-gray-600 pb-6 pt-16 justify-between px-6'>
            <Pressable onPress={goBack}>
                <Feather
                    name='arrow-left'
                    color={colors.green[500]}
                    size={24}
                />
            </Pressable>

            <Heading className='text-gray-100 text-xl'>
                {title}
            </Heading>

            <View className='size-6'/>
        </View>
    )
}