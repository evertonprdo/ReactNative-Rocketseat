import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { colors } from "@theme/colors";

import { AppStackRoutes } from "@routes/app.stack.routes";

export function Routes() {
    const theme = DefaultTheme
    theme.colors.background = colors.gray[600]

    return (
        <NavigationContainer theme={theme}>
            <AppStackRoutes/>
        </NavigationContainer>
    )
}