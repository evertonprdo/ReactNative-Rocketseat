import { ActivityIndicator} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import "./src/theme/global.css"

import { Routes } from '@routes/index';
import { ToastProvider } from '@components/Toast';

export default function App() {
    const [ isLoaded ] = useFonts({Roboto_400Regular, Roboto_700Bold});
    return (
        <SafeAreaProvider>
            <StatusBar
                backgroundColor='transparent'
                style='light'
                translucent
            />

            { !isLoaded 
                ? <ActivityIndicator/>
                : (
                    <ToastProvider>
                        <Routes/>
                    </ToastProvider>
                )
            }
        </SafeAreaProvider>
    );
}