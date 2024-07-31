import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus } from "phosphor-react-native";

import { colors } from "@theme/colors";
import { TextApp } from "@components/base/Text";
import { Header } from "@components/Header";

import { Input } from "@components/base/Input";
import { Checkable } from "@components/base/Checkable";
import { Toggle } from "@components/base/Toggle";
import { Button } from "@components/base/Button";

type Props = {
    type: "edit" | "create"
    onPressGoBack?: () => void
    onPressCancel?: () => void
    onPressNext?: () => void
}
export function CreateEditAd({ type, onPressCancel, onPressGoBack, onPressNext }: Props) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Header>
                <Header.GoBack onPress={onPressGoBack}/>
                <Header.Title>{type === "create" ? "Criar anúncio" : "Editar anúncio"}</Header.Title>
                <Header.Empty/>
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
                            style={{width: 100, height: 100}}
                        >
                            <Plus color={colors.gray[400]} size={24}/>
                        </Pressable>
                    </View>
                </View>

                <View className="gap-4">
                    <TextApp className="font-bold text-sm">Sobre o produto</TextApp>

                    <Input>
                        <Input.Field
                            placeholder="Título do anúncio"
                        />
                    </Input>

                    <Input>
                        <Input.Field
                            placeholder="Descrição do produto"
                            numberOfLines={5}
                            textAlignVertical="top"
                            multiline
                        />
                    </Input>

                    <View className="flex-row gap-5">
                        <Checkable variant="radio">
                            Produto novo
                        </Checkable>

                        <Checkable variant="radio">
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
                        />
                    </Input>

                    <View className="gap-3">
                        <TextApp className="font-bold text-sm">Aceita troca?</TextApp>

                        <Toggle/>
                    </View>

                    <View className="gap-3">
                        <TextApp className="font-bold text-sm">Meios de pagamento aceitos</TextApp>

                        <View className="gap-2">
                            <Checkable>Boleto</Checkable>
                            <Checkable>Pix</Checkable>
                            <Checkable>Dinheiro</Checkable>
                            <Checkable>Cartão de crédito</Checkable>
                            <Checkable>Depósito Bancário</Checkable>
                        </View>
                    </View>
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
        </SafeAreaView>
    )
}