import { createContext, useContext } from "react";
import { Image, ImageBackground, ImageProps, Pressable, PressableProps, TextProps, View, ViewProps } from "react-native";
import cn from "@utils/cn";

import AvatarImg from "@assets/avatar.png"
import ProductImg from "@assets/Image.png"

import { TextApp } from "@components/base/Text";

const DisableContext = createContext<boolean | undefined | null>(false)

function Card({ children, disabled, className, ...props }: PressableProps) {
    return (
        <DisableContext.Provider value={ disabled }>
            <Pressable
                className={cn("gap-1 flex-1", className)}
                disabled={ disabled }
                hitSlop={5}
                {...props}
            >
                { children }
            </Pressable>
        </DisableContext.Provider>
    )
}

type ProductProps = ViewProps & {
    productImageUri: string
}
function Product({ children, className, productImageUri, ...props }: ProductProps) {
    const isDisable = useContext(DisableContext)
    return (
        <View
            className={cn("min-h-[100px] max-h-[100px] rounded-md overflow-hidden", className)}
            {...props}
        >
            <ImageBackground
                className="flex-1 flex-row rounded-md justify-between items-start p-1"
                source={{uri: productImageUri}}
                resizeMode="cover"
            >
                { children }
            </ImageBackground>
            
            { isDisable &&
                <View className="w-full h-full absolute z-30 bg-gray-100/45 justify-end p-2">
                    <TextApp className="text-xs font-bold uppercase text-white">Anúncio desativado</TextApp>
                </View>
            }
        </View>
    )
}

type UserProps = ImageProps & {
    imgUri: string
}
function User({ imgUri, className, ...props }: UserProps) {
    return (
        <Image
            className={cn("size-6 border rounded-full border-gray-700", className)}
            source={ imgUri ? {uri: imgUri} : AvatarImg }
            resizeMode="cover"
            {...props}
        />
    )
}

type TagProps = ViewProps & {
    variant?: "blue" | "gray"
}
function Tag({ variant = "blue", className, children, ...props }: TagProps) {
    return (
        <View 
            className={cn("px-2 py-[2px] rounded-full", {
                "bg-blue": variant === "blue",
                "bg-gray-200": variant === "gray"
            }, className)}
            {...props}
        >
            <TextApp
                className={"text-white font-bold uppercase text-[10px]"}
            >
                { children } 
            </TextApp>
        </View>
    )
}

function Details({ children, ...props }: ViewProps) {
    return (
        <View
            className="px-2"
            {...props}
        >
            { children }
        </View>
    )
}

function Title({ children, className, ...props }: TextProps) {
    const isDisable = useContext(DisableContext)
    return (
        <TextApp
            className={cn("text-sm", {
                "text-gray-400": isDisable
            }, className)}
            {...props}
        >{ children }</TextApp>
    )
}

type PriceProps = TextProps & {
    currency: string
}
function Price({children, className, currency, ...props}: PriceProps) {
    const isDisable = useContext(DisableContext)
    return (
        <View className="flex-row items-baseline">
            <TextApp 
                className={cn("font-bold text-xs", {
                    "text-gray-400": isDisable
                }, className)}
                {...props}
            >{currency} </TextApp>

            <TextApp
                className={cn("font-bold", {
                    "text-gray-400": isDisable
                }, className)}
                {...props}
            >{ children }</TextApp>
        </View>
    )
}

Card.User = User
Card.Product = Product
Card.Tag = Tag
Card.Details = Details
Card.Title = Title
Card.Price = Price

export { Card }