import { useCallback, useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useFocusEffect, type CompositeScreenProps } from "@react-navigation/native";
import { ArrowRight, MagnifyingGlass, Plus, Sliders, Tag } from "phosphor-react-native";

import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";

import { colors } from "@theme/colors";
import { TextApp } from "@components/base/Text";
import { Button } from "@components/base/Button";
import { UserImage } from "@components/base/UserImage";
import { Input } from "@components/base/Input";
import { CardProps, ProductList } from "@components/ProductList";
import { AnimatedModal } from "@components/AnimatedModal";
import { PressableIcon } from "@components/base/PressableIcon";
import { defaultFilterStateObj, FilterAd, type FilterOptions } from "@components/Filter";

import type { AppTabParamList } from "@routes/app.tab.routes";
import type { AppStackParamList } from "@routes/app.stack.routes";
import { ProductDTO } from "@dtos/ProductsDTO";
import { Loading } from "@components/base/Loading";
import { getProducts, getUserProducts } from "@services/products";

type Props = CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList, "TabHome">,
    NativeStackScreenProps<AppStackParamList, "Home">
>
export function Home({ navigation }: Props) {
    const { user } = useAuth();
    const [products, setProducts] = useState<CardProps[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [userActiveProducts, setUserActiveProducts] = useState(0)

    const [ search, setSearch ] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState(defaultFilterStateObj)

    function handleOnCloseModal() {
        setShowModal(false)
    }

    function handleOpenModal() {
        setShowModal(true)
    }

    function handleOnAplyfilters(filterState: FilterOptions) {
        if (showModal) {
            handleOnCloseModal();
        }
        setFilter(filterState);
    }

    function handleOnSearch() {
        fetchProducts()
    }

    function fetchToCardProps(list: ProductDTO[]) {
        const result: CardProps[] = []

        list.map(product => {
            result.push({
                title: product.name,
                price: (product.price / 100).toFixed(2).replace(".", ","),
                isNew: product.is_new,
                imgUri: `${api.defaults.baseURL}/images/${product.user.avatar}`,
                disabledAd: !(product.is_active ?? true),
                productImageUri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`,
                onPress: () => navigation.navigate("ProductDetails", { id: product.id })
            })
        })
        return result
    }

    async function fetchProducts() {
        try {
            setIsLoading(true)
            const is_new = (filter.condition.new && filter.condition.used) 
                ? undefined 
                : filter.condition.new 
                ? true 
                : false
            ;

            const paymentArray = []

            for(const key in filter.payment) {
                if(filter.payment[key as keyof typeof filter.payment]) {
                    paymentArray.push(key)
                }
            }

            const payment_methods = paymentArray.length > 0 ? paymentArray : undefined

            const params = {
                query: search,
                is_new,
                payment_methods,
                accept_trade: filter.acceptTrade
            }
            const response = await getProducts(params)

            setProducts(fetchToCardProps(response))
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    async function fetchUserProducts() {
        try {
            const data = await getUserProducts();
            let count = 0
            data.forEach(item => {
                if(item.is_active) {
                    count++
                }
            })
            setUserActiveProducts(count);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchProducts()
        fetchUserProducts()
    }, [filter]))
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View className="flex-1 px-6 pt-6 gap-8">
                <View className="flex-row w-full gap-2">

                    <View className="flex-1 flex-row gap-[10px] items-center">
                        <UserImage
                            className="size-11 border-2"
                            imageUri={`${api.defaults.baseURL}/images/${user.avatar}`}
                        />
                        <View>
                            <TextApp>Boas vindas,</TextApp>
                            <TextApp
                                className="font-bold"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {user.name}!
                            </TextApp>
                        </View>
                    </View>

                    <Button
                        variant="black"
                        className="flex-1"
                        onPress={() => navigation.navigate("CreateProduct")}
                    >
                        <Plus color={colors.gray[700]} size={16} />
                        <Button.Title>Criar anúncio</Button.Title>
                    </Button>
                </View>

                <View className="w-full gap-3">
                    <TextApp>Seus produtos anunciados para venda</TextApp>

                    <View className="bg-blue-light/10 py-3 pl-4 pr-5 rounded-md flex-row justify-between">
                        <View className="flex-row gap-4 items-center">
                            <Tag size={20} color={colors.blue} />

                            <View>
                                <TextApp className="font-bold text-xl">{userActiveProducts}</TextApp>
                                <TextApp>anúncios ativos</TextApp>
                            </View>
                        </View>

                        <Pressable className="flex-row items-center gap-2" onPress={() => navigation.navigate("UserProducts")}>
                            <TextApp className="text-blue font-bold">Meus anúncios</TextApp>
                            <ArrowRight size={16} color={colors.blue} />
                        </Pressable>
                    </View>
                </View>

                <View className="flex-1 gap-6">
                    <View className="gap-3">
                        <TextApp>Compre produtos variados</TextApp>
                        <Input>
                            <Input.Field
                                placeholder="Buscar anúncio"
                                value={search}
                                onChangeText={setSearch}
                            />
                            <View className="flex-row gap-3 h-full items-center">
                                <PressableIcon
                                    className="p-2 -m-2"
                                    onPress={handleOnSearch}
                                >
                                    <MagnifyingGlass
                                        size={20}
                                    />
                                </PressableIcon>

                                <View className="w-[1px] h-3/4 bg-gray-400" />

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

                    {isLoading ? <Loading /> :
                        <ProductList
                            data={products}
                        />
                    }
                </View>
            </View>

            <AnimatedModal
                title="Filtrar anúncios"
                showModal={showModal}
                onCloseModal={handleOnCloseModal}
            >
                <FilterAd
                    state={filter}
                    onApplyFilters={handleOnAplyfilters}
                />
            </AnimatedModal>
        </SafeAreaView>
    )
}