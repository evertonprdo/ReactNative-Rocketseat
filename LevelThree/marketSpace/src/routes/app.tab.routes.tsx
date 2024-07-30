import { BottomTabBar } from "@components/BottomTabBar"
import { createBottomTabNavigator, type BottomTabNavigationProp } from "@react-navigation/bottom-tabs"

import { AdDetails } from "@screens/AdDetails"
import { Home } from "@screens/Home"
import { UserAds } from "@screens/UserAds"

import { AppStackRoutes } from "./app.routes"

type AppRoutes = {
    home: undefined
    userAds: undefined
}

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={({navigation, state, descriptors}) => (
                <BottomTabBar
                    state={state}
                    navigation={navigation}
                    descriptors={descriptors}
                />
            )}
        >
            <Screen
                name="home"
                component={Home}
            />

            <Screen
                name="userAds"
                component={UserAds}
            />
        </Navigator>
    )
}