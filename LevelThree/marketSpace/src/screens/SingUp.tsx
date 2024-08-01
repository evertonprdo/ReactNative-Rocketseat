import { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker"
import * as FileStystem from "expo-file-system";

import LogoSvg from "@assets/SvgView/Logo"

import { TextApp } from "@components/base/Text";
import { UserImage } from "@components/base/UserImage";
import { Input } from "@components/base/Input";
import { Button } from "@components/base/Button";

import type { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { postUser } from "@services/users";
import { any } from "zod";

export function SingUp() {
    const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

    const [ fields, setFields ] = useState({
        avatar: "",
        name: "",
        email: "",
        tel: "",
        password: "",
        confirm_password: "",
    })

    function handleOnChangeTextField(value:string, key: keyof typeof fields) {
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

            if(response.canceled) return
            if(!response.assets[0].uri) return

            handleOnChangeTextField(response.assets[0].uri, "avatar");

            const photoSelected = response.assets[0];
            const photoInfo = await FileStystem.getInfoAsync(photoSelected.uri);

            if(photoInfo.exists && (photoInfo.size / 1024 / 1024) > 3) {
                throw new Error("Imagem maior do que 3MB!")
            }

            const fileExtension = photoSelected.uri.split('.').pop();

            const photoFile = {
                name: `${fields.email}.${fileExtension}`.toLowerCase(),
                uri: photoSelected.uri,
                type: `${photoSelected.type}/${fileExtension}`
            } as any
            
            postUser({
                ...fields,
                avatar: photoFile
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSingUp() {
        try {
            const { avatar, name, email, password, tel } = fields
            postUser({
                avatar: avatar as any,
                name,
                email,
                tel,
                password,
            })

        } catch (error) {
            
        }
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
                    <UserImage
                        className="self-center"
                        imageUri={fields.avatar ? fields.avatar : ""}
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