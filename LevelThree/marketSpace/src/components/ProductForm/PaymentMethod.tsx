import { Checkable } from "@components/base/Checkable"
import { TextApp } from "@components/base/Text";
import { useEffect, useState } from "react";
import { View } from "react-native";

const paymentMethods = {
    boleto: "Boleto",
    pix: "Pix",
    cash: "Dinheiro",
    card: "Cartão de crédito",
    deposit: "Depósito",
}

export type PaymentMethodProps = {
    boleto: boolean,
    pix: boolean,
    cash: boolean,
    card: boolean,
    deposit: boolean,
}

type Props = {
    state: PaymentMethodProps
    setState: (obj: PaymentMethodProps) => void
    flag?: boolean
    setValidatedFields?: (val: boolean) => void
}
export function PaymentMethod({state, setState, flag, setValidatedFields}: Props) {
    const [ isValid, setIsValid ] = useState(true);

    function handleOnValueChange(key: keyof PaymentMethodProps) {
        setState({
            ...state,
            [key]: !state[key]
        })
    }

    function checkRules() {
        let count = 0;

        for(const key in state) {
            if(state[key as keyof typeof paymentMethods] === true) {
                count++
                break
            }
        }
        setIsValid(count > 0)
    }

    useEffect(() => {
        if(!flag) return

        checkRules();
        if(setValidatedFields) setValidatedFields(isValid)
    }, [flag, state])

    return (
        <View className="gap-3">
            <View className="mb-3">
                <TextApp className="font-bold text-sm">Meios de pagamento aceitos</TextApp>
                { !isValid && 
                    <TextApp className="text-red-500 text-xs">
                        Selecione pelo menos 1 campo
                    </TextApp>}
            </View>
            
            <View className="gap-2">
                {Object.keys(paymentMethods).map(val => {
                    const key = val as keyof PaymentMethodProps
                    return (
                        <Checkable
                            key={key}
                            checked={state[key]}
                            onPress={() => handleOnValueChange(key)}
                        >
                            {paymentMethods[key]}
                        </Checkable>
                    )
                })}
            </View>
        </View>
    )
}