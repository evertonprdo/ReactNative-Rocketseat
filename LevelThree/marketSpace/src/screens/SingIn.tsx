import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import LogoHomeImg from "@assets/SvgView/LogoHome"

import { Input } from "@components/base/Input";
import { TextApp } from "@components/base/Text";
import { Button } from "@components/base/Button";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { postSession } from "@services/sessions";

export function SingIn() {
    const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

    const [ singInProps, setSingInProps ] = useState({
        email: "",
        password: ""
    })

    function handleOnChangeText(val: string, key: keyof typeof singInProps) {
        setSingInProps({
            ...singInProps,
            [key]: val
        })
    }

    async function handleSingIn() {
        try {
            const response = await postSession(singInProps)

            Alert.alert("SingIn", `"Você iniciou uma sessão!"`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ScrollView className="bg-gray-700 flex-1" contentContainerClassName="min-h-screen">
            <View
                className="flex-1 justify-center p-12 w-full items-center bg-gray-600 rounded-b-3xl z-10"
            >
                <View className="mt-4 mb-[77px]">
                    <LogoHomeImg/>
                </View>

                <View className="w-full gap-4 mb-8">
                    <TextApp className="text-sm text-center">
                        Acesse sua conta
                    </TextApp>

                    <Input.Template
                        placeholder="E-mail"
                        value={singInProps.email}
                        onChangeText={(val) => handleOnChangeText(val, "email")}
                    />

                    <Input.Template
                        placeholder="Senha"
                        value={singInProps.password}
                        onChangeText={(val) => handleOnChangeText(val, "password")}
                        secureTextEntry
                    />
                </View>

                <Button
                    variant="blue"
                    className="w-full"
                    onPress={handleSingIn}
                >
                    <Button.Title>Entrar</Button.Title>
                </Button>
            </View>

            <View className="w-full justify-center p-14 gap-4">
                <TextApp className="text-center">
                    Ainda não tem acesso?
                </TextApp>

                <Button onPress={() => navigate("singUp")}>
                    <Button.Title>Criar uma conta</Button.Title>
                </Button>
            </View>
        </ScrollView>
    )
}