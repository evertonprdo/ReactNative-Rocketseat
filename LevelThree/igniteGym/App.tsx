import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import "./src/theme/global.css"
import SingIn from '@screens/SingIn';

export default function App() {
    const [ isLoaded ] = useFonts({Roboto_400Regular, Roboto_700Bold});
    return (
        <View className='flex-1 bg-gray-700'>
            <StatusBar 
                style='dark'
                translucent
                backgroundColor='transparent'
            />
            { !isLoaded ? <ActivityIndicator/> : <SingIn/>}
        </View>
    );
}