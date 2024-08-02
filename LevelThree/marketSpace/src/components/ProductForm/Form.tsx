import { useEffect, useState } from "react"
import { View } from "react-native"

import { PaymentMethod, PaymentMethodProps } from "./PaymentMethod"
import { TextApp } from "@components/base/Text"
import { Input } from "@components/base/Input"
import { Checkable } from "@components/base/Checkable"
import { Toggle } from "@components/base/Toggle"

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
    setValidatedFields?: (val: boolean) => void
}
export function Form({ state, flag, onTextChange, onChangeValue, onPaymentChange, setValidatedFields }: ProductFormProps) {
    const { title, description, price, accept_trade, is_new, payment_method } = state ?? {}

    const [isValidTitle, setIsValidTitle] = useState(true);
    const [isValidDesc, setisValidDescr] = useState(true);
    const [isValidPrice, setisValidPrice] = useState(true);
    const [isValidRadio, setisValidRadio] = useState(true);
    const [ isValidPayment, setIsValidPayment ] = useState(true);

    const rules = {
        title: {
            min: 5,
            max: 37
        },
        descr: {
            min: 12,
            max: 255
        },
    }

    function checkTitle() {
        setIsValidTitle(
            title.trim().length >= rules.title.min &&
            title.trim().length <= rules.title.max
        )
    }

    function checkDescription() {
        setisValidDescr(
            description.trim().length >= rules.descr.min &&
            description.trim().length <= rules.descr.max
        )
    }

    function checkPrice() {
        setisValidPrice(!isNaN(parseFloat(price)))
    }

    function checkIsNewRadio() {
        setisValidRadio(is_new !== undefined)
    }

    function checkFields() {
        if(!isValidTitle) return false
        if(!isValidDesc) return false
        if(!isValidPrice) return false
        if(!isValidRadio) return false
        if(!isValidPayment) return false

        return true
    }

    useEffect(() => {
        if (!flag) return

        checkTitle();
        checkDescription();
        checkPrice();
        checkIsNewRadio();

        if(setValidatedFields) setValidatedFields(checkFields());
    }, [flag, state])
    return (
        <>
            <View className={"gap-4"}>
                <TextApp className="font-bold text-sm">Sobre o produto</TextApp>

                {!isValidTitle &&
                    <Input.Alert className="-my-3">
                        O título deve ter no
                        {title.length < rules.title.min
                            ? ` mínimo ${rules.title.min}`
                            : ` máximo ${rules.title.max}`
                        } caracteres.
                    </Input.Alert>
                }
                <Input>
                    <Input.Field
                        placeholder="Título do anúncio"
                        value={title}
                        onChangeText={(text) => onTextChange(text, "title")}
                        maxLength={rules.title.max}
                    />
                </Input>

                {!isValidDesc &&
                    <Input.Alert className="-my-3">
                        A descrição deve ter no
                        {description.length < rules.descr.min
                            ? ` mínimo ${rules.descr.min}`
                            : ` máximo ${rules.descr.max}`
                        } caracteres.
                    </Input.Alert>
                }
                <Input>
                    <Input.Field
                        placeholder="Descrição do produto"
                        value={description}
                        onChangeText={(text) => onTextChange(text, "description")}
                        maxLength={rules.descr.max}
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
                {!isValidRadio &&
                    <Input.Alert className="-my-3">
                        Selecione pelo menos uma das opções.
                    </Input.Alert>
                }
            </View>

            <View className="gap-4">
                <TextApp className="font-bold text-sm">Venda</TextApp>

                {!isValidPrice &&
                    <Input.Alert className="-my-3">
                        Você deve preencher o valor.
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
                    flag={flag}
                    setValidatedFields={setIsValidPayment}
                />
            </View>
        </>
    )
}