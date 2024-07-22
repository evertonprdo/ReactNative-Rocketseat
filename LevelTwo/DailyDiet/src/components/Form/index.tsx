import { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import dayjs from "dayjs";

import { ChildContainer, Container, FieldsContainer, Options, OptionsContainer, OptionTitle, TwoColumn } from "./styles";
import { Input } from "@components/Input";
import { Select } from "@components/Select";
import { Calendar, SelectDateModal } from "@components/SelectDateModal";
import { Button } from "@components/Button";

import type { MealFormProps } from "@screens/MenageMeal";

type Props = {
    meal: MealFormProps
    setMeal: (meal: MealFormProps) => void
    children?: React.ReactNode
}
export function Form({ meal, setMeal, children }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [ currentFocus, setCurrentFocus ] = useState<keyof MealFormProps | null>(null)

    const selectedDate = meal.date === "" ? "" : dayjs(meal.date).format("DD/MM/YYYY");

    function handleOnBluer() {
        Keyboard.dismiss();
        setCurrentFocus(null);
    }

    function handleOnChangeTime(value: string) {
        let formatedTime = value.replace(/[^0-9:]/g, '');

        if (!/^\d{0,2}(:\d{0,2})?$/.test(formatedTime)) {
            if (formatedTime.length > 2) {
                formatedTime = formatedTime.slice(0, 2) + ':' + formatedTime.charAt(2);
            }
        }
        handleOnChangeInput(formatedTime, "time")
    }

    function handleOnChangeInput(value: string, prop: keyof MealFormProps) {
        setMeal({
            ...meal,
            [prop]: value
        })
    }
    return (
        <Container>
            <TouchableWithoutFeedback
                onPress={() => handleOnBluer()}
            >
                <Container>
                    <FieldsContainer>
                        <Input
                            label="Nome"
                            name="name"
                            value={meal.name}

                            onChangeText={(text) => handleOnChangeInput(text, "name")}
                            currentFocus={currentFocus}
                            onPressIn={() => setCurrentFocus("name")}
                        />
                        <Input
                            label="Descrição"
                            name="description"
                            value={meal.description}

                            onChangeText={(text) => handleOnChangeInput(text, "description")}
                            currentFocus={currentFocus}
                            onPressIn={() => setCurrentFocus("description")}

                            style={{ textAlign: "justify", textAlignVertical: "top" }}
                            inputHeight={132}
                            multiline
                        />
                        <TwoColumn>
                            <Input
                                label="Data"
                                name="date"
                                value={selectedDate}

                                onChangeText={(text) => handleOnChangeInput(text, "date")}
                                onPressIn={() => setShowModal(true)}
                                onFocus={() => {Keyboard.dismiss(); setCurrentFocus(null)}}

                                showSoftInputOnFocus={false}
                            />
                            <Input
                                label="Hora"
                                name="time"
                                value={meal.time}

                                onChangeText={(text) => handleOnChangeTime(text)}
                                currentFocus={currentFocus}
                                onPressIn={() => setCurrentFocus("time")}

                                inputMode="numeric"
                                maxLength={5}
                            />
                        </TwoColumn>

                        <OptionsContainer>
                            <OptionTitle>
                                Está dentro da dieta?
                            </OptionTitle>

                            <Options>
                                <Select
                                    type="YES"
                                    selected={meal.status === "GREEN"}
                                    onPress={() => handleOnChangeInput("GREEN", "status")}
                                    onPressIn={() => handleOnBluer()}
                                />
                                <Select
                                    type="NO"
                                    selected={meal.status === "RED"}
                                    onPress={() => handleOnChangeInput("RED", "status")}
                                    onPressIn={() => handleOnBluer()}
                                />
                            </Options>

                        </OptionsContainer>
                    </FieldsContainer>

                    <ChildContainer>
                        {children}
                    </ChildContainer>
                </Container>
            </TouchableWithoutFeedback>

            <SelectDateModal
                visible={showModal}
                onClose={() => setShowModal(false)}
            >
                <Calendar
                    maxDate={dayjs(new Date).add(-1, 'day').toISOString()}
                    onDayPress={(value) => handleOnChangeInput(value.dateString, "date")}
                    markedDates={{ [meal.date]: { selected: true } }}
                />
                <Button
                    title="Selecionar"
                    type="Dark"
                    onPress={() => setShowModal(false)}
                />
            </SelectDateModal>
        </Container>
    )
}