import { useEffect, useRef, useState } from "react"
import { View } from "react-native"

import { PaymentMethod, PaymentMethodProps } from "./PaymentMethod"
import { TextApp } from "@components/base/Text"
import { Input } from "@components/base/Input"
import { Checkable } from "@components/base/Checkable"
import { Toggle } from "@components/base/Toggle"

import { InputValidation } from "@utils/inputValidation"

export type TextFieldsProps = {
    title: string
    description: string
    price: string
}

export type SwitchInputsProsp = {
    is_new?: boolean
    accept_trade: boolean,
}

type FormInputResult = TextFieldsProps & SwitchInputsProsp & {
    payment_method: PaymentMethodProps
}

type ProductFormProps = {
    state: FormInputResult
    onTextChange: (text: string, key: keyof TextFieldsProps) => void
    onPaymentChange: (obj: PaymentMethodProps) => void
    onChangeValue: (val: boolean, key: keyof SwitchInputsProsp) => void
    flag?: boolean
    validatedRef: React.MutableRefObject<boolean>
}
export  function Form({ state, flag, onTextChange, onChangeValue, onPaymentChange, validatedRef }: ProductFormProps) {
    const { title, description, price, accept_trade, is_new, payment_method } = state

    const [fieldsValidation, setFieldsValidation] = useState({
        title: false,
        description: false,
        price: false,
        radio: false
    })
    const isValidPayment = useRef(false);

    const titleRules = {
        min: 5,
        max: 37
    }
    const descrRules = {
        min: 12,
        max: 255
    }

    function setValidation() {
        const validationFields = {
            title: InputValidation.stringLenght(title, titleRules.min, titleRules.max),
            description: InputValidation.stringLenght(description, descrRules.min, descrRules.max),
            price: InputValidation.price(price),
            radio: is_new !== undefined
        }
        setFieldsValidation(validationFields)
        validatedRef.current = checkFields(validationFields)
    }

    function checkFields(checkedFields: typeof fieldsValidation) {
        if (Object.values(checkedFields).includes(false)) return false
        if (!isValidPayment.current) return false
        return true
    }

    useEffect(() => {
        setValidation();
    }, [state])

    return (
        <>
            <View className={"gap-4"}>
                <TextApp className="font-bold text-sm">Sobre o produto</TextApp>

                {!flag ? null : !fieldsValidation.title &&
                    <Input.Alert className="-my-3">
                        O título deve ter no mínimo {titleRules.min} caracteres.
                    </Input.Alert>
                }
                <Input>
                    <Input.Field
                        placeholder="Título do anúncio"
                        value={title}
                        onChangeText={(text) => onTextChange(text, "title")}
                        maxLength={titleRules.max}
                    />
                </Input>

                {!flag ? null : !fieldsValidation.description &&
                    <Input.Alert className="-my-3">
                        A descrição deve ter no mínimo {descrRules.min} caracteres.
                    </Input.Alert>
                }
                <Input>
                    <Input.Field
                        placeholder="Descrição do produto"
                        value={description}
                        onChangeText={(text) => onTextChange(text, "description")}
                        maxLength={descrRules.max}
                        numberOfLines={5}
                        textAlignVertical="top"
                        multiline
                    />
                </Input>

                <View className="flex-row gap-5">
                    <Checkable
                        variant="radio"
                        checked={is_new}

                        onPress={() => onChangeValue(true, "is_new")}
                    >
                        Produto novo
                    </Checkable>

                    <Checkable
                        variant="radio"
                        checked={!is_new && is_new !== undefined}

                        onPress={() => onChangeValue(false, "is_new")}
                    >
                        Produto usado
                    </Checkable>
                </View>
                {!flag ? null : !fieldsValidation.radio &&
                    <Input.Alert className="-my-3">
                        Selecione pelo menos uma das opções.
                    </Input.Alert>
                }
            </View>

            <View className="gap-4">
                <TextApp className="font-bold text-sm">Venda</TextApp>

                {!flag ? null : !fieldsValidation.price &&
                    <Input.Alert className="-my-3">
                        Preencha um valo válido.
                    </Input.Alert>
                }
                <Input>
                    <TextApp className="text-gray-100">R$</TextApp>
                    <Input.Field
                        placeholder="Valor do produto"
                        value={price}
                        onChangeText={(text) => onTextChange(text, "price")}
                        inputMode="numeric"
                    />
                </Input>

                <View className="gap-3">
                    <TextApp className="font-bold text-sm">Aceita troca?</TextApp>

                    <Toggle
                        value={accept_trade}
                        onPress={() => onChangeValue(!accept_trade, "accept_trade")}
                    />
                </View>

                <PaymentMethod
                    state={payment_method}
                    setState={onPaymentChange}
                    validatedRef={isValidPayment}
                    flag={flag}
                />
            </View>
        </>
    )
}