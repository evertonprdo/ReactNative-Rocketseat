import { useState } from "react";
import { Modal, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, Tag } from "phosphor-react-native";

import { colors } from "@theme/colors";
import { TextApp } from "@components/base/Text";
import { Header } from "@components/Header";

import { Button } from "@components/base/Button";
import { AdDetailsTemplate } from "./AdDetailsTemplate";
import { ProductForm } from "@components/ProductForm";

export type TextFieldsProps = {
    name: string
    description: string
    price: string
}

export type BooleanInputsProps = {
    acceptTrade: boolean
    boleto: boolean
    pix: boolean
    cash: boolean
    card: boolean
    deposit: boolean
}

export type RadioInputProps = {
    isNew?: boolean
}

export type FormProps = TextFieldsProps & BooleanInputsProps & RadioInputProps

type Props = {
    type: "edit" | "create"
    product: FormProps

    onPressGoBack?: () => void
    onPressCancel?: () => void
    onPressNext?: () => void
    onPressBackEdit?: () => void
    onSubmit?: () => void

    modaVisibility?: boolean
}
export function CreateEditAd({
    type,
    product,

    onPressGoBack,
    onPressCancel,
    onPressBackEdit,
    onPressNext,
    onSubmit,
    modaVisibility,
}: Props) {
    const { top, bottom } = useSafeAreaInsets();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header>
                <Header.GoBack onPress={onPressGoBack} />
                <Header.Title>{type === "create" ? "Criar anúncio" : "Editar anúncio"}</Header.Title>
                <Header.Empty />
            </Header>

            <ProductForm
                onSubmit={(form) => console.log(form)}
                onCancel={onPressCancel}
            />

            <Modal
                className="flex-1 bg-gray-600"
                statusBarTranslucent
                animationType="slide"
                visible={modaVisibility ?? false}
            >
                <View
                    className="bg-blue-light items-center px-6 pb-4 gap-[2px]"
                    style={{ paddingTop: top + 16 }}
                >
                    <TextApp className="font-bold text-gray-700">Pré visualização do anúncio</TextApp>
                    <TextApp className="text-gray-700 text-sm">É assim que seu produto vai aparecer!</TextApp>
                </View>

                <View className="bg-gray-600">
                    <AdDetailsTemplate />
                </View>

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
                    >
                        <Tag size={16} color={colors.gray[700]} />
                        <Button.Title>Publicar</Button.Title>
                    </Button>
                </View>
            </Modal>
        </SafeAreaView>
    )
}