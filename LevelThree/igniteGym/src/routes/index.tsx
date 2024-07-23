import { View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { colors } from "@theme/colors";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
    const theme = DefaultTheme
    theme.colors.background = colors.gray[700]

    return (
        <View className="bg-gray-700 flex-1">
            <NavigationContainer theme={theme}>
                <AppRoutes/>
            </NavigationContainer>
        </View>
    )
}