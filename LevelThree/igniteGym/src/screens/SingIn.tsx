import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import type { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { LoginTemplate } from "@components/LoginTemplate";

export function SingIn() {

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleNewAccount() {
        navigation.navigate("singUp")
    }

    return (
        <LoginTemplate>
            <View className="flex-1 items-center">
                <Text className="font-bold text-xl text-gray-100 mb-6">
                    Acesse sua conta
                </Text>

                <Input
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Input
                    placeholder="Senha"
                    secureTextEntry
                />

                <Button
                    title="Acessar"
                />
            </View>

            <View className="items-center mt-24">
                <Text className="text-gray-100 font-regular text-sm mb-3">
                    Ainda Não tem acesso?
                </Text>

                <Button
                    title="Criar conta"
                    variant="outline"
                    className="self-end"
                    onPress={ handleNewAccount }
                />
            </View>
        </LoginTemplate>
    )
}