import "react-native-gesture-handler"

import { useEffect, useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from "expo-font";

import { Colors } from "@styles/colors";
import { Baloo2_700Bold } from '@expo-google-fonts/baloo-2'
import { Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto'

import SplashScreenView from "@components/SplashScreen";

import { Routes } from "@routes/index";

export default function App() {
  const [isAllReady, setIsAllReady] = useState(false);
  const [fakePreload, setFakePreload] = useState(false);

  const [isFontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular, Baloo2_700Bold })

  useEffect(() => {
    setTimeout(() => {
      setFakePreload(true)
    }, 5000)
  }, [])

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: fakePreload ? Colors.gray[900] : Colors.app.purpleDark }}
    >
      <SafeAreaProvider>
        {isAllReady
          ? <Routes />
          : <SplashScreenView isAnimationAllowedToEnd={fakePreload} setIsAllReady={setIsAllReady} />
        }
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}