import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { OneSignal } from 'react-native-onesignal';

import "./src/theme/global.css"

import { Routes } from '@routes/index';
import { AuthContextProvider } from '@contexts/AuthContext';
import { Loading } from '@components/Loading';

const oneSignalAppId = process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID as string

OneSignal.initialize(oneSignalAppId)
OneSignal.Notifications.requestPermission(true)

export default function App() {
    const [ fontsLoaded ] = useFonts({Roboto_400Regular, Roboto_700Bold});
    
    return (
        <SafeAreaProvider>
            <StatusBar
                backgroundColor='transparent'
                style='light'
                translucent
            />
            <AuthContextProvider>
                { !fontsLoaded
                    ? <Loading/>
                    : <Routes/>
                }
            </AuthContextProvider>
        </SafeAreaProvider>
    );
}