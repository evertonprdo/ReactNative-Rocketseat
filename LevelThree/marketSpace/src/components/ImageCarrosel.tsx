import { useState } from "react";
import { FlatList, useWindowDimensions, View, ViewProps } from "react-native"
import { TextApp } from "@components/base/Text";
import cn from "@utils/cn";

type ProductCarroselProsp = ViewProps & {
    imagesUri?: string[],
    disabledAd?: boolean
}
export function ImageCarrosel({ imagesUri, disabledAd, className, ...props }: ProductCarroselProsp) {
    const [ currentView, setCurrentView ] = useState("")
    const { width } = useWindowDimensions();

    imagesUri ??= ["#FF5964","#FFE74C","#35A7FF", "#6BF178", "#3A606E"]

    return (
        <View className={cn("w-full h-[280px]", className)} {...props}>
            <FlatList
                data={imagesUri}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <View
                        className="w-full"
                        style={{
                            width,
                            backgroundColor: item
                        }}
                    />
                )}
                onViewableItemsChanged={({viewableItems}) => {
                    setCurrentView(viewableItems[0].key.toString())
                }}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
            />

            <View className="p-[2px] flex-row w-full absolute gap-1 bottom-0">
                {imagesUri.map(item => (
                    <View
                        key={item}
                        className={cn("bg-gray-700/50 flex-1 min-h-[3px] max-h-[3px] rounded-full", {
                            "bg-gray-700/75": item === currentView,
                        })}
                    />
                ))}
            </View>
            
            { disabledAd && 
                <View className="absolute w-full h-full bg-black/60 justify-center items-center">
                    <TextApp className="font-bold text-gray-700 text-sm uppercase">Anúncio desativado</TextApp>
                </View>           
            }
        </View>
    )
}