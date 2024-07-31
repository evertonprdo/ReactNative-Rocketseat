import { Alert, View } from "react-native"
import { createBottomTabNavigator, type BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { House, SignOut, Tag } from "phosphor-react-native"

import { UserAds } from "@screens/UserAds"
import { Home } from "@screens/Home"

import { colors } from "@theme/colors"

export type AppTabParamList = {
    TabHome: undefined
    userAds: undefined
    singOut: undefined
}

export type AppTabNavigationRoutesProps = BottomTabNavigationProp<AppTabParamList>

const { Navigator, Screen } = createBottomTabNavigator<AppTabParamList>()

export function AppTabRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarInactiveTintColor: colors.gray[400],
                tabBarActiveTintColor: colors.gray[200],
                tabBarStyle: {
                    paddingHorizontal: 56,
                    paddingTop: 20,
                    paddingBottom: 28,
                    backgroundColor: colors.gray[700]
                }
            }}
            initialRouteName="TabHome"
        >
            <Screen
                name="TabHome"
                component={Home}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View className="py-2 px-4 -m-2">
                            <House
                                weight={focused ? "bold" : "regular"}
                                color={color}
                                size={24}
                            />
                        </View>
                    )
                }}
            />

            <Screen
                name="userAds"
                component={UserAds}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View className="py-2 px-4 -m-2">
                            <Tag
                                weight={focused ? "bold" : "regular"}
                                color={color}
                                size={24}
                            />
                        </View>
                    )
                }}
            />

            <Screen
                name="singOut"
                component={ScreenPlaceholder}
                options={{
                    tabBarIcon: () => (
                        <View className="py-2 px-1 -my-2">
                            <SignOut
                                color={colors["red-light"]}
                                size={24}
                            />
                        </View>
                    )
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        e.preventDefault(); 
                        Alert.alert("Sing Out", "Você está saindo do app")
                    }
                })}
            />
        </Navigator>
    )
}

function ScreenPlaceholder() {
    return null
}