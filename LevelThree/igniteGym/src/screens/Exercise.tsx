import { Image, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import SeriesSvg from "@assets/series.svg"
import RepetionsSvg from "@assets/repetitions.svg"

import type { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Button } from "@components/Button";

export function Exercise() {

    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <View className="flex-1">
            <Header className="pb-8 items-start">
                <Header.Exercises 
                    onPress={ handleGoBack }
                />
            </Header>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 32}}
            >
                <View className="p-8">
                    <Image
                        className="w-full h-[364px] mb-3 rounded-lg"
                        source={{ uri: "https://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg" }}
                        resizeMode="cover"
                    />

                    <View className="bg-gray-600 rounded-md pb-4 px-4">
                        <View className="items-center justify-around mb-6 mt-5 flex-row">
                            <View className="flex-row">
                                <SeriesSvg/>
                                
                                <Text className="text-gray-200 ml-2">
                                    3 séries
                                </Text>
                            </View>

                            <View className="flex-row">
                                <RepetionsSvg/>

                                <Text className="text-gray-200 ml-2">
                                    12 repetições
                                </Text>
                            </View>
                        </View>

                        <Button
                            title="Marcar como realizado"
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}