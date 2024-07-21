import { useState } from "react";
import { Keyboard, ScrollView } from "react-native";

import { Container, FieldsContainer, Options, OptionsContainer, OptionTitle, TwoColumn } from "./styles";
import { Input } from "@components/Input";
import { Select } from "@components/Select";

import type { MealFormProps } from "@screens/MenageMeal";
import { Calendar, SelectDateModal } from "@components/SelectDateModal";
import { Button } from "@components/Button";

import dayjs from "dayjs";

type Props = {
    meal: MealFormProps
    setMeal: (meal: MealFormProps) => void
    children?: React.ReactNode
}
export function Form({ meal, setMeal, children }: Props) {
    const [ showModal, setShowModal ] = useState(false);

    function handleOnChangeInput(
        value: string,
        prop: keyof MealFormProps
    ): void {
        setMeal({
            ...meal,
            [prop]: value 
        })
    }
    return (
        <Container>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{flex: 1}}
                automaticallyAdjustContentInsets
            >
                <FieldsContainer>
                    <Input
                        label="Nome"
                        type="Light-Border"
                        value={ meal.name }
                        onChangeText={(text) => handleOnChangeInput(text, "name")}
                    />

                    <Input
                        label="Descrição"
                        type="Light-Border"
                        value={ meal.description }
                        onChangeText={(text) => handleOnChangeInput(text, "description")}
                        style={{textAlign: "justify", textAlignVertical: "top"}}
                        inputHeight={132}
                        multiline
                    />

                    <TwoColumn>
                        <Input
                            label="Data"
                            type="Light-Border"
                            value={ dayjs(meal.date).format("DD/MM/YY") }
                            onChangeText={(text) => handleOnChangeInput(text, "date")}
                            onFocus={() => Keyboard.dismiss()}
                            showSoftInputOnFocus= {false}
                            onPressIn={() => setShowModal(true)}
                        />
                        <Input
                            label="Hora"
                            type="Light-Border"
                            value={ meal.time }
                            onChangeText={(text) => handleOnChangeInput(text, "time")}
                            inputMode="numeric"
                        />
                    </TwoColumn>

                    <OptionsContainer>
                        <OptionTitle>
                            Está dentro da dieta?
                        </OptionTitle>

                        <Options>
                            <Select
                                type="YES"
                                selected= {meal.status === "GREEN"}
                                onPress={() => handleOnChangeInput("GREEN", "status")}
                            />

                            <Select
                                type="NO"
                                selected= {meal.status === "RED"}
                                onPress={() => handleOnChangeInput("RED", "status")}
                            />
                        </Options>
                    </OptionsContainer>
                </FieldsContainer>
            </ScrollView>

            { children }

            <SelectDateModal
                visible={ showModal }
                onClose={ () => setShowModal(false) }
            >
                <Calendar
                    maxDate={ dayjs(new Date).add(-1, 'day').toISOString() }
                    onDayPress={ (value) => handleOnChangeInput(value.dateString, "date") }
                    markedDates={{ [meal.date]: {selected: true} }}
                />
                <Button
                    title="Selecionar"
                    type="Dark"
                    onPress={() => {console.log("closeModal"); setShowModal(false)}}
                />
            </SelectDateModal>
        </Container>
    )
}