import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"

import { AdDetails } from "@screens/AdDetails"
import { AppRoutes } from "./app.tab.routes"

import { Home } from "@screens/Home"
import { UserAds } from "@screens/UserAds"

type AppHomeRoutes = {
    homeHome: undefined
    adDetails: undefined
}

export type AppHomeNavigatorRoutesProps = NativeStackNavigationProp<AppHomeRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AppHomeRoutes>();

export function AppStackRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen
                name="homeHome"
                component={AppRoutes}
            />

            <Screen
                name="adDetails"
                component={AdDetails}
            />
        </Navigator>
    )
}