import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from 'expo-file-system'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"

import { useToast } from "@hooks/useToast";
import { useAuth } from "@hooks/useAuth";

import { api } from "@services/api";
import UserPhotoDefaultImg from "@assets/userPhotoDefault.png"

import { Header } from "@components/Header";
import { UserPhoto, UserPhotoSkeleton } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";

const photoSize = 148

const profileSchema = yup
    .object({
        name: yup.string().required("Informe o nome"),
        password: yup
            .string()
            .min(6, "A senha deve ter pelo menos 6 dígitos.")
            .nullable()
            .transform((value) => (!!value ? value : null)),
        confirm_password: yup
            .string()
            .nullable()
            .transform((value) => (!!value ? value : null))
            .oneOf([yup.ref("password"), null], "As senhas devem ser iguais.")
            .when("password", {
                is: (Field: any) => Field,
                then: (schema) =>  schema.nullable().required('Informe a confirmação da senha.').transform((value) => !!value ? value : null),
                otherwise: (schema) => schema.notRequired()
            })
    })
    .shape({
        email: yup.string().nonNullable().required(),
        old_password: yup.string().nullable(),
    });
type FormDataProps = yup.InferType<typeof profileSchema>

export function Profile() {
    const [ isUpdating, setIsUpdating ] = useState(false);
    const [photoLoaded, setPhotoLoaded] = useState(true);

    const { showToast } = useToast();
    const { user, updateUserProfile } = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email
        },
        resolver: yupResolver(profileSchema)
    });

    async function handleUserPhotoSelect() {
        setPhotoLoaded(false)

        try {
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,
                allowsMultipleSelection: false
            });

            if (response.canceled) return

            if (response.assets[0].uri) {
                const photoSelected = response.assets[0]
                const photoInfo = await FileSystem.getInfoAsync(photoSelected.uri)

                if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 3) {
                    return showToast('Essa imagem é muito grande! Escolha uma até 3MB.', "bg-red-500")
                }
                const fileExtension = photoSelected.uri.split('.').pop();

                const photoFile = {
                    name: `${user.name}.${fileExtension}`.toLowerCase(),
                    uri: photoSelected.uri,
                    type: `${photoSelected.type}/${fileExtension}`
                } as any

                const userPhotoUploadForm = new FormData();
                userPhotoUploadForm.append('avatar', photoFile);
                
                const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
                    headers: {
                        'Content-type': 'multipart/form-data'
                    }
                })

                const userUpdated = user;
                userUpdated.avatar = avatarUpdatedResponse.data.avatar;
                updateUserProfile(userUpdated)

                showToast("Foto atualizada", "bg-green-500")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setPhotoLoaded(true)
        }
    }

    async function handleProfileUpdate(data: FormDataProps) {
        try {
            setIsUpdating(true);

            const userUpdated = user;
            userUpdated.name = data.name;

            await api.put("/users", data);
            await updateUserProfile(userUpdated);

            showToast("Perfil atualizado com sucesso!", "bg-green-500");
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possível atualizar os dados. Tente novamente mais tarde."
            
            showToast(title, "bg-red-500");
        } finally {
            setIsUpdating(false);
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
                            source={user.avatar
                                ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                                : UserPhotoDefaultImg
                            }
                            resizeMethod="scale"
                            alt="Foto do usuario"
                            size={ photoSize }
                        />
                    ) : <UserPhotoSkeleton />}

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text className="text-green-500 font-bold mt-2 mb-8">
                            Alterar foto
                        </Text>
                    </TouchableOpacity>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                placeholder="Nome"
                                className="bg-gray-600"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                placeholder="E-mail"
                                className="bg-gray-600"
                                variant="disabled"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Text className="text-gray-200 mb-2 font-bold self-start mt-12">
                        Alterar senha
                    </Text>

                    <Controller
                        control={control}
                        name="old_password"
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="Senha antiga"
                                className="bg-gray-600"
                                secureTextEntry
                                onChangeText={onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="Nova senha"
                                className="bg-gray-600"
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="confirm_password"
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="Confirme a nova senha"
                                className="bg-gray-600"
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.confirm_password?.message}
                            />
                        )}
                    />

                    <Button
                        title="Atualizar"
                        className="mt-4"
                        onPress={handleSubmit(handleProfileUpdate)}
                        isLoading={isUpdating}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
