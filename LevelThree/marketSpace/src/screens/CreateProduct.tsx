import { useState } from "react";
import { Alert } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";
import type { AppStackParamList } from "@routes/app.stack.routes";

import { CreateEditAd } from "@templates/CreateOrEditProduct";
import type { FormResult } from "src/@types/FormProps";
import { postProduct, postProductImages, PostProductProps } from "@services/products";
import { AppError } from "@utils/AppError";
import { useToast } from "@hooks/useToast";

type Props = NativeStackScreenProps<AppStackParamList, "CreateProduct">

export function CreateProduct({ navigation }: Props) {
    const auth = useAuth();
    const user = {
        name: auth.user.name,
        avatar: `${api.defaults.baseURL}/images/${auth.user.avatar}`
    }
    const { showToast } = useToast();

    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({} as FormResult)
    const [isLoading, setIsLoading] = useState(false);

    function handleOnPressNext() {
        setShowModal(true)
    }

    function fetchData() {
        const newProduct: PostProductProps = {
            name: data.fields.title,
            description: data.fields.description,
            price: data.fields.price,
            is_new: data.fields.is_new,
            accept_trade: data.fields.accept_trade,
            payment_methods: [],
            is_active: true
        }
        const payment = data.fields.payment_methods

        for (const item in payment) {
            const key = item as keyof typeof payment

            if (payment[key] === true) {
                newProduct.payment_methods.push(key)
            }
        }

        return newProduct
    }

    async function handleOnSubmit() {
        try {
            setIsLoading(true)
            const { id } = await postProduct(fetchData());
            await postProductImages(data.images, id)

            Alert.alert("Produto publicado", "Meus parabens seu produto já está disponivel no markspace.")
            navigation.popToTop();

        } catch (error) {
            setIsLoading(false)
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Erro no serviço tente novamente."

            showToast({message: title, variant: 'red'})
        }
    }
    return (
        <CreateEditAd
            type="create"

            user={user}
            state={data}
            setState={setData}

            onPressCancel={() => navigation.goBack()}
            onPressGoBack={() => navigation.goBack()}

            onPressNext={handleOnPressNext}
            onSubmit={handleOnSubmit}

            modalVisibility={showModal}
            onPressBackEdit={() => setShowModal(false)}
            isLoading={isLoading}
        />
    )
}