import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "@screens/Home";
import Cart from "@screens/Cart";
import Product from "@screens/Product";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
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