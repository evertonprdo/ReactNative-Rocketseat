import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { type CompositeScreenProps } from "@react-navigation/native";
import { type BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { TextApp } from "@components/base/Text";
import { ProductList } from "@components/ProductList";
import { Select } from "@components/Select";
import { Header } from "@components/Header";

import type { AppTabParamList } from "@routes/app.tab.routes";
import type { AppStackParamList } from "@routes/app.stack.routes";

type Props = CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList, "UserProducts">,
    NativeStackScreenProps<AppStackParamList, "Home">
>
export function UserProducts({ navigation }: Props) {
    const DATA = []

    for (let index = 0; index < 5; index++) {
        DATA.push(item)
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <Header>
                <Header.Empty/>
                <Header.Title>Meus anúncios</Header.Title>
                <Header.Add
                    onPress={() => navigation.navigate("CreateProduct")}
                />
            </Header>

            <View className="px-6 flex-1">
                <View className="flex-row justify-between items-center mb-5 z-30">
                    <TextApp>9 anúncios</TextApp>

                    <Select selected="all">
                        <Select.Option name="all">Todos</Select.Option>
                        <Select.Option name="active">Ativos</Select.Option>
                        <Select.Option name="inactive">Inativos</Select.Option>
                    </Select>
                </View>

                <ProductList
                    data={DATA}
                />
            </View>
        </SafeAreaView>
    )
}

const item = {
    isNew: true,
    title: "Tênis vermelho",
    price: "59,90",
}