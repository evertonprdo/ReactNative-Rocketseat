import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus } from "phosphor-react-native";

import { colors } from "@theme/colors";
import { TextApp } from "@components/base/Text";
import { ProductList } from "@components/ProductList";
import { Select } from "@components/Select";

export function UserAds() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View className="justify-between items-center flex-row p-6 gap-2">
                <TextApp className="pl-8 font-bold flex-1 text-xl text-center">Meus anúncios</TextApp>

                <Pressable className="w-6 h-6 items-center justify-center">
                    <Plus color={colors.gray[100]} size={24}/>
                </Pressable>
            </View>

            <View className="px-6 mt-6 flex-1">
                <View className="flex-row justify-between items-center mb-5 z-30">
                    <TextApp>9 anúncios</TextApp>

                    <Select selected="all">
                        <Select.Option name="all">Todos</Select.Option>
                        <Select.Option name="active">Ativos</Select.Option>
                        <Select.Option name="inactive">Inativos</Select.Option>
                    </Select>
                </View>

                <ProductList/>
            </View>
        </SafeAreaView>
    )
}