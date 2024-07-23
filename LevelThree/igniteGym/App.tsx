import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import "./src/theme/global.css"

import { Login } from '@screens/Login';

export default function App() {
    const [ isLoaded ] = useFonts({Roboto_400Regular, Roboto_700Bold});
    return (
        <View className='flex-1 bg-gray-700'>
            <StatusBar 
                style='dark'
                translucent
                backgroundColor='transparent'
            />
            { !isLoaded ? <ActivityIndicator/> : <Login/>}
        </View>
    );
}