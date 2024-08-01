import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { colors } from "@theme/colors";
import { Loading } from "@components/base/Loading";

import { AppStackRoutes } from "@routes/app.stack.routes";
import { AuthRoutes } from "@routes/auth.routes";

import { useAuth } from "@hooks/useAuth";
import { ToastProvider } from "@contexts/ToastContext";

export function Routes() {
    const theme = DefaultTheme
    theme.colors.background = colors.gray[600]

    const { user, isLoadingUserStorageData } = useAuth();

    if (isLoadingUserStorageData) {
        return <Loading/>
    }
    return (
        <NavigationContainer theme={theme}>
            <ToastProvider>
                { user.id
                    ? <AppStackRoutes/>
                    : <AuthRoutes/>
                }
            </ToastProvider>
        </NavigationContainer>
    )
}