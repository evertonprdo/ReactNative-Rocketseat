import { StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import Toast from 'react-native-toast-message';
import { CustomToasts } from '@components/Toast';

import { OneSignal } from "react-native-onesignal"

import "@theme/global.css"

import { Loading } from '@components/Loading';

import { CartContextProvider } from '@contexts/CartContext';
import { Routes } from '@routes/index';

const oneSignalAppId = process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID as string;
OneSignal.initialize(oneSignalAppId)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
      
      <Toast visibilityTime={2000} config={CustomToasts}/>
    </>
  );
}