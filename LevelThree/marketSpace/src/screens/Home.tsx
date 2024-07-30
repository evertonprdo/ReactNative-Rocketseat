import { useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRight, MagnifyingGlass, Plus, Sliders, Tag } from "phosphor-react-native";

import { colors } from "@theme/colors";
import { TextApp } from "@components/base/Text";
import { Button } from "@components/base/Button";
import { UserImage } from "@components/base/UserImage";
import { Input } from "@components/base/Input";
import { ProductList } from "@components/ProductList";
import { AnimatedModal } from "@components/AnimatedModal";

import { defaultFilterStateObj, FilterAd, type FilterOptions } from "@components/Filter";
import { PressableIcon } from "@components/base/PressableIcon";

export function Home() {
    const [ showModal, setShowModal ] = useState(false);
    const [ filter, setFilter ] = useState(defaultFilterStateObj)

    function handleOnCloseModal() {
        setShowModal(false)
    }

    function handleOpenModal() {
        setShowModal(true)
    }

    function handleOnAplyfilters(filterState: FilterOptions) {
        if(showModal) {
            handleOnCloseModal();
        }
        setFilter(filterState);
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
                                <PressableIcon
                                    className="p-2 -m-2"
                                >
                                    <MagnifyingGlass
                                        size={20}
                                    />
                                </PressableIcon>
                        
                                <View className="w-[1px] h-3/4 bg-gray-400"/>

                                <PressableIcon
                                    className="p-2 -m-2"
                                    onPress={handleOpenModal}
                                >
                                    <Sliders
                                        size={20}
                                    />
                                </PressableIcon>
                            </View>
                        </Input>
                    </View>
                    
                    <ProductList/>
                </View>
            </View>

            <AnimatedModal
                title="Filtrar anúncios"
                showModal={showModal}
                onCloseModal={handleOnCloseModal}
            >
                <FilterAd
                    state={filter}
                    onApplyFilters={ handleOnAplyfilters }
                />
            </AnimatedModal>
        </SafeAreaView>
    )
}