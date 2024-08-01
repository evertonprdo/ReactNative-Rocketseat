import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla"
import { SafeAreaProvider } from 'react-native-safe-area-context';

import "./src/theme/global.css"

import { Loading } from '@components/base/Loading';
import { Routes } from '@routes/index';

import { AuthContextProvider } from '@contexts/AuthContext';

export default function App() {
    const [ fontLoaded ] = useFonts({Karla_400Regular, Karla_700Bold})

    return (
        <SafeAreaProvider>
            <View className='bg-gray-600 flex-1'>
                <StatusBar
                    style="dark"
                    backgroundColor='transparent'
                    translucent
                />

                <AuthContextProvider>
                    { !fontLoaded
                        ? <Loading/>
                        : <Routes/>
                    }
                </AuthContextProvider>
            </View>
        </SafeAreaProvider>
    );
}