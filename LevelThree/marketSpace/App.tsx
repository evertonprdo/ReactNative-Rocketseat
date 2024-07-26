import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla"

import "./src/theme/global.css"

import { SingIn } from '@screens/SingIn';
import { Loading } from '@components/atoms/Loading';

export default function App() {
    const [ fontLoaded ] = useFonts({Karla_400Regular, Karla_700Bold})

    return (
        <View className='bg-gray-600 flex-1'>
            <StatusBar style="auto" />
            { !fontLoaded
                ? <Loading/>
                : <SingIn/>
            }
        </View>
    );
}