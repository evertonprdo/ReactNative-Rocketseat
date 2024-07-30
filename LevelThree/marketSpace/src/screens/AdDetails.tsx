import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Bank, Barcode, CreditCard, Money, QrCode, WhatsappLogo } from "phosphor-react-native";

import { colors } from "@theme/colors";

import { ImageCarrosel } from "@components/ImageCarrosel";
import { UserImage } from "@components/base/UserImage";
import { TextApp } from "@components/base/Text";
import { Tag } from "@components/base/Tag";
import { Button } from "@components/base/Button";

export function AdDetails() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View className="p-6 pb-3 ">
                <Pressable>
                    <ArrowLeft color={colors.gray[100]} size={20} />
                </Pressable>

            </View>

            <ScrollView>
                <ImageCarrosel />

                <View className="p-6">
                    <View className="gap-6">
                        <View className="flex-row items-center gap-2">
                            <UserImage className="size-6 border-2" />
                            <TextApp className="text-sm">Makenna Baptista</TextApp>
                        </View>

                        <View className="gap-2">
                            <Tag className="px-2 py-[2px]">
                                Novo
                            </Tag>

                            <View className="flex-row items-baseline justify-between">
                                <TextApp className="font-bold text-gray-100 text-xl">Bicicleta</TextApp>

                                <View className="flex-row items-baseline">
                                    <TextApp className="font-bold text-blue-light text-sm">R$ </TextApp>
                                    <TextApp className="font-bold text-blue-light text-xl">120,00</TextApp>
                                </View>

                            </View>
                            <TextApp className="text-justify text-sm">
                                Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis in aliquam.
                            </TextApp>
                        </View>

                        <View className="gap-4">
                            <View className="flex-row items-baseline gap-2">
                                <TextApp className="font-bold text-sm">Aceita troca?</TextApp>
                                <TextApp className="text-sm">Sim</TextApp>
                            </View>

                            <View className="gap-2">
                                <TextApp className="font-bold text-sm">Meios de pagamento:</TextApp>

                                <View className="gap-1">
                                    <View className="gap-2 flex-row items-center">
                                        <Barcode size={18} color={colors.gray[100]}/>
                                        <TextApp>Boleto</TextApp>
                                    </View>

                                    <View className="gap-2 flex-row items-center">
                                        <QrCode size={18} color={colors.gray[100]}/>
                                        <TextApp>Pix</TextApp>
                                    </View>

                                    <View className="gap-2 flex-row items-center">
                                        <Money size={18} color={colors.gray[100]}/>
                                        <TextApp>Dinheiro</TextApp>
                                    </View>

                                    <View className="gap-2 flex-row items-center">
                                        <CreditCard size={18} color={colors.gray[100]}/>
                                        <TextApp>Cartão de crédito</TextApp>
                                    </View>

                                    <View className="gap-2 flex-row items-center">
                                        <Bank size={18} color={colors.gray[100]}/>
                                        <TextApp>Depósito Bancário</TextApp>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View className="bg-gray-700 p-6 flex-row items-center justify-between">
                <View className="flex-row items-baseline">
                    <TextApp className="font-bold text-blue-light text-sm">R$ </TextApp>
                    <TextApp className="font-bold text-blue-light text-2xl">120,00</TextApp>
                </View>

                <Button variant="blue">
                    <WhatsappLogo size={16} weight="fill" color={colors.gray[700]} />
                    <Button.Title>Entrar em contato</Button.Title>
                </Button>
            </View>
        </SafeAreaView>
    )
}