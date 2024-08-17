import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "@screens/Home";
import Cart from "@screens/Cart";
import Product from "@screens/Product";

export type RootStackParamList = {
  home: undefined,
  product: undefined,
  cart: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        statusBarTranslucent:true,
        statusBarStyle: "light",
        statusBarColor: "transparent"
      }}
    >
      <Screen
        name="home"
        component={Home}
      />

      <Screen
        name="product"
        component={Product}
        options={{statusBarStyle: "light"}}
      />

      <Screen
        name="cart"
        component={Cart}
        options={{statusBarStyle: "dark"}}
      />
    </Navigator>
  )
}