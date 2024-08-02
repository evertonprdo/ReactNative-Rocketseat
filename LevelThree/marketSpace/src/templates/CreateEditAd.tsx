import { Modal, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, Plus, Tag } from "phosphor-react-native";

import { colors } from "@theme/colors";
import { TextApp } from "@components/base/Text";
import { Header } from "@components/Header";

import { Input } from "@components/base/Input";
import { Checkable } from "@components/base/Checkable";
import { Toggle } from "@components/base/Toggle";
import { Button } from "@components/base/Button";
import { AdDetailsTemplate } from "./AdDetailsTemplate";
import { PaymentMethod } from "@components/ProductForm/PaymentMethod";

const paymentMethods = {
    boleto: "Boleto",
    pix: "Pix",
    cash: "Dinheiro",
    card: "Cartão de crédito",
    deposit: "Depósito",
}

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

    handleOnFieldTextChange: (text: string, key: keyof TextFieldsProps) => void
    handleOnBooleanInputChange: (key: keyof BooleanInputsProps) => void
    handleOnRadioInputPress: (val: boolean) => void

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
    onPressCancel,
    onPressGoBack,
    onPressNext,
    onPressBackEdit,
    onSubmit,
    handleOnBooleanInputChange,
    handleOnFieldTextChange,
    handleOnRadioInputPress,
    modaVisibility,
} : Props) {
    const { top, bottom } = useSafeAreaInsets();
    const { name, description, price, acceptTrade, isNew, boleto,card,cash,deposit,pix } = product ?? {}

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header>
                <Header.GoBack onPress={onPressGoBack} />
                <Header.Title>{type === "create" ? "Criar anúncio" : "Editar anúncio"}</Header.Title>
                <Header.Empty />
            </Header>

            <ScrollView
                className="flex-1"
                contentContainerClassName="px-6 pb-6 gap-9"
                showsVerticalScrollIndicator={false}
            >
                <View className="gap-4">
                    <TextApp className="font-bold">Imagens</TextApp>

                    <TextApp className="text-sm text-gray-300">Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!</TextApp>

                    <View className="flex-row gap-2 w-full">
                        <Pressable
                            className="bg-gray-500 rounded-md items-center justify-center"
                            style={{ width: 100, height: 100 }}
                        >
                            <Plus color={colors.gray[400]} size={24} />
                        </Pressable>
                    </View>
                </View>

                <View className="gap-4">
                    <TextApp className="font-bold text-sm">Sobre o produto</TextApp>

                    <Input>
                        <Input.Field
                            placeholder="Título do anúncio"
                            value={name}
                            onChangeText={(text) => handleOnFieldTextChange(text, "name")}
                        />
                    </Input>

                    <Input>
                        <Input.Field
                            placeholder="Descrição do produto"
                            value={description}
                            onChangeText={(text) => handleOnFieldTextChange(text, "description")}
                            numberOfLines={5}
                            textAlignVertical="top"
                            multiline
                        />
                    </Input>

                    <View className="flex-row gap-5">
                        <Checkable
                            variant="radio"
                            checked={isNew}

                            onPress={() => handleOnRadioInputPress(true)}
                        >
                            Produto novo
                        </Checkable>

                        <Checkable
                            variant="radio"
                            checked={!isNew && isNew !== undefined}

                            onPress={() => handleOnRadioInputPress(false)}
                        >
                            Produto usado
                        </Checkable>
                    </View>
                </View>

                <View className="gap-4">
                    <TextApp className="font-bold text-sm">Venda</TextApp>

                    <Input>
                        <TextApp className="text-gray-100">R$</TextApp>
                        <Input.Field
                            placeholder="Valor do produto"
                            value={price}
                            onChangeText={(text) => handleOnFieldTextChange(text, "price")}
                            inputMode="numeric"
                        />
                    </Input>

                    <View className="gap-3">
                        <TextApp className="font-bold text-sm">Aceita troca?</TextApp>

                        <Toggle
                            value={acceptTrade}
                            onPress={() => handleOnBooleanInputChange("acceptTrade")}
                        />
                    </View>

                    <PaymentMethod
                        state={{boleto,card,cash,deposit,pix}}
                        setState={() => {}}
                        flag
                    />
                </View>
            </ScrollView>

            <View className="gap-3 px-6 flex-row py-5 bg-gray-700">
                <Button
                    className="flex-1"
                    onPress={onPressCancel}
                >
                    <Button.Title>Cancelar</Button.Title>
                </Button>

                <Button
                    variant="black"
                    className="flex-1"
                    onPress={onPressNext}
                >
                    <Button.Title>Avançar</Button.Title>
                </Button>
            </View>

            <Modal
                className="flex-1 bg-gray-600"
                statusBarTranslucent
                animationType="slide"
                visible={ modaVisibility ?? false }
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