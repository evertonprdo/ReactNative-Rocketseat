import { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import * as ImagePicker from "expo-image-picker"
import * as FileStystem from "expo-file-system";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useToast } from "@hooks/useToast";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

import LogoSvg from "@assets/SvgView/Logo"

import { TextApp } from "@components/base/Text";
import { UserImage } from "@components/base/UserImage";
import { Input } from "@components/base/Input";
import { Button } from "@components/base/Button";

import type { AuthParamList } from "@routes/auth.routes";

import { postUser } from "@services/users";

export function SingUp({ navigation }: NativeStackScreenProps<AuthParamList, "singUp">) {
    const { singIn } = useAuth();
    const { showToast } = useToast();
    const [ isLoading, setIsLoading ] = useState(false);

    const [ userPhoto, setUserPhoto ] = useState({
        name: "",
        uri: "",
        type: "",
    });
    const [fields, setFields] = useState({
        name: "",
        email: "",
        tel: "",
        password: "",
        confirm_password: "",
    })

    function handleOnChangeTextField(value: string, key: keyof typeof fields) {
        setFields({
            ...fields,
            [key]: value
        })
    }

    async function handleUserPhotoSelect() {
        try {
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [1, 1],
                allowsEditing: true,
                allowsMultipleSelection: false,
            });

            if (response.canceled) return
            if (!response.assets[0].uri) throw new Error("Algo deu errado tente novamente!")
            
            const { uri, type } = response.assets[0]
            const photoInfo = await FileStystem.getInfoAsync(uri);

            if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 3) {
                throw new Error("Imagem maior do que 3MB!")
            }

            const fileExtension = uri.split('.').pop();

            setUserPhoto({
                name: `${fields.name}.${fileExtension}`.toLowerCase(),
                uri: uri,
                type: `${type}/${fileExtension}`
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSingUp() {
        try {
            setIsLoading(true)
            const {confirm_password, ...newUser} = fields

            await postUser({...newUser, avatar: userPhoto})
            await singIn(fields.email, fields.password)

        } catch (error) {
            const isAppError = error instanceof AppError

            const title = isAppError ? error.message : "Não foi possível criar a conta. Tente novamente mais tarde."

            showToast({message: title , variant: "red"})
            setIsLoading(false)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                className="w-full px-12"
                showsVerticalScrollIndicator={false}
            >
                <View className="my-12 items-center gap-3">
                    <LogoSvg />

                    <TextApp className="font-bold text-xl">Boas vindas!</TextApp>

                    <TextApp
                        className="text-center"
                    >
                        Crie sua conta e use o espaço para comprar{"\n"}
                        itens variados e vender seus produtos
                    </TextApp>
                </View>

                <View className="w-full gap-6 mb-12">
                    <UserImage
                        className="self-center"
                        imageUri={userPhoto.uri ? userPhoto.uri : ""}
                    >
                        <UserImage.Edit
                            onPress={handleUserPhotoSelect}
                        />
                    </UserImage>

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
                        value={fields.tel}
                        onChangeText={(txt) => handleOnChangeTextField(txt, "tel")}
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
                        onPress={handleSingUp}
                        isLoading={isLoading}
                    >
                        <Button.Title>Criar</Button.Title>
                    </Button>
                </View>

                <View className="gap-4 mb-12">
                    <TextApp className="text-center">Já tem uma conta?</TextApp>

                    <Button onPress={() => navigation.navigate("singIn")}>
                        <Button.Title>Ir para o login</Button.Title>
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}