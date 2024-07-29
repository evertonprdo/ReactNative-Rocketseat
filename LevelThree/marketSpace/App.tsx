import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla"
import { SafeAreaProvider } from 'react-native-safe-area-context';

import "./src/theme/global.css"

import { Loading } from '@components/atoms/Loading';
import { Routes } from '@routes/index';
import { Home } from '@screens/Home';

export default function App() {
    const [ fontLoaded ] = useFonts({Karla_400Regular, Karla_700Bold})

    return (
        <SafeAreaProvider>
            <View className='bg-gray-600 flex-1'>
                <StatusBar style="auto" />
                { !fontLoaded
                    ? <Loading/>
                    : <Home/>
                }
            </View>
        </SafeAreaProvider>
    );
}