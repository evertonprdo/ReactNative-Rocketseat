import { StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import Toast from 'react-native-toast-message';
import { CustomToasts } from '@components/Toast';

import { NotificationClickEvent, OneSignal } from "react-native-onesignal"
import { tagUserInfoCreate } from '@notifications/notificationsTags';

import "@theme/global.css"

import { Loading } from '@components/Loading';

import { CartContextProvider } from '@contexts/CartContext';
import { Routes } from '@routes/index';
import { useEffect } from 'react';

const oneSignalAppId = process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID as string;

OneSignal.initialize(oneSignalAppId)
OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate()

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      const { actionId } = event.result

      switch(actionId) {
        case "1":
          console.log("Ver todos")
          break
        case "2":
          console.log("Ver pedido")
          break
        default:
          console.log("Nenhum botão foi precionado!")
          break
      }
    }

    OneSignal.Notifications.addEventListener(
      "click",
      handleNotificationClick
    )

    return () => OneSignal.Notifications.removeEventListener(
      "click",
      handleNotificationClick
    )
  }, [])
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