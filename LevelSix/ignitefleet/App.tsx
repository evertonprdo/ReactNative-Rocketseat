import 'react-native-get-random-values'
import './src/libs/dayjs'

import { StatusBar } from 'expo-status-bar';
import { AppProvider, UserProvider } from '@realm/react'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { ThemeProvider } from "styled-components/native"

import theme from "./src/theme";
import { REALM_APP_ID } from '@env';

import { Loading } from './src/components/Loading';
import { SingIn } from './src/screens/SingIn';
import { Routes } from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RealmProvider } from './src/libs/realm';

export default function App() {
  const [isFontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if (!isFontsLoaded) return <Loading />

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}>

          <StatusBar
            style="light"
            backgroundColor='transparent'
            translucent
          />
          <UserProvider fallback={SingIn}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>

        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}