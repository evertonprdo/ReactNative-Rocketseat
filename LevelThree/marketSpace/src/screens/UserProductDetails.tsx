import { useCallback, useState } from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Power, Trash } from "phosphor-react-native";

import { Header } from "@components/Header";

import { colors } from "@theme/colors";
import { Button } from "@components/base/Button";

import { ProductDetailsTemplate, ProductDetailsTemplateProps } from "@templates/ProductDetailsTemplate";

import type { AppStackParamList } from "@routes/app.stack.routes";
import { deleteProductById, getProductById, patchProductById } from "@services/products";
import { ProductDTO } from "@dtos/ProductsDTO";
import { PaymentMethodsProps } from "src/@types/FormProps";
import { useFocusEffect } from "@react-navigation/native";
import { Loading } from "@components/base/Loading";
import { api } from "@services/api";

type Props = NativeStackScreenProps<AppStackParamList, "UserProductDetails">

export function UserProductDetails({ navigation, route }: Props) {
    const { id } = route.params
    const [product, setProduct] = useState({} as Omit<ProductDetailsTemplateProps, "children">)
    const [isLoading, setIsLoading] = useState(true);

    function handleOnPressEnableDisable() {
        Alert.alert("Product",
            `Tem certeza que deseja ${product.is_active ? "Desativar" : "Reativar"} seu produto?`, [
            {
                text: "Sim",
                onPress: patchProduct
            },
            {
                text: "Não",
                style: "cancel"
            },
        ])
    }

    function handleOnPressDelete() {
        Alert.alert("Product",
            "Você está prestes a deletar permanentemente seu produto, tem certeza que deseja fazer isso?", [
            {
                text: "Sim",
                onPress: deleteProduct
            },
            {
                text: "Não",
                style: "cancel"
            },
        ])
    }

    function fetchToProductDetailsProps(data: ProductDTO) {
        const payment: PaymentMethodsProps = {
            boleto: false,
            card: false,
            cash: false,
            deposit: false,
            pix: false
        }

        for (const item of data.payment_methods) {
            if (Object.keys(payment).includes(item.key)) {
                payment[item.key as keyof PaymentMethodsProps] = true
            }
        }

        const productDetails: ProductDetailsTemplateProps = {
            details: {
                title: data.name,
                price: (data.price / 100).toFixed(2).replace(".", ","),
                description: data.description,
                is_new: data.is_new,
                accept_trade: data.accept_trade,
                payment_methods: payment
            },
            images: data.product_images.map(img => `${api.defaults.baseURL}/images/${img.path}`),
            user: {
                name: data.user.name,
                avatar: `${api.defaults.baseURL}/images/${data.user.avatar}`
            },
            is_active: data.is_active
        }

        return productDetails
    }

    async function fetchProduct() {
        try {
            setIsLoading(true)
            const result = await getProductById(id);

            setProduct(fetchToProductDetailsProps(result))
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    async function patchProduct() {
        try {
            await patchProductById(id, !product.is_active)
            fetchProduct()
        } catch (error) {
            throw error
        }
    }

    async function deleteProduct() {
        try {
            await deleteProductById(id);
            navigation.popToTop();
        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchProduct()
    }, []))

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header className="pb-3">
                <Header.GoBack
                    onPress={() => navigation.goBack()}
                />
                <Header.Edit
                    onPress={() => navigation.navigate("EditProduct", { id })}
                />
            </Header>

            {isLoading ? <Loading /> :
                <ProductDetailsTemplate
                    details={product.details}
                    images={product.images}
                    user={product.user}
                    is_active={product.is_active}
                >

                    <View className="gap-2 mt-6">
                        <Button
                            variant={product.is_active ? "black" : "blue"}
                            onPress={handleOnPressEnableDisable}
                        >
                            <Power size={16} color={colors.gray[600]} />
                            <Button.Title>
                                {product.is_active
                                    ? "Desativar anúncio"
                                    : "Reativar anúncio"
                                }
                            </Button.Title>
                        </Button>

                        <Button
                            variant="gray"
                            onPress={handleOnPressDelete}
                        >
                            <Trash size={16} color={colors.gray[300]} />
                            <Button.Title>Excluir anúncio</Button.Title>
                        </Button>
                    </View>
                </ProductDetailsTemplate>
            }
        </SafeAreaView>
    )
}