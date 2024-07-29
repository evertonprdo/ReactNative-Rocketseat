import { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native";

import LogoSvg from "@assets/SvgView/Logo"

import { TextApp } from "@components/atoms/Text";
import { ImagePick } from "@components/ImagePick";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import type { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SingUp() {
    const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

    const [ fields, setFields ] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
    })

    function handleOnChangeTextField(value:string, key: keyof typeof fields) {
        setFields({
            ...fields,
            [key]: value
        })
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView
                className="w-full px-12"
                showsVerticalScrollIndicator={false}
            >
                <View className="my-12 items-center gap-3">
                    <LogoSvg/>
                    <TextApp className="font-bold text-xl">Boas vindas!</TextApp>

                    <TextApp 
                        className="text-center"
                    >
                        Crie sua conta e use o espaço para comprar{"\n"}
                        itens variados e vender seus produtos
                    </TextApp>
                </View>

                <View className="w-full gap-6 mb-12">
                    <ImagePick className="self-center"/>

                    <Input.Template
                        name="name"
                        placeholder="Nome"
                        value={fields.name}
                        onChangeText={(txt) => handleOnChangeTextField(txt, "name")}
                    />

                    <Input.Template
                        name="email"
                        placeholder="E-mail"
                        value={fields.email}
                        onChangeText={(txt) => handleOnChangeTextField(txt, "email")}
                    />

                    <Input.Template
                        name="phone"
                        placeholder="Telefone"
                        value={fields.phone}
                        onChangeText={(txt) => handleOnChangeTextField(txt, "phone")}
                    />

                    <Input.Template
                        name="password"
                        placeholder="Senha"
                        value={fields.password}
                        onChangeText={(txt) => handleOnChangeTextField(txt, "password")}
                        secureTextEntry
                    />

                    <Input.Template
                        name="confirm_password"
                        placeholder="Confirmar senha"
                        value={fields.confirm_password}
                        onChangeText={(txt) => handleOnChangeTextField(txt, "confirm_password")}
                        secureTextEntry
                    />

                    <Button
                        variant="black"
                    >
                        <Button.Title>Criar</Button.Title>
                    </Button>
                </View>

                <View className="gap-4 mb-12">
                    <TextApp className="text-center">Já tem uma conta?</TextApp>

                    <Button onPress={() => navigate("singIn")}>
                        <Button.Title>Ir para o login</Button.Title>
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}