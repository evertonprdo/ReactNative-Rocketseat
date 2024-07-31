import { createNativeStackNavigator, type NativeStackNavigationProp } from "@react-navigation/native-stack"
import { type NavigatorScreenParams } from "@react-navigation/native"

import { AdDetails } from "@screens/AdDetails"
import { UserAdDetails } from "@screens/UserAdDetails"
import { CreateAd } from "@screens/CreateAd"
import { EditAd } from "@screens/EditAd"

import { AppTabRoutes, AppTabParamList } from "@routes/app.tab.routes"

export type AppStackParamList = {
    Home: NavigatorScreenParams<AppTabParamList>
    adDetails: undefined
    userAdDetails: undefined
    createAd: undefined
    editAd: undefined
}

export type AppHomeNavigatorRoutesProps = NativeStackNavigationProp<AppStackParamList>

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

export function AppStackRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Home"
        >
            <Screen
                name="Home"
                component={AppTabRoutes}

            />

            <Screen
                name="adDetails"
                component={AdDetails}
            />

            <Screen
                name="userAdDetails"
                component={UserAdDetails}
            />

            <Screen
                name="createAd"
                component={CreateAd}
            />

            <Screen
                name="editAd"
                component={EditAd}
            />
        </Navigator>
    )
}