import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';

import { NunitoSans_400Regular, NunitoSans_700Bold, useFonts } from '@expo-google-fonts/nunito-sans'

import theme from 'src/theme';
import { Home } from '@screens/Home';
import { Statistics } from '@screens/Statistics';
import { NewMeal } from '@screens/NewMeal';

export default function App() {
    const [ fontsLoaded ] = useFonts({ NunitoSans_400Regular, NunitoSans_700Bold })

    return (
        <SafeAreaProvider>
            <ThemeProvider theme={theme}>
                <StatusBar
                    style='dark'
                    backgroundColor='transparent'
                    translucent
                />

                { !fontsLoaded ? <ActivityIndicator /> : <Statistics/> }
            </ThemeProvider>
        </SafeAreaProvider>
    );
}