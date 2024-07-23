import { Text, TouchableOpacity, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons"

import { colors } from "@theme/colors";
import { UserPhoto } from "./UserPhoto";
import cn from "@utils/cn";

type HeaderProps = {
    title?: string
    children?: React.ReactNode
    className?: string 
}

function Header({ title, children, className }: HeaderProps) {
    return (
        <SafeAreaView style={{backgroundColor: colors.gray[600], paddingTop: 6}}>
            <View className={cn("pb-6 px-8 items-center", className)}>
                { title && (
                    <Text className="text-gray-100 text-xl font-bold">
                        { title }
                    </Text>
                )}

                { children }
            </View>
        </SafeAreaView>
    )
}

function Home() {
    return (
        <View className="flex-row w-full items-center">
            <UserPhoto
                source={{ uri: "https://avatars.githubusercontent.com/u/170630423?v=4" }}
                size={64}
                alt="Imagem do usuário"
                className="mr-4"
            />

            <View className="justify-center flex-1">
                <Text className="text-gray-100 text-base">
                    Olá
                </Text>
                <Text className="text-gray-100 text-base font-bold">
                    Everton
                </Text>
            </View>

            <TouchableOpacity>
                <MaterialIcons
                    name="logout"
                    color={colors.gray[200]}
                    size={28}
                />
            </TouchableOpacity>
        </View>
    )
}

Header.Home = Home

export { Header }