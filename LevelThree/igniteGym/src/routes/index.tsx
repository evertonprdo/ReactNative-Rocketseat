import { useContext } from "react";
import { View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { colors } from "@theme/colors";
import { Loading } from "@components/Loading";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { ToastProvider } from "@contexts/ToastContext";
import { AuthContext } from "@contexts/AuthContext";
import { useAuth } from "@hooks/useAuth";

export function Routes() {
    const contextData = useContext(AuthContext);
    const { user, isLoadingUserStorageData } = useAuth();

    const theme = DefaultTheme
    theme.colors.background = colors.gray[700]

    if(isLoadingUserStorageData) return <Loading/>

    return (
        <View className="bg-gray-700 flex-1">
            <NavigationContainer theme={theme}>
                <ToastProvider>
                    { user.id ? <AppRoutes/> : <AuthRoutes/> }
                    
                </ToastProvider>
            </NavigationContainer>
        </View>
    )
}