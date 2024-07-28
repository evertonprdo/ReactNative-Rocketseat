import { Alert, View } from "react-native";

import { ProductDisplay } from "@components/ProductDisplayTemplate";
import { Tag } from "@components/Tag";
import { useState } from "react";

export function SingIn() {
    const [ a, sA ] = useState(false);
    const [ b, sB ] = useState(false);
    return (
        <View className="flex-1 justify-center p-5 gap-6">
            <View className="flex-row w-full gap-5">
                <ProductDisplay
                    title="Tênis Vermelho"
                    price="56,60"
                    onPress={() => Alert.alert("Product", "U clicked me (^-^)/")}
                    isNew
                />

                <ProductDisplay
                    title="Tênis Vermelho"
                    price="56,60"
                    isNew={false}
                />
            </View>

            <View className="flex-row w-full gap-5">
                <ProductDisplay
                    title="Tênis Vermelho"
                    price="56,60"
                    isNew={false}
                    disabledAd
                />

                <ProductDisplay
                    title="Tênis Vermelho"
                    price="56,60"
                    isNew
                    disabledAd
                />
            </View>

            <Tag
                onPress={() => sA(!a)}
                selected={a}
            >
                Novo
            </Tag>

            <Tag
                onPress={() => sB(!b)}
                selected={b}
            >
                Usado
            </Tag>
        </View>
    )
}