import { useEffect, useState } from "react";
import { View } from "react-native";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";
import { NavigationHelpers, ParamListBase, TabNavigationState } from "@react-navigation/native";
import { House, SignOut, Tag } from "phosphor-react-native";

import { colors } from "@theme/colors";
import { PressableIcon } from "./base/PressableIcon";
import { BottomTabDescriptorMap } from "@react-navigation/bottom-tabs/lib/typescript/src/types";

type BottomTabBarProps = {
    state: TabNavigationState<ParamListBase>
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>
    descriptors: BottomTabDescriptorMap
}
export function BottomTabBar({ state, navigation, descriptors }: BottomTabBarProps) {
    console.log(state)
    const [ currentScreen, setCurrentScreen ] = useState("");
    
    useEffect(() => {
        setCurrentScreen(state.history[state.history.length - 1].key)
    }, [state])
    return (
        <View className="flex-row justify-between px-11 pt-3 pb-4 bg-gray-700">
            <PressableIcon
                onPress={() => navigation.navigate("home")}
            >
                <House
                    weight="bold"
                    color={currentScreen === state.routes[0].key ? colors.gray[200] : colors.gray[400]}
                    size={24}
                />
            </PressableIcon>

            <PressableIcon
                onPress={() => navigation.navigate("userAds")}
            >
                <Tag
                    color={currentScreen === state.routes[1].key ? colors.gray[200] : colors.gray[400]}
                    size={24}
                />
            </PressableIcon>

            <PressableIcon>
                <SignOut
                    color={colors["red-light"]}
                    size={24}
                />
            </PressableIcon>
        </View>
    )
}