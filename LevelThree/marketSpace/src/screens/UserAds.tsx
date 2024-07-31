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
    BottomTabScreenProps<AppTabParamList, "userAds">,
    NativeStackScreenProps<AppStackParamList, "Home">
>
export function UserAds({ navigation }: Props) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Header>
                <Header.Empty/>
                <Header.Title>Meus anúncios</Header.Title>
                <Header.Add
                    onPress={() => navigation.navigate("createAd")}
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
                    data={[
                        {   
                            isNew: true,
                            price: "11",
                            title: "weq2we",
                            onPress: () => navigation.navigate("userAdDetails")
                        },
                        {   
                            isNew: true,
                            price: "11",
                            title: "we3qwe",
                            onPress: () => navigation.navigate("userAdDetails")
                        },
                        {   
                            isNew: true,
                            price: "11",
                            title: "we11qwe",
                            onPress: () => navigation.navigate("userAdDetails")
                        },
                        {   
                            isNew: true,
                            price: "11",
                            title: "we1qwe",
                            onPress: () => navigation.navigate("userAdDetails")
                        },
                        {   
                            isNew: true,
                            price: "11",
                            title: "w111e1qwe",
                            onPress: () => navigation.navigate("userAdDetails")
                        },
                    ]}
                />
            </View>
        </SafeAreaView>
    )
}