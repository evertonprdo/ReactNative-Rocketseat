import { Text, type TextProps, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons, Feather } from "@expo/vector-icons"

import { colors } from "@theme/colors";
import { UserPhoto } from "./UserPhoto";
import cn from "@utils/cn";

import BodySvg from "@assets/SvgView/Body"

type HeaderProps = {
    children?: React.ReactNode
    className?: string
    paddingTop?: number
}

function Header({ children, paddingTop = 24, className }: HeaderProps) {
    const { top } = useSafeAreaInsets();
    paddingTop = top + paddingTop

    return (
        <View className={cn("bg-gray-600 pb-6 px-8 items-center", className)} style={{ paddingTop }}>

            {children}
        </View>
    )
}

function Title({ children }: TextProps) {
    return (
        <Text className="text-gray-100 text-xl font-bold">
            {children}
        </Text>
    )
}

function Home() {
    return (
        <>
            <UserPhoto
                source={{ uri: "https://avatars.githubusercontent.com/u/170630423?v=4" }}
                size={64}
                alt="Imagem do usuário"
                className="mr-4"
            />

            <View className="justify-center flex-1">
                <Text className="text-gray-100 text-base font-regular">
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
        </>
    )
}

function Exercises({ ...rest }: TouchableOpacityProps) {
    return (
        <>
            <TouchableOpacity
                {...rest}
            >
                <Feather
                    name="arrow-left"
                    color={colors.green[500]}
                    size={24}
                />
            </TouchableOpacity>

            <View className="flex-row w-full justify-between mt-4 items-center">
                <Text className="text-gray-100 text-lg font-bold flex-shrink">
                    Puxada frontal
                </Text>

                <View className="flex-row items-center">
                    <BodySvg />

                    <Text className="text-gray-200 ml-1 capitalize font-regular">
                        Costas
                    </Text>
                </View>
            </View>
        </>
    )
}

Header.Home = Home
Header.Title = Title
Header.Exercises = Exercises

export { Header }