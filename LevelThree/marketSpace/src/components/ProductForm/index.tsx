import { useEffect, useState } from "react"
import { ScrollView, View } from "react-native"

import { PaymentMethodProps } from "./PaymentMethod"

import { Button } from "@components/base/Button"
import { Form, SwitchInputsProsp, TextFieldsProps } from "./Form"
import { ImagePicker } from "./ImagePicker"

type FormInputResult = {
    title: string
    description: string
    is_new?: boolean
    price: number,
    accept_trade?: boolean,
    payment_method: PaymentMethodProps
}

type ProductFormProps = {
    onSubmit?: (form: FormInputResult) => void
    onCancel?: () => void
    initialValues?: FormInputResult
}
export function ProductForm({ onSubmit, initialValues, onCancel }: ProductFormProps) {
    const { title, description, accept_trade, is_new, payment_method } = initialValues ?? {}
    const { boleto, card, cash, deposit, pix } = payment_method ?? {}

    const dbPriceMultiplier = 100
    let price = initialValues?.price
        ? (initialValues.price / dbPriceMultiplier).toString()
        : ""
    ;

    const [ checkRules, setCheckRules ] = useState(false);
    const [ validatedFields, setValidatedFields ] = useState(false);
    const [textFields, setTextFields] = useState({
        title: title ?? "",
        price: price ?? "",
        description: description ?? "",
    })

    const [ switchInput, setSwitchInput ] = useState({
        is_new,
        accept_trade: accept_trade ?? false
    })

    const [payment, setPayment] = useState<PaymentMethodProps>({
        boleto: boleto ?? false,
        card: card ?? false,
        cash: cash ?? false,
        deposit: deposit ?? false,
        pix: pix ?? false
    })

    function handleOnTextFieldChange(text: string, key: keyof TextFieldsProps) {
        if(key === "price") {
            text = text.replace(/[^0-9.,]/g, '')
        }
        setTextFields({
            ...textFields,
            [key]: text
        })
    }

    function handleOnValueChange(val: boolean, key: keyof SwitchInputsProsp) {
        setSwitchInput({
            ...switchInput,
            [key]: val
        })
    }

    function handleOnPressSubmit() {
        if(!onSubmit) return

        setCheckRules(true);
        if(!validatedFields) return

        onSubmit({
            ...textFields,
            ...switchInput,
            price: parseFloat(textFields.price) * dbPriceMultiplier,
            payment_method: payment
        });
    }

    return (
        <>
            <ScrollView
                className="flex-1"
                contentContainerClassName="px-6 pb-6 gap-9"
                showsVerticalScrollIndicator={false}
            >
                <ImagePicker/>

                <Form
                    state={{
                        ...textFields,
                        ...switchInput,
                        payment_method: payment
                    }}
                    onChangeValue={handleOnValueChange}
                    onTextChange={handleOnTextFieldChange}
                    onPaymentChange={setPayment}
                    flag={checkRules}
                    setValidatedFields={setValidatedFields}
                />
            </ScrollView>

            <View className="gap-3 px-6 flex-row py-5 bg-gray-700">
                <Button
                    className="flex-1"
                    onPress={onCancel}
                >
                    <Button.Title>Cancelar</Button.Title>
                </Button>

                <Button
                    variant="black"
                    className="flex-1"
                    onPress={handleOnPressSubmit}
                >
                    <Button.Title>Avançar</Button.Title>
                </Button>
            </View>
        </>
    )
}