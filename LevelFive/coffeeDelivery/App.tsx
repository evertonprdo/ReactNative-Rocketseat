import "react-native-gesture-handler"

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Baloo2_700Bold } from '@expo-google-fonts/baloo-2'
import { Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto'
import { useFonts } from "expo-font";

import { Routes } from "@routes/index";
import SplashScreenView from "@components/SplashScreen";
import { useState } from "react";

export default function App() {
  const [isAllReady, setIsAllReady] = useState(false);
  const [isFontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular, Baloo2_700Bold })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>

        {isAllReady
          ? <Routes />
          : <SplashScreenView isAnimationAllowedToEnd={isFontsLoaded} setIsAllReady={setIsAllReady} />
        }

      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}