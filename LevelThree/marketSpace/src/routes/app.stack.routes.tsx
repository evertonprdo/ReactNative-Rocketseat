import { createNativeStackNavigator, type NativeStackNavigationProp } from "@react-navigation/native-stack"
import { type NavigatorScreenParams } from "@react-navigation/native"

import { ProductDetails } from "@screens/ProductDetails"
import { UserProductDetails } from "@screens/UserProductDetails"
import { CreateProduct } from "@screens/CreateProduct"
import { EditProduct } from "@screens/EditProduct"

import { AppTabRoutes, AppTabParamList } from "@routes/app.tab.routes"

export type AppStackParamList = {
    Home: NavigatorScreenParams<AppTabParamList>
    ProductDetails: {id: string}
    UserProductDetails: {id: string}
    CreateProduct: undefined
    EditProduct: undefined
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
                name="ProductDetails"
                component={ProductDetails}
            />

            <Screen
                name="UserProductDetails"
                component={UserProductDetails}
            />

            <Screen
                name="CreateProduct"
                component={CreateProduct}
            />

            <Screen
                name="EditProduct"
                component={EditProduct}
            />
        </Navigator>
    )
}