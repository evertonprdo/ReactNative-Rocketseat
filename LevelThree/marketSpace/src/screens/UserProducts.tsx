import { useCallback, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, type CompositeScreenProps } from "@react-navigation/native";
import { type BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { TextApp } from "@components/base/Text";
import { CardProps, ProductList } from "@components/ProductList";
import { Select } from "@components/Select";
import { Header } from "@components/Header";

import type { AppTabParamList } from "@routes/app.tab.routes";
import type { AppStackParamList } from "@routes/app.stack.routes";
import { getUserProducts } from "@services/products";
import { UserProductDTO } from "@dtos/ProductsDTO";
import { Loading } from "@components/base/Loading";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";

type Props = CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList, "UserProducts">,
    NativeStackScreenProps<AppStackParamList, "Home">
>
export function UserProducts({ navigation }: Props) {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true)
    const [ select, setSelect ] = useState<"all" | "active" | "inactive">("all")
    
    const [ products, setProducts ] = useState<CardProps[]>([]);
    const [ activeProducts, setActiveProducts ] = useState<CardProps[]>([])
    const [ inactiveProducts, setInactiveProducts ] = useState<CardProps[]>([])

    function fetchToCardProps(list: UserProductDTO[]): CardProps[] {
        const result: CardProps[] = []
        list.map(product => {
            result.push({
                title: product.name,
                price: (product.price / 100).toFixed(2).replace(".", ","),
                isNew: product.is_new,
                imgUri: `${api.defaults.baseURL}/images/${user.avatar}`,
                disabledAd: !product.is_active,
                productImageUri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`,
                onPress: () => navigation.navigate("UserProductDetails", { id: product.id })
            })
        })
        return result
    }

    function setActiveInactiveProducts(prod: CardProps[]) {
        const actives = [] as CardProps[]
        const inactives = [] as CardProps[]
        
        prod.map(item => {
            if(item.disabledAd) {
                inactives.push(item)
            } else {
                actives.push(item)
            }
        })
        setActiveProducts(actives)
        setInactiveProducts(inactives)
    }

    async function fetchUserProducts() {
        try {
            const data = await getUserProducts();
            const cardPropsProduct = fetchToCardProps(data)

            setProducts(cardPropsProduct);
            setActiveInactiveProducts(cardPropsProduct);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchUserProducts()
    }, []))

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header>
                <Header.Empty />
                <Header.Title>Meus anúncios</Header.Title>
                <Header.Add
                    onPress={() => navigation.navigate("CreateProduct")}
                />
            </Header>

            <View className="px-6 flex-1">
                <View className="flex-row justify-between items-center mb-5 z-30">
                    <TextApp>{products.length} anúncios</TextApp>

                    <Select selected={select} setSelected={setSelect}>
                        <Select.Option name="all">Todos</Select.Option>
                        <Select.Option name="active">Ativos</Select.Option>
                        <Select.Option name="inactive">Inativos</Select.Option>
                    </Select>
                </View>
                {isLoading ? <Loading /> : (
                    <ProductList
                        data={ select === "all"
                            ? products 
                            : select === "active"
                            ? activeProducts
                            : inactiveProducts
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    )
}