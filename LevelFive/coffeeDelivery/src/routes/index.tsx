import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { AppRoutes } from "./app.routes";
import { Colors } from "@styles/colors";

export function Routes() {
	return (
		<View style={{flex: 1, backgroundColor: Colors.gray[900]}}>
			<NavigationContainer>
				<AppRoutes/>
			</NavigationContainer>
		</View>
	)
}