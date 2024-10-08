import { useEffect, useRef, useState } from "react"
import { ScrollView, View } from "react-native"

import { PaymentMethodProps } from "./PaymentMethod"

import { Button } from "@components/base/Button"
import { Form, SwitchInputsProsp, TextFieldsProps } from "./Form"
import { ProductImages } from "./ProductImages"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import type { FileImageProps, FormFields } from "src/@types/FormProps"

type ProductFormProps = {
    onSubmit?: (form: FormFields, imgs: FileImageProps[]) => void
    onCancel?: () => void
    initialValues?: FormFields
    initialImages?: FileImageProps[]
}
export function ProductForm({ onSubmit, initialValues, initialImages, onCancel }: ProductFormProps) {
    const { title, description, accept_trade, is_new, payment_methods: payment_method } = initialValues ?? {}
    const { boleto, card, cash, deposit, pix } = payment_method ?? {}

    const dbPriceMultiplier = 100
    let price = initialValues?.price
        ? (initialValues.price / dbPriceMultiplier).toFixed(2).replace(".", ",")
        : ""
    ;

    const [checkRules, setCheckRules] = useState(false);
    const validatedFields = useRef(false);
    const validatedImages = useRef(false);

    const [ images, setImages ] = useState(initialImages ?? [])

    const [textFields, setTextFields] = useState({
        title: title ?? "",
        price: price ?? "",
        description: description ?? "",
    })

    const [switchInput, setSwitchInput] = useState({
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
        if (key === "price") {
            text = text.replace(/[^0-9,]/g, '')
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
        if (!onSubmit) return

        setCheckRules(true);
        if (!validatedImages.current) return
        if (!validatedFields.current) return

        onSubmit({
            ...textFields,
            ...switchInput,
            price: parseFloat(textFields.price.replace(",", ".")) * dbPriceMultiplier,
            payment_methods: payment
        } as FormFields, images);
    }

    return (
        <>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScrollView
                    className="flex-1"
                    contentContainerClassName="px-6 pb-6 gap-9"
                    showsVerticalScrollIndicator={false}
                >
                    <ProductImages
                        flag={checkRules}
                        validatedRef={validatedImages}
                        state={images}
                        setState={setImages}
                    />

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
                        validatedRef={validatedFields}
                    />
                </ScrollView>
            </GestureHandlerRootView>

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