import { PaymentMethodProps } from "./PaymentMethod"

type FormInputResult = {
    title: string
    description: string
    is_new: boolean
    price: number,
    acceptTrade: boolean,
    payment_method: PaymentMethodProps
} // When create optional, When Edit required