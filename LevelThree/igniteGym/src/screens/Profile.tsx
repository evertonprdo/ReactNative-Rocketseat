import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from 'expo-file-system'

import { Header } from "@components/Header";
import { UserPhoto, UserPhotoSkeleton } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useToast } from "@hooks/useToast";

const photoSize = 148

export function Profile() {
    const [photoLoaded, setPhotoLoaded] = useState(true);
    const [ userPhoto, setUserPhoto ] = useState('https://avatars.githubusercontent.com/u/170630423?v=4')

    const { showToast } = useToast();

    async function handleUserPhotoSelect() {
        setPhotoLoaded(false)

        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,
                allowsMultipleSelection: false
            });

            if(photoSelected.canceled) return

            if(photoSelected.assets[0].uri) {
                const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

                if(photoInfo.exists && (photoInfo.size / 1024 / 1024) > 3) {
                    return showToast('Essa imagem é muito grande! Escolha uma até 3MB.')
                }
                setUserPhoto(photoSelected.assets[0].uri)
            }
    
        } catch (error) {
            console.log(error)
        } finally {
            setPhotoLoaded(true)
        }
    }

    return (
        <View className="flex-1">
            <Header>
                <Header.Title>Perfil</Header.Title>
            </Header>

            <ScrollView contentContainerClassName="pb-9">
                <View className="items-center mt-6 px-10">
                    {photoLoaded ? (
                        <UserPhoto
                            source={{ uri: userPhoto }}
                            alt="Foto do usuario"
                            size={photoSize}
                        />
                    ) : <UserPhotoSkeleton />}

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text className="text-green-500 font-bold mt-2 mb-8">
                            Alterar foto
                        </Text>
                    </TouchableOpacity>

                    <Input
                        placeholder="Nome"
                        className="bg-gray-600"
                    />
                    <Input
                        placeholder="E-mail"
                        className="bg-gray-600"
                        variant="disabled"
                    />


                    <Text className="text-gray-200 mb-2 font-bold self-start mt-12">
                        Alterar senha
                    </Text>

                    <Input
                        placeholder="Senha antiga"
                        className="bg-gray-600"
                        secureTextEntry
                    />
                    <Input
                        placeholder="Nova senha"
                        className="bg-gray-600"
                        secureTextEntry
                    />
                    <Input
                        placeholder="Confirme a nova senha"
                        className="bg-gray-600"
                        secureTextEntry
                    />

                    <Button
                        title="Atualizar"
                        className="mt-4"
                    />
                </View>
            </ScrollView>
        </View>
    )
}
