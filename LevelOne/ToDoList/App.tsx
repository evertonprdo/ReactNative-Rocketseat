import { ActivityIndicator } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import Home from './src/screens/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
    const [fontsLoaded, error] = useFonts({
        Inter_400Regular: require('./assets/fonts/Inter_400Regular.ttf'),
        Inter_700Bold: require('./assets/fonts/Inter_700Bold.ttf')
    })

    if (!fontsLoaded && !error) {
        return <ActivityIndicator style= {{flex: 1, justifyContent: 'center', alignItems: 'center'}}/>
    }
    
    return (
        <SafeAreaProvider>  
            <StatusBar 
                style='light'
                translucent
            />
            <Home />
        </SafeAreaProvider>
    );
}
