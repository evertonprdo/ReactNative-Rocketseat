import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import type { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { LoginTemplate } from "@components/LoginTemplate";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";

type FormData = {
    email: string
    password: string
}

export function SingIn() {
    const { singIn } = useAuth();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    const navigation = useNavigation<AuthNavigatorRoutesProps>();
    function handleNewAccount() {
        navigation.navigate("singUp")
    }

    function handleSingIn({ email, password }: FormData) {
        singIn(email, password)
    }

    return (
        <LoginTemplate>
            <View className="flex-1 items-center">
                <Text className="font-bold text-xl text-gray-100 mb-6">
                    Acesse sua conta
                </Text>

                <Controller
                    control={control}
                    name="email"
                    rules={{ required: "Informe o e-mail" }}
                    render={({ field: { onChange } }) => (
                        <Input
                            placeholder="E-mail"
                            keyboardType="email-address"
                            onChangeText={onChange}
                            errorMessage={errors.email?.message}
                            autoCapitalize="none"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={{ required: "Informe a senha" }}
                    render={({ field: { onChange } }) => (
                        <Input
                            placeholder="Senha"
                            onChangeText={onChange}
                            errorMessage={errors.email?.message}
                            secureTextEntry
                        />
                    )}
                />

                <Button
                    title="Acessar"
                    onPress={handleSubmit(handleSingIn)}
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