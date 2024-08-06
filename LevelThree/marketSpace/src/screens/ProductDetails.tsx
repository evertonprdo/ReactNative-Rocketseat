import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WhatsappLogo } from "phosphor-react-native";

import { colors } from "@theme/colors";
import { TextApp } from "@components/base/Text";
import { Button } from "@components/base/Button";
import { Header } from "@components/Header";

import { ProductDetailsTemplate, ProductDetailsTemplateProps } from "@templates/ProductDetailsTemplate";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "@routes/app.stack.routes";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { getProductById } from "@services/products";
import { PaymentMethodsProps } from "src/@types/FormProps";
import { ProductDTO } from "@dtos/ProductsDTO";
import { api } from "@services/api";
import { Loading } from "@components/base/Loading";

type Props = NativeStackScreenProps<AppStackParamList, "ProductDetails">
export function ProductDetails({ navigation, route }: Props) {
    const { id } = route.params
    const [product, setProduct] = useState({} as Omit<ProductDetailsTemplateProps, "children"> & {user: {tel: string}})
    const [isLoading, setIsLoading] = useState(true);

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

        const productDetails: Omit<ProductDetailsTemplateProps, "children"> & {user: {tel: string}} = {
            details: {
                title: data.name,
                price: (data.price / 100).toFixed(2).replace(".", ","),
                description: data.description,
                is_new: data.is_new,
                accept_trade: data.accept_trade,
                payment_methods: payment,
            },
            images: data.product_images.map(img => `${api.defaults.baseURL}/images/${img.path}`),
            user: {
                name: data.user.name,
                avatar: `${api.defaults.baseURL}/images/${data.user.avatar}`,
                tel: data.user.tel
            },
            is_active: true
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

    useFocusEffect(useCallback(() => {
        fetchProduct()
    }, []))
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header className="pb-3">
                <Header.GoBack onPress={() => navigation.goBack()} />
            </Header>

            {isLoading ? <Loading /> :
                <ProductDetailsTemplate
                    details={product.details}
                    images={product.images}
                    user={product.user}
                    is_active={product.is_active}
                />
            }

            <View className="bg-gray-700 p-6 flex-row items-center justify-between">
                <View className="flex-row items-baseline">
                    <TextApp className="font-bold text-blue-light text-sm">R$ </TextApp>
                    <TextApp className="font-bold text-blue-light text-2xl">120,00</TextApp>
                </View>

                <Button variant="blue" onPress={() => Alert.alert("Comprar", "Ligue para o número: " + product.user.tel)}>
                    <WhatsappLogo size={16} weight="fill" color={colors.gray[700]}/>
                    <Button.Title>Entrar em contato</Button.Title>
                </Button>
            </View>
        </SafeAreaView>
    )
}