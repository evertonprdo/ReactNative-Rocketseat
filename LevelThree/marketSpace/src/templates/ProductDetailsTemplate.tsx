import { ScrollView, View } from "react-native";
import { Bank, Barcode, CreditCard, Money, QrCode } from "phosphor-react-native";

import { colors } from "@theme/colors";
import { Tag } from "@components/base/Tag";
import { TextApp } from "@components/base/Text";
import { UserImage } from "@components/base/UserImage";
import { ImageCarrosel } from "@components/ImageCarrosel";

import type { FormFields } from "src/@types/FormProps";

export type ProductDetailsTemplateProps = {
    images: string[]
    details: Omit<FormFields, "price"> & {
        price: string 
    }
    user: {
        avatar: string,
        name: string
    }
    children?: React.ReactNode
}
export function ProductDetailsTemplate({ details, images, user, children }: ProductDetailsTemplateProps) {
    const { avatar, name } = user;
    const { title, description, price, accept_trade, payment_method, is_new } = details;
    const { boleto, card, cash, deposit, pix } = payment_method;

    return (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <ImageCarrosel
                imagesUri={images}
            />

            <View className="p-6">
                <View className="gap-6">
                    <View className="flex-row items-center gap-2">
                        <UserImage
                            className="size-6 border-2"
                            imageUri={avatar}
                        />
                        <TextApp className="text-sm">{name}</TextApp>
                    </View>

                    <View className="gap-2">
                        <Tag className="px-2 py-[2px]">
                            {is_new ? "Novo" : "Usado"}
                        </Tag>

                        <View className="flex-row items-baseline justify-between">
                            <TextApp className="font-bold text-gray-100 text-xl">
                                {title}
                            </TextApp>

                            <View className="flex-row items-baseline">
                                <TextApp className="font-bold text-blue-light text-sm">R$ </TextApp>
                                <TextApp className="font-bold text-blue-light text-xl">{price}</TextApp>
                            </View>

                        </View>
                        <TextApp className="text-justify text-sm">
                            { description }
                        </TextApp>
                    </View>

                    <View className="gap-4">
                        <View className="flex-row items-baseline gap-2">
                            <TextApp className="font-bold text-sm">Aceita troca?</TextApp>
                            <TextApp className="text-sm">{accept_trade ? "Sim" : "Não"}</TextApp>
                        </View>

                        <View className="gap-2">
                            <TextApp className="font-bold text-sm">Meios de pagamento:</TextApp>

                            <View className="gap-1">
                                {boleto &&
                                    <View className="gap-2 flex-row items-center">
                                        <Barcode size={18} color={colors.gray[100]} />
                                        <TextApp>Boleto</TextApp>
                                    </View>
                                }{pix &&
                                    <View className="gap-2 flex-row items-center">
                                        <QrCode size={18} color={colors.gray[100]} />
                                        <TextApp>Pix</TextApp>
                                    </View>
                                }{cash &&
                                    <View className="gap-2 flex-row items-center">
                                        <Money size={18} color={colors.gray[100]} />
                                        <TextApp>Dinheiro</TextApp>
                                    </View>
                                }{card &&
                                    <View className="gap-2 flex-row items-center">
                                        <CreditCard size={18} color={colors.gray[100]} />
                                        <TextApp>Cartão de crédito</TextApp>
                                    </View>
                                }{deposit &&
                                    <View className="gap-2 flex-row items-center">
                                        <Bank size={18} color={colors.gray[100]} />
                                        <TextApp>Depósito Bancário</TextApp>
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                </View>

                {children}
            </View>
        </ScrollView>
    )
}