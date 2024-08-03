import { Image, Pressable, PressableProps, View } from "react-native";
import { Plus, X } from "phosphor-react-native";
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import DraggableFlatList from "react-native-draggable-flatlist";

import { TextApp } from "@components/base/Text";
import { colors } from "@theme/colors";
import { useEffect, useState } from "react";
import { AppError } from "@utils/AppError";
import { useToast } from "@hooks/useToast";

type FileImageProps = {
    name: string
    uri: string,
    type: string
}

type Props = {
    productImages?: FileImageProps[]
    flag?: boolean
    validatedRef: React.MutableRefObject<boolean>
}
export function ProductImages({ productImages, flag, validatedRef }: Props) {
    const [images, setImages] = useState<FileImageProps[]>(productImages ?? [])
    const [index, setIndex] = useState(0);
    const { showToast } = useToast();

    async function handleProductPhotoSelect() {
        try {
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 5],
                allowsMultipleSelection: true,
                selectionLimit: 3 - images.length,
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
                throw new AppError("Imagem maior do que 3MB");
            }

            const fileExtension = uri.split('.').pop();
            setImages(prevImages => [
                ...prevImages,
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
                ? `Erro ao processar imagem ${i + 1}: ${error.message}.`
                : "Algo inesperado aconteceu tente novamente."

            showToast({message: title, variant: "red"})
        }
    }

    function handleOnPressRemove(key: string) {
        setImages(images.filter(img => img.name !== key))
    }

    useEffect(() => {
        if(!validatedRef) return

        validatedRef.current = images.length > 0;
    }, [images])
    return (
        <View className="gap-4">
            <TextApp className="font-bold">Imagens</TextApp>

            <TextApp className="text-sm text-gray-300">Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!</TextApp>

            <View className="flex-row gap-2 w-full">
                <DraggableFlatList
                    data={images}
                    keyExtractor={item => item.name}
                    renderItem={({ item, drag }) => (
                        <ImageBox
                            uri={item.uri}
                            onRemove={() => handleOnPressRemove(item.name)}
                            onLongPress={drag}
                            delayLongPress={25}
                        />
                    )}
                    onDragEnd={({ data }) => setImages(data)}
                    showsHorizontalScrollIndicator={false}
                    className="w-full"
                    horizontal
                    ListFooterComponent={() => (
                        images.length < 3 && (
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
                images.length > 0
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