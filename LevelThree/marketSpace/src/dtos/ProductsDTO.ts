export type UserProductDTO = {
    user_id: string

    id: string
    name: string
    description: string
    price: number
    is_new: boolean
    accept_trade: boolean
    is_active: boolean

    product_images: {
        path: string
        id: string
    }[]
    payment_methods: PaymentMethodDTO[]
}

export type PaymentMethodDTO = {
    key: string
    name: string
}

export type ProductDTO = UserProductDTO & {
    user: {
        avatar: string
        name: string
        tel: string
    }
}