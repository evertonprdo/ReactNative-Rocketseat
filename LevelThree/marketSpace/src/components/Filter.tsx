import { useRef, useState } from "react";
import { View } from "react-native";

import { TextApp } from "@components/base/Text";
import { Tag } from "@components/base/Tag";
import { Toggle } from "@components/base/Toggle";
import { Button } from "@components/base/Button";
import { PaymentMethod } from "./ProductForm/PaymentMethod";

export const defaultFilterStateObj = {
    condition: {
        new: true,
        used: true,
    },
    acceptTrade: true,
    payment: {
        boleto: true,
        pix: true,
        cash: true,
        card: true,
        deposit: true,
    }
}

export type FilterOptions = typeof defaultFilterStateObj

type FilterAdProps = {
    state: FilterOptions
    onApplyFilters?: (val: FilterOptions) => void
}

function FilterAd({ state, onApplyFilters }: FilterAdProps) {
    const [condition, setCondition] = useState({
        new: state.condition.new,
        used: state.condition.used
    });
    const [exchange, setExchange] = useState(state.acceptTrade);
    const [payment, setPayment] = useState(state.payment);

    const [ checkRules, setCheckRules ] = useState(false)
    const payRef = useRef(false)

    function handleOnConditionChange(key: keyof typeof condition) {
        setCondition({
            ...condition,
            [key]: !condition[key]
        })
    }

    function handleOnExchangeChange() {
        setExchange(!exchange)
    }

    function handleOnResetFilters() {
        setCondition(defaultFilterStateObj.condition);
        setExchange(defaultFilterStateObj.acceptTrade);
        setPayment(defaultFilterStateObj.payment);
    }

    function handleOnApplyfilter() {
        setCheckRules(true)
        if (!payRef.current) return

        if (onApplyFilters) {
            onApplyFilters({
                condition,
                acceptTrade: exchange,
                payment
            });
        }
    }
    return (
        <>
            <View className="gap-3">
                <TextApp className="font-bold text-sm">Condição</TextApp>

                <View className="flex-row gap-2">
                    <Tag
                        onPress={() => handleOnConditionChange("new")}
                        selected={condition.new}
                        disabled={condition.new && !condition.used}
                    >Novo</Tag>

                    <Tag
                        onPress={() => handleOnConditionChange("used")}
                        selected={condition.used}
                        disabled={!condition.new && condition.used}
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

            <PaymentMethod
                state={payment}
                setState={setPayment}
                validatedRef={payRef}
                flag={checkRules}
            />

            <View className="flex-row gap-3 mt-16">
                <Button
                    className="flex-1"
                    variant="gray"
                    onPress={handleOnResetFilters}
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