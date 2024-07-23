import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Text, View } from "react-native";

export function SingUp() {
    return (
        <>
        <View className="flex-1 items-center">
            <Text className="font-bold text-xl text-gray-100 mb-6">
                Acesse sua conta
            </Text>
            <Input
                placeholder="Nome"
            />
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
                title="Criar e acessar"
            />
        </View>
        <View className="items-center mt-24">
            <Button
                title="Voltar para o login"
                variant="outline"
            />
        </View>
        </>
    )
}