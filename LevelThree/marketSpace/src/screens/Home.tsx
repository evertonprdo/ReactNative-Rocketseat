import { useState } from "react";
import { Pressable, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRight, MagnifyingGlass, Plus, Sliders, Tag } from "phosphor-react-native";

import { colors } from "@theme/colors";
import { TextApp } from "@components/atoms/Text";
import { Button } from "@components/Button";
import { UserImage } from "@components/UserImage";
import { Input } from "@components/Input";
import { ProductDisplay } from "@components/ProductDisplayTemplate";
import { FilterAd } from "@components/Filter";
import { AnimatedModal } from "@components/AnimatedModal";

export function Home() {
    const [ showModal, setShowModal ] = useState(false);
    const [ filter, setFilter ] = useState({
        condition: {
            new: true,
            used: true,
        },
        exchange: true,
        payment: {
            "Boleto": true,
            "Pix": true,
            "Dinheiro": true,
            "Cartão de Crédito": true,
            "Deposito Bancário": true,
        }
    })

    function handleShowModal() {
        if(showModal) {
            setShowModal(false)
        }
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <View className="flex-1 px-6 pt-6 gap-8">
                <View className="flex-row w-full gap-2">

                    <View className="flex-1 flex-row gap-[10px] items-center">
                        <UserImage
                            className="size-11 border-2"
                        />
                        <View>
                            <TextApp>Boas vindas,</TextApp>
                            <TextApp className="font-bold">Maria!</TextApp>
                        </View>
                    </View>

                    <Button variant="black" className="flex-1">
                        <Plus color={colors.gray[700]} size={16}/>
                        <Button.Title>Criar anúncio</Button.Title>
                    </Button>
                </View>

                <View className="w-full gap-3">
                    <TextApp>Seus produtos anunciados para venda</TextApp>

                    <View className="bg-blue-light/10 py-3 pl-4 pr-5 rounded-md flex-row justify-between">
                        <View className="flex-row gap-4 items-center">
                            <Tag size={20} color={colors.blue}/>

                            <View>
                                <TextApp className="font-bold text-xl">4</TextApp>
                                <TextApp>anúncios ativos</TextApp>
                            </View>
                        </View>

                        <Pressable className="flex-row items-center gap-2">
                            <TextApp className="text-blue font-bold">Meus anúncios</TextApp>
                            <ArrowRight size={16} color={colors.blue}/>
                        </Pressable>
                    </View>
                </View>

                <View className="flex-1 gap-6">
                    <View className="gap-3">
                        <TextApp>Compre produtos variados</TextApp>
                        <Input>
                            <Input.Field
                                placeholder="Buscar anúncio"
                            />
                            <View className="flex-row gap-3 h-full items-center">
                                <Pressable className="rounded-full active:bg-gray-500 p-2 -m-2">
                                    <MagnifyingGlass
                                        size={20}
                                    />
                                </Pressable>
                        
                                <View className="w-[1px] h-3/4 bg-gray-400"/>

                                <Pressable
                                    className="rounded-full active:bg-gray-500 p-2 -m-2"
                                    onPress={() => setShowModal(true)}
                                >
                                    <Sliders
                                        size={20}
                                    />
                                </Pressable>
                            </View>
                        </Input>
                    </View>
                    
                    <FlatList
                        data={[0,1,2,3,4,5,6,7,8,9]}
                        keyExtractor={item => "Key_" + item}
                        numColumns={2}
                        renderItem={() => (
                            <ProductDisplay
                                title="Tênis vermelho"
                                price="59,90"
                                isNew
                            />
                        )}
                        columnWrapperClassName="gap-6"
                        contentContainerClassName="gap-6 pb-16"
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>

            <AnimatedModal
                title="Filtrar anúncios"
                visible={showModal}
                onCloseModal={handleShowModal}
            >
                <FilterAd
                    state={filter}
                    setState={setFilter}
                />
            </AnimatedModal>
        </SafeAreaView>
    )
}