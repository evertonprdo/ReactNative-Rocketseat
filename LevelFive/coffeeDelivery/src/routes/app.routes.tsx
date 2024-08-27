import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "@screens/Home";
import Cart from "@screens/Cart";
import Product from "@screens/Product";
import { Colors } from "@styles/colors";
import Purchase from "@screens/Purchase";

export type RootStackParamList = {
  home: undefined,
  product: { id: number },
  cart: undefined
  purchase: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
        statusBarStyle: "light",
        statusBarColor: "transparent",
        contentStyle: { flex: 1, backgroundColor: Colors.gray[900] }
      }}
    >
      <Screen
        name="home"
        component={Home}
      />

      <Screen
        name="product"
        component={Product}
        options={{ statusBarStyle: "light" }}
      />

      <Screen
        name="cart"
        component={Cart}
        options={{ statusBarStyle: "dark" }}
      />
      <Screen
        name="purchase"
        component={Purchase}
        options={{ statusBarStyle: "dark" }}
      />
    </Navigator>
  )
}