import { type PressableProps, FlatList } from "react-native";
import { Card } from "./Card";
import { useNavigation } from "@react-navigation/native";

type CardProps = PressableProps & {
    isNew: boolean
    title: string
    price: string
    disabledAd?: boolean
    imgUri?: string
    currency?: string
}

type ProductListProps = {

}
function ProductList({}: ProductListProps) {
    return(
        <FlatList
            data={[0,1,2,3,4,5,6,7,8,9]}
            keyExtractor={item => "Key_" + item}
            numColumns={2}
            renderItem={() => (
                <DisplayItem
                    title="Tênis vermelho"
                    price="59,90"
                    className="z-0"
                    isNew
                />
            )}
            columnWrapperClassName="gap-6"
            contentContainerClassName="gap-6 pb-16"
            showsVerticalScrollIndicator={false}
        />
    )
}

function DisplayItem({title, price, isNew, disabledAd, imgUri, currency = "R$", ...props}: CardProps) {
    const { navigate } = useNavigation();
    return (
        <Card
            disabled={disabledAd}
            {...props}
        >
            <Card.Product>
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