export type FormFields = {
    title: string
    description: string
    is_new: boolean
    price: number,
    accept_trade: boolean,
    payment_methods: PaymentMethodsProps
    is_active?: boolean
}

export type PaymentMethodsProps = {
    boleto: boolean,
    pix: boolean,
    cash: boolean,
    card: boolean,
    deposit: boolean,
}

export type FileImageProps = {
    name: string
    path: string,
    type: string
}

export type FormResult = {
    images: FileImageProps[],
    fields: FormFields
}