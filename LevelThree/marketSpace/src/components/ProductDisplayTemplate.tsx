import { type PressableProps } from "react-native";
import { Card as CardComponents } from "./Card";

type CardProps = PressableProps & {
    isNew: boolean
    title: string
    price: string
    disabledAd?: boolean
    imgUri?: string
    currency?: string
}
export function ProductDisplay({title, price, isNew, disabledAd, imgUri, currency = "R$", ...props}: CardProps) {
    return (
        <CardComponents
            disabled={disabledAd}
            {...props}
        >
            <CardComponents.Product>
                <CardComponents.User
                    imgUri={imgUri ??= ""}
                />

                <CardComponents.Tag
                    variant={ isNew ? "blue" : "gray"}
                >
                    { isNew ? "Novo" : "Usado" }
                </CardComponents.Tag>
            </CardComponents.Product>

            <CardComponents.Details>
                <CardComponents.Title>
                    {title}
                </CardComponents.Title>

                <CardComponents.Price
                    currency={currency}
                >
                    {price}
                </CardComponents.Price>
            </CardComponents.Details>
        </CardComponents>
    )
}