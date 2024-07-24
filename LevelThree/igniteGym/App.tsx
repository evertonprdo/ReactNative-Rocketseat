import { ActivityIndicator} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import "./src/theme/global.css"

import { Routes } from '@routes/index';
import { AuthContextProvider } from '@contexts/AuthContext';

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
                    ? <ActivityIndicator/>
                    : <Routes/>
                }
            </AuthContextProvider>
        </SafeAreaProvider>
    );
}