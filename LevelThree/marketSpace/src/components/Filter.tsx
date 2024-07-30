import { useState } from "react";
import { View } from "react-native";

import { TextApp } from "@components/atoms/Text";
import { Tag } from "@components/Tag";
import { Toggle } from "@components/Toggle";
import { Checkable } from "@components/Checkable";
import { Button } from "@components/Button";

export const defaultFilterStateObj = {
    condition: {
        new: true,
        used: true,
    },
    exchange: true,
    payment: {
        "Boleto": true,
        "Pix": true,
        "Dinheiro": true,
        "Cartão de Crédito": true,
        "Deposito Bancário": true,
    }
}

export type FilterOptions = typeof defaultFilterStateObj

type FilterAdProps = {
    state: FilterOptions
    onApplyFilters?: (val: FilterOptions) => void
}

function FilterAd({ state, onApplyFilters }: FilterAdProps) {
    const [ condition, setCondition ] = useState({
        new: state.condition.new,
        used: state.condition.used
    });
    const [ exchange, setExchange ] = useState(state.exchange);
    const [ payment, setPayment ] = useState({
        "Boleto": state.payment.Boleto,
        "Pix": state.payment.Pix,
        "Dinheiro": state.payment.Dinheiro,
        "Cartão de Crédito": state.payment["Cartão de Crédito"],
        "Deposito Bancário": state.payment["Deposito Bancário"],
    });

    function handleOnConditionChange(key: keyof typeof condition) {
        setCondition({
            ...condition,
            [key]: !condition[key]
        })
    }

    function handleOnExchangeChange() {
        setExchange(!exchange)
    }

    function handleOnPaymentChange(key: keyof typeof payment) {
        setPayment({
            ...payment,
            [key]: !payment[key]
        })
    }

    function handleOnResetFilters() {
        setCondition(defaultFilterStateObj.condition);
        setExchange(defaultFilterStateObj.exchange);
        setPayment(defaultFilterStateObj.payment);
    }

    function handleOnApplyfilter() {
        if(onApplyFilters) {
            onApplyFilters({
                condition,
                exchange,
                payment
            });
        }
    }
    console.log(exchange)
    return (
        <>
            <View className="gap-3">
                <TextApp className="font-bold text-sm">Condição</TextApp>

                <View className="flex-row gap-2">
                    <Tag
                        onPress={() => handleOnConditionChange("new")}
                        selected={condition.new}
                    >Novo</Tag>

                    <Tag
                        onPress={() => handleOnConditionChange("used")}
                        selected={condition.used}
                    >Usado</Tag>
                </View>
            </View>

            <View className="gap-3">
                <TextApp className="font-bold text-sm">Aceita troca?</TextApp>

                <View className="flex-row gap-2">
                    <Toggle 
                        value={exchange}
                        onPress={handleOnExchangeChange}
                    />
                </View>
            </View>

            <View className="gap-3">
                <TextApp className="font-bold text-sm">Meios de pagamento aceitos</TextApp>

                <View className="gap-2">
                    {Object.keys(payment).map(item => (
                        <Checkable
                            key={item}
                            variant="checkbox"
                            checked={payment[item as keyof typeof payment]}
                            onPress={() => handleOnPaymentChange(item as keyof typeof payment)}
                        >
                            {item}
                        </Checkable>
                    ))}
                </View>
            </View>

            <View className="flex-row gap-3 mt-16">
                <Button
                    className="flex-1"
                    variant="gray"
                    onPress={ handleOnResetFilters }
                >
                    <Button.Title>Resetar filtros</Button.Title>
                </Button>

                <Button
                    onPress={handleOnApplyfilter}
                    className="flex-1"
                    variant="black"
                >
                    <Button.Title>Aplicar filtros</Button.Title>
                </Button>
            </View>
        </>
    )
}

export { FilterAd }