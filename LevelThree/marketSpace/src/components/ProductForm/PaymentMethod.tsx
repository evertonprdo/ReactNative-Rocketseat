import { Checkable } from "@components/base/Checkable"
import { TextApp } from "@components/base/Text";
import { useEffect, useState } from "react";
import { View } from "react-native";

export const paymentMethods = {
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
    validatedRef: React.MutableRefObject<boolean>
}
export function PaymentMethod({state, setState, flag, validatedRef}: Props) {
    const [ isValid, setIsValid ] = useState(true);

    function handleOnValueChange(key: keyof PaymentMethodProps) {
        setState({
            ...state,
            [key]: !state[key]
        })
    }

    useEffect(() => {
        const checkRules = Object.values(state).includes(true)

        setIsValid(checkRules)
        validatedRef.current = checkRules
    }, [state])
    
    return (
        <View className="gap-3">
            <View className="mb-3">
                <TextApp className="font-bold text-sm">Meios de pagamento aceitos</TextApp>
                { !flag ? null : !isValid && 
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