export type FormFields = {
    title: string
    description: string
    is_new: boolean
    price: number,
    accept_trade: boolean,
    payment_method: PaymentMethodProps
}

export type PaymentMethodProps = {
    boleto: boolean,
    pix: boolean,
    cash: boolean,
    card: boolean,
    deposit: boolean,
}

export type FileImageProps = {
    name: string
    uri: string,
    type: string
}

export type FormResult = {
    images: FileImageProps[],
    fields: FormFields
}