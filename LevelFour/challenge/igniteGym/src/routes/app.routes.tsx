import { Platform } from "react-native";
import { createBottomTabNavigator, type BottomTabNavigationProp } from "@react-navigation/bottom-tabs"

import HomeSvg from "@assets/SvgView/Home";
import HistorySvg from "@assets/SvgView/History";
import ProfileSvg from "@assets/SvgView/Profile";

import { Home } from "@screens/Home"
import { Exercise } from "@screens/Exercise"
import { History } from "@screens/History"
import { Profile } from "@screens/Profile"

import { iconSize } from "@theme/size";
import { colors } from "@theme/colors";
import NotFoundScreen from "@screens/NotFound";

type AppRoutes = {
    home: undefined
    exercise: { exerciseId: string }
    profile: undefined
    history: undefined
    NotFound: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
    return (
        <Navigator
            initialRouteName="home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.green[500],
                tabBarInactiveTintColor: colors.gray[200],
                tabBarStyle: {
                    backgroundColor: colors.gray[600],
                    borderTopWidth: 0,
                    height: Platform.OS === "android" ? "auto" : 96,
                    paddingBottom: 40,
                    paddingTop: 24
                },
            }}
        >
            <Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeSvg
                            fill={color}
                            height={iconSize}
                            width={iconSize}
                        />
                    )
                }}
            />
            <Screen
                name="history"
                component={History}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HistorySvg
                            fill={color}
                            height={iconSize}
                            width={iconSize}
                        />
                    )
                }}
            />
            <Screen
                name="profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <ProfileSvg
                            fill={color}
                            height={iconSize}
                            width={iconSize}
                        />
                    )
                }}
            />
            <Screen
                name="exercise"
                component={Exercise}
                options={{ tabBarButton: () => null }}
            />
            <Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ tabBarButton: () => null }}
            />
        </Navigator>
    )
}