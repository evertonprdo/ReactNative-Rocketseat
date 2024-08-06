import { Modal, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, Tag } from "phosphor-react-native";

import { colors } from "@theme/colors";
import { TextApp } from "@components/base/Text";
import { Header } from "@components/Header";

import { Button } from "@components/base/Button";
import { ProductDetailsTemplate, ProductDetailsTemplateProps } from "./ProductDetailsTemplate";
import { ProductForm } from "@components/ProductForm";

import { FileImageProps, FormFields, FormResult } from "src/@types/FormProps";
import { useState } from "react";

type Props = {
    type: "edit" | "create"

    user: ProductDetailsTemplateProps["user"]
    state: FormResult
    setState: React.Dispatch<React.SetStateAction<FormResult>>

    onPressGoBack?: () => void
    onPressCancel?: () => void

    onPressNext: () => void
    onPressBackEdit?: () => void

    onSubmit?: () => void

    modalVisibility?: boolean
    isLoading: boolean
}
export function CreateEditAd({ type, user, state, setState, onPressGoBack, onPressCancel, onPressBackEdit, onPressNext, onSubmit, modalVisibility, isLoading }: Props) {
    const { top, bottom } = useSafeAreaInsets();
    const [ preview, setPreview ] = useState<Omit<ProductDetailsTemplateProps, "children">>({} as Omit<ProductDetailsTemplateProps, "children">);

    function handleOnPressNext(details: FormFields, images: FileImageProps[]) {
        const previewImages: string[] = []
        const previewPrice = (details.price / 100).toFixed(2).replace(".", ",")
        images.map(img => {
            previewImages.push(img.path);
        })

        setPreview({
            details: {
                ...details,
                price: previewPrice
            },
            images: previewImages,
            user,
            is_active: state.fields?.is_active ?? true
        })

        setState({
            images,
            fields: details,
        })
        onPressNext();
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header>
                <Header.GoBack onPress={onPressGoBack} />
                <Header.Title>{type === "create" ? "Criar anúncio" : "Editar anúncio"}</Header.Title>
                <Header.Empty />
            </Header>

            <ProductForm
                initialValues={state.fields}
                initialImages={state.images}
                onSubmit={handleOnPressNext}
                onCancel={onPressCancel}
            />

            <Modal
                className="flex-1 bg-gray-600"
                statusBarTranslucent
                animationType="slide"
                visible={modalVisibility ?? false}
            >
                <View
                    className="bg-blue-light items-center px-6 pb-4 gap-[2px]"
                    style={{ paddingTop: top + 16 }}
                >
                    <TextApp className="font-bold text-gray-700">Pré visualização do anúncio</TextApp>
                    <TextApp className="text-gray-700 text-sm">É assim que seu produto vai aparecer!</TextApp>
                </View>

                <View className="bg-gray-600 flex-1">
                    <ProductDetailsTemplate
                        images={preview.images}
                        details={preview.details}
                        user={user}
                        is_active={preview.is_active}
                    />
                    <View
                        className="flex-row w-full bg-gray-700 px-6 pt-5 gap-3"
                        style={{ paddingBottom: bottom + 20 }}
                    >
                        <Button
                            className="flex-1"
                            onPress={onPressBackEdit}
                        >
                            <ArrowLeft size={16} color={colors.gray[200]} />
                            <Button.Title>Voltar e editar</Button.Title>
                        </Button>

                        <Button
                            variant="blue"
                            className="flex-1"
                            onPress={onSubmit}
                            isLoading={isLoading}
                        >
                            <Tag size={16} color={colors.gray[700]} />
                            <Button.Title>Publicar</Button.Title>
                        </Button>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}