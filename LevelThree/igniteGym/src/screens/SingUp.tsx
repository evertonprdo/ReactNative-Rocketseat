import { useState } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { useToast } from "@hooks/useToast";
import { useAuth } from "@hooks/useAuth";

import { api } from "@services/api"
import { AppError } from "@utils/AppError";

import { Button } from "@components/Button";
import { LoginTemplate } from "@components/LoginTemplate";
import { Input } from "@components/Input";

type FormDataProps = {
    name: string
    email: string
    password: string
    password_confirm: string
}

const singUpSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
    password: yup.string().required('Informe a senha.').min(6, "A senha deve ter pelo menos 6 dígitos."),
    password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref("password")], "A confirmação da senha não confere."),
})

export function SingUp() {
    const { showToast } = useToast();
    const { singIn } = useAuth();

    const [ isLoading, setIsLoading ] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(singUpSchema)
    });
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    async function handleSingUp({ name, email, password }: FormDataProps) {
        try {
            setIsLoading(true)

            await api.post("/users", { name, email, password });
            await singIn(email, password)

        } catch (error) {
            setIsLoading(false);
            
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possível criar a conta. Tente novamente mais tarde."

            showToast(title)
        }
    }

    return (
        <LoginTemplate>
            <View className="flex-1 items-center">
                <Text className="font-bold text-xl text-gray-100 mb-6">
                    Acesse sua conta
                </Text>

                <Controller 
                    control={ control }
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Nome"
                            onChangeText={ onChange }
                            value={value}
                            errorMessage={errors.name?.message}
                        />
                    )}
                />

                <Controller 
                    control={ control }
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="E-mail"
                            keyboardType="email-address"
                            value={value}
                            onChangeText={ onChange }
                            errorMessage={errors.email?.message}
                            autoCapitalize="none"
                        />
                    )}
                />
                <Controller 
                    control={ control }
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Senha"
                            secureTextEntry
                            onChangeText={ onChange }
                            errorMessage={errors.password?.message}
                            value={value}
                        />
                    )}
                />
                <Controller 
                    control={ control }
                    name="password_confirm"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Confirme a senha"
                            value={value}
                            onSubmitEditing={ handleSubmit(handleSingUp) }
                            errorMessage={errors.password_confirm?.message}
                            onChangeText={ onChange }
                            returnKeyType="send"
                            secureTextEntry
                        />
                    )}
                />

                <Button
                    title="Criar e acessar"
                    onPress={ handleSubmit(handleSingUp) }
                    isLoading={isLoading}
                />
            </View>

            <View className="items-center mt-12">
                <Button
                    title="Voltar para o login"
                    variant="outline"
                    onPress={ handleGoBack }
                />
            </View>
        </LoginTemplate>
    )
}