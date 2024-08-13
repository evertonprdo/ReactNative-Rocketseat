import "react-native-gesture-handler"

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';

import { Baloo2_700Bold } from '@expo-google-fonts/baloo-2'
import { Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto'
import { useFonts } from "expo-font";

import { Routes } from "@routes/index";

export default function App() {
  const [isFontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular, Baloo2_700Bold })

  if (!isFontsLoaded) return null

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>

        <StatusBar
          style="light"
          backgroundColor="transparent"
          translucent
        />

        <Routes />

      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}