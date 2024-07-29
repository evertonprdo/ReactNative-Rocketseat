import { View } from "react-native";

import { TextApp } from "@components/atoms/Text";
import { Tag } from "@components/Tag";
import { Toggle } from "@components/Toggle";
import { Checkable } from "@components/Checkable";
import { Button } from "@components/Button";

export type FilterOptions = {
    condition: {
        new: boolean
        used: boolean
    }
    exchange: boolean
    payment: {
        "Boleto": boolean
        "Pix": boolean
        "Dinheiro": boolean
        "Cartão de Crédito": boolean
        "Deposito Bancário": boolean
    }
}
type FilterAdProps = {
    state: FilterOptions
    setState: (opt: FilterOptions) => void
    onApplyFilters?: () => void
}
export function FilterAd({ state, setState }: FilterAdProps) {
    const { condition, exchange, payment } = state

    // TODO localState & onApplyFilter() { setState(localState) }

    function handleOnConditionChange(key: keyof typeof condition) {
        setState({
            ...state,
            condition: {
                ...condition,
                [key]: !condition[key]
            }
        })
    }
    function handleOnExchangeChange() {
        setState({
            ...state,
            exchange: !exchange
        })
    }
    function handleOnPaymentChange(key: keyof typeof payment) {
        setState({
            ...state,
            payment: {
                ...payment,
                [key]: !payment[key]
            }
        })
    }

    function handleOnApplyfilter() {

    }

    function handleOnResetFilters() {
        setState({
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
        })
    }
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
                        <Checkable.CheckboxTemplate
                            key={item}
                            checked={payment[item as keyof typeof payment]}
                            onPress={() => handleOnPaymentChange(item as keyof typeof payment)}
                        >
                            {item}
                        </Checkable.CheckboxTemplate>
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
                    className="flex-1"
                    variant="black"
                >
                    <Button.Title>Aplicar filtros</Button.Title>
                </Button>
            </View>
        </>
    )
}