import { View } from "react-native"
import { createBottomTabNavigator, type BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { House, SignOut, Tag } from "phosphor-react-native"

import { UserProducts } from "@screens/UserProducts"
import { Home } from "@screens/Home"

import { colors } from "@theme/colors"
import { useAuth } from "@hooks/useAuth"
import { useEffect } from "react"
import { Loading } from "@components/base/Loading"

export type AppTabParamList = {
    TabHome: undefined
    UserProducts: undefined
    singOut: undefined
}

export type AppTabNavigationRoutesProps = BottomTabNavigationProp<AppTabParamList>

const { Navigator, Screen } = createBottomTabNavigator<AppTabParamList>()

export function AppTabRoutes() {
    const { singOut } = useAuth()

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarInactiveTintColor: colors.gray[400],
                tabBarActiveTintColor: colors.gray[200],
                tabBarStyle: {
                    paddingHorizontal: 28,
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
                name="UserProducts"
                component={UserProducts}
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
                        <View className="py-2 px-1 -my-1">
                            <SignOut
                                color={colors["red-light"]}
                                size={24}
                            />
                        </View>
                    )
                }}
                listeners={() => ({
                    tabPress: (e) => {
                        e.preventDefault(); 
                        singOut();
                    }
                })}
            />
        </Navigator>
    )
}

function ScreenPlaceholder({ navigation }: any) {
    useEffect(() => {
        navigation.navigate("Home")
    }, [])
    
    return <Loading/>
}