import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { colors } from "@theme/colors";

import { AuthRoutes } from "@routes/auth.routes";
import { AppRoutes } from "./app.tab.routes";

export function Routes() {
    const theme = DefaultTheme
    theme.colors.background = colors.gray[600]

    return (
        <NavigationContainer theme={theme}>
            <AppRoutes/>
        </NavigationContainer>
    )
}