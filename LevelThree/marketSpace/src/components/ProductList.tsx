import { type PressableProps, FlatList } from "react-native";
import { Card } from "@components/Card";

export type CardProps = PressableProps & {
    isNew: boolean
    title: string
    price: string
    productImageUri: string
    disabledAd?: boolean
    imgUri?: string
    currency?: string
}

type ProductListProps = {
    data: CardProps[]
    className?: string
}
function ProductList({data, className}: ProductListProps) {
    return(
        <FlatList
            data={data}
            keyExtractor={(item, i) => "Key_" + item?.title + i}
            numColumns={2}
            renderItem={({item: {title, isNew, price, ...props}}) => (
                <DisplayItem
                    title="Tênis vermelho"
                    price="59,90"
                    isNew
                    style={{maxWidth: "50%"}}
                    {...props}
                />
            )}
            columnWrapperClassName="gap-6"
            contentContainerClassName="gap-6 pb-16"
            showsVerticalScrollIndicator={false}
            className={className + ""}
        />
    )
}

function DisplayItem({title, price, isNew, disabledAd, imgUri, currency = "R$", productImageUri, ...props}: CardProps) {
    return (
        <Card
            disabled={disabledAd}
            {...props}
        >
            <Card.Product
                productImageUri={productImageUri}
            >
                <Card.User
                    imgUri={imgUri ??= ""}
                />

                <Card.Tag
                    variant={ isNew ? "blue" : "gray"}
                >
                    { isNew ? "Novo" : "Usado" }
                </Card.Tag>
            </Card.Product>

            <Card.Details>
                <Card.Title>
                    {title}
                </Card.Title>

                <Card.Price
                    currency={currency}
                >
                    {price}
                </Card.Price>
            </Card.Details>
        </Card>
    )
}

ProductList.DisplayItem = DisplayItem

export { ProductList }