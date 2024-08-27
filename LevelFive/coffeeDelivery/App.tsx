import "react-native-gesture-handler"

import { useEffect, useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from "expo-font";

import { Baloo2_700Bold } from '@expo-google-fonts/baloo-2'
import { Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto'

import SplashScreenView from "@components/SplashScreen";

import { Routes } from "@routes/index";
import { StatusBar } from "react-native";
import { CartProvider } from "@contexts/cartContext";

export default function App() {
  const [isAllReady, setIsAllReady] = useState(false);
  const [fakePreload, setFakePreload] = useState(false);

  const [isFontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular, Baloo2_700Bold })

  useEffect(() => {
    setTimeout(() => {
      setFakePreload(true)
    }, 5000)
  }, [])

  if (!isAllReady) {
    return (
      <SplashScreenView
        isAnimationAllowedToEnd={fakePreload}
        setIsAllReady={setIsAllReady}
      />
    )
  }

  return (
    <>
      <StatusBar translucent backgroundColor={"transparent"} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <CartProvider>
            <Routes />
          </CartProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </>
  );
}