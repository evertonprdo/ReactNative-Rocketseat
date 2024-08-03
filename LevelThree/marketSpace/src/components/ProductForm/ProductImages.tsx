import { useEffect, useState } from "react";
import { Image, Pressable, PressableProps, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { Plus, X } from "phosphor-react-native";

import { colors } from "@theme/colors";
import { TextApp } from "@components/base/Text";

import { AppError } from "@utils/AppError";
import { useToast } from "@hooks/useToast";

import type { FileImageProps } from "src/@types/FormProps";

type Props = {
    state: FileImageProps[],
    setState: React.Dispatch<React.SetStateAction<FileImageProps[]>>
    flag?: boolean
    validatedRef: React.MutableRefObject<boolean>
}
export function ProductImages({ state, setState, flag, validatedRef }: Props) {
    const [index, setIndex] = useState(0);
    const { showToast } = useToast();

    async function handleProductPhotoSelect() {
        try {
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 5],
                allowsMultipleSelection: true,
                selectionLimit: 3 - state.length,
            })

            if (response.canceled) return
            if (!response.assets[0].uri) throw new AppError("Algo deu errado tente novamente.")

            await Promise.all(response.assets.map(async (img, i) => { processImage(img, i + index) }))
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError
                ? `${error.message}.`
                : "Algo inesperado aconteceu tente novamente."

            showToast({message: title, variant: "red"})
        }
    }

    async function processImage(img: ImagePicker.ImagePickerAsset, i: number) {
        try {
            const { uri, type } = img;
            const photoInfo = await FileSystem.getInfoAsync(uri);

            if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 3) {
                throw new AppError("Imagens maiores do que 3MB não são permitidas.");
            }

            const fileExtension = uri.split('.').pop();
            setState(prev => [
                ...prev,
                {
                    name: `product_img_${i}.${fileExtension}`.toLowerCase(),
                    uri: uri,
                    type: `${type}/${fileExtension}`
                }
            ]);
            setIndex(prev => prev + 1);
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError
                ? error.message
                : "Algo inesperado aconteceu tente novamente."

            showToast({message: title, variant: "red"})
        }
    }

    function handleOnPressRemove(key: string) {
        setState(state.filter(img => img.name !== key))
    }

    useEffect(() => {
        if(!validatedRef) return

        validatedRef.current = state.length > 0;
    }, [state])
    return (
        <View className="gap-4">
            <TextApp className="font-bold">Imagens</TextApp>

            <TextApp className="text-sm text-gray-300">Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!</TextApp>

            <View className="flex-row gap-2 w-full">
                <DraggableFlatList
                    data={state}
                    keyExtractor={item => item.name}
                    renderItem={({ item, drag }) => (
                        <ImageBox
                            uri={item.uri}
                            onRemove={() => handleOnPressRemove(item.name)}
                            onLongPress={drag}
                            delayLongPress={25}
                        />
                    )}
                    onDragEnd={({ data }) => setState(data)}
                    showsHorizontalScrollIndicator={false}
                    className="w-full"
                    horizontal
                    ListFooterComponent={() => (
                        state.length < 3 && (
                            <Pressable
                                className="bg-gray-500 rounded-md items-center justify-center"
                                onPress={handleProductPhotoSelect}
                                style={{ width: 100, height: 100 }}
                            >

                                <Plus color={colors.gray[400]} size={24} />
                            </Pressable>
                        )
                    )}
                />
            </View>
            {flag && (
                state.length > 0
                ? null
                : (
                    <TextApp className="text-xs text-red-500">
                        Selecione pelo menos uma imagem.
                    </TextApp>
                ))
            }
        </View>
    )
}

type ImageBoxProps = PressableProps & {
    uri: string
    onRemove: () => void
}
function ImageBox({ uri, onRemove, ...props }: ImageBoxProps) {
    return (
        <Pressable
            className="bg-gray-500 rounded-md overflow-hidden mr-2"
            style={{ width: 100, height: 100 }}
            hitSlop={3}
            {...props}
        >
            <Image
                source={{ uri }}
                className="w-full h-full"
                resizeMode="cover"
            />
            <Pressable
                className="absolute right-1 top-1 rounded-full bg-gray-200 p-1"
                onPress={onRemove}
            >
                <X size={12} color={colors.gray[700]} />
            </Pressable>
        </Pressable>
    )
}