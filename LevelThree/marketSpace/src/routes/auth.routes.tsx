import { createNativeStackNavigator, type NativeStackNavigationProp } from "@react-navigation/native-stack";

import { SingIn } from "@screens/SingIn";
import { SingUp } from "@screens/SingUp";

export type AuthParamList = {
    singIn: undefined
    singUp: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthParamList>

const { Navigator, Screen } = createNativeStackNavigator<AuthParamList>();

export function AuthRoutes() {
    return (
        <Navigator
            screenOptions={{headerShown: false}}
        >
            <Screen
                name="singIn"
                component={SingIn}
            />
            <Screen
                name="singUp"
                component={SingUp}
            />
        </Navigator>
    )
}