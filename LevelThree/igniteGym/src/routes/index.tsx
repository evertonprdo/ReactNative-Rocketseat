import { useContext } from "react";
import { View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { colors } from "@theme/colors";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { ToastProvider } from "@contexts/ToastContext";
import { AuthContext } from "@contexts/AuthContext";

export function Routes() {
    const contextData = useContext(AuthContext);

    const theme = DefaultTheme
    theme.colors.background = colors.gray[700]

    return (
        <View className="bg-gray-700 flex-1">
            <NavigationContainer theme={theme}>
                <ToastProvider>
                    <AuthRoutes/>
                </ToastProvider>
            </NavigationContainer>
        </View>
    )
}