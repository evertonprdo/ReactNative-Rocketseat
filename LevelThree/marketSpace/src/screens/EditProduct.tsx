import { useCallback, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useAuth } from "@hooks/useAuth";

import { CreateEditAd } from "@templates/CreateOrEditProduct";

import type { AppStackParamList } from "@routes/app.stack.routes";
import type { FileImageProps, FormResult, PaymentMethodsProps } from "src/@types/FormProps";
import { deleteProductImages, getProductById, postProductImages, putProductById } from "@services/products";
import { ProductDTO } from "@dtos/ProductsDTO";
import { api } from "@services/api";
import { useFocusEffect } from "@react-navigation/native";
import { Loading } from "@components/base/Loading";
import { Alert } from "react-native";
import { AppError } from "@utils/AppError";

type Props = NativeStackScreenProps<AppStackParamList, "EditProduct">

export function EditProduct({ navigation, route }: Props) {
    const { user } = useAuth();
    const avatar = `${api.defaults.baseURL}/images/${user.avatar}`
    const { id } = route.params
    const [isLoading, setIsLoading] = useState(false);
    const [onResquest, setOnRequest] = useState(true)

    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({} as FormResult)
    const [oldImages, setOldImages] = useState<ProductDTO["product_images"]>([])

    function handleOnPressNext() {
        setShowModal(true)
    }

    function handleOnSubmit() {
        Alert.alert("Product Edit",
            "Você tem certeza que deseja alterar seu produto?", [
            {
                text: "Sim",
                onPress: updateProduct
            },
            {
                text: "Não",
                style: "cancel"
            }
        ]
        )
    }

    async function updateProduct() {
        try {
            setIsLoading(true)
            if (checkImageChanges()) {
                await updateImages();
            }
            await putProduct();
            navigation.popToTop();
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    function checkImageChanges() {
        let changed = false
        for (const img of data.images) {
            for (const oldImg of oldImages) {
                if (`${api.defaults.baseURL}/images/${oldImg.path}` !== img.path) {
                    changed = true
                    break
                }
            }
            if (changed === true) break
        }
        return changed
    }

    function fetchToFormProps(response: ProductDTO) {
        setOldImages(response.product_images)
        const images: FileImageProps[] = response.product_images.map(img => {
            return {
                name: img.id,
                path: `${api.defaults.baseURL}/images/${img.path}`,
                type: "_",
            }
        })

        const paymentObj: PaymentMethodsProps = {
            boleto: false,
            card: false,
            cash: false,
            deposit: false,
            pix: false
        }
        response.payment_methods.forEach(item => {
            if (Object.keys(paymentObj).includes(item.key)) {
                paymentObj[item.key as keyof PaymentMethodsProps] = true
            }
        })

        return {
            images,
            fields: {
                title: response.name,
                accept_trade: response.accept_trade,
                description: response.description,
                is_new: response.is_new,
                price: response.price,
                payment_methods: paymentObj
            }
        }
    }

    async function fetchProductDetails() {
        try {
            setOnRequest(true)
            const response = await getProductById(id)
            setData(fetchToFormProps(response))
        } catch (error) {
            console.log(error)
        } finally {
            setOnRequest(false)
        }
    }

    async function updateImages() {
        try {
            const newImages: FileImageProps[] = []
            const deleteImgs: string[] = []

            function throwAnError() {
                Alert.alert("Server Alert!",
                    "Oh servidor não suporta a reordenação de imagens existentes, para reorganizar suas imagens por favor exclua as imagens e envie novamente!"
                )
                throw new AppError("_")
            }
            for (let i = 0; i < 3; i++) {
                if (data.images[i] && (data.images[i].type === "_")) {
                    let j = 0
                    for (const oldImg of oldImages) {
                        if (j === i) {
                            if (`${api.defaults.baseURL}/images/${oldImg.path}` !== data.images[i].path) {
                                throwAnError()
                            }
                        } else {
                            if (`${api.defaults.baseURL}/images/${oldImg.path}` === data.images[i].path) {
                                throwAnError()
                            }
                        }
                        j++
                    }
                }

                if (oldImages[i]) {
                    if (data.images[i]) {
                        if ((`${api.defaults.baseURL}/images/${oldImages[i].path}` !== data.images[i].path)) {
                            deleteImgs.push(oldImages[i].id)
                            newImages.push(data.images[i])
                        }
                    } else {
                        deleteImgs.push(oldImages[i].id)
                    }
                } else {
                    if(data.images[i]) {
                        newImages.push(data.images[i])
                    }
                }
            }

            if(newImages.length > 0) {
                await postProductImages(newImages, id)
            }
            if(deleteImgs.length > 0) {
                await deleteProductImages(deleteImgs);
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function putProduct() {
        try {
            const paymentArray: string[] = []

            for (const key in data.fields.payment_methods) {
                if (data.fields.payment_methods[key as keyof PaymentMethodsProps]) {
                    paymentArray.push(key)
                }
            }

            await putProductById(id, {
                name: data.fields.title,
                accept_trade: data.fields.accept_trade,
                description: data.fields.description,
                is_new: data.fields.is_new,
                payment_methods: paymentArray,
                price: data.fields.price,
                is_active: data.fields.is_active ?? true
            })
        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchProductDetails();
    }, []))
    return (
        <>
            {onResquest ? <Loading /> :
                <CreateEditAd
                    type="create"

                    user={{ avatar, name: user.name }}
                    state={data}
                    setState={setData}

                    onSubmit={handleOnSubmit}

                    onPressCancel={() => navigation.goBack()}
                    onPressGoBack={() => navigation.goBack()}

                    onPressNext={handleOnPressNext}

                    modalVisibility={showModal}
                    onPressBackEdit={() => setShowModal(false)}
                    isLoading={isLoading}
                />
            }
        </>
    )
}
