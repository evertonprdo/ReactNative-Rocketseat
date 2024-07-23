import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Header } from "@components/Header";
import { UserPhoto, UserPhotoSkeleton } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const photoSize = 148

export function Profile() {
    const [photoLoaded, setPhotoLoaded] = useState(true);

    return (
        <View className="flex-1">
            <Header title="Perfil" />

            <ScrollView contentContainerClassName="pb-9">
                <View className="items-center mt-6 px-10">
                    {photoLoaded ? (
                        <UserPhoto
                            source={{ uri: "https://avatars.githubusercontent.com/u/170630423?v=4" }}
                            alt="Foto do usuario"
                            size={photoSize}
                        />
                    ) : <UserPhotoSkeleton />}

                    <TouchableOpacity>
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
