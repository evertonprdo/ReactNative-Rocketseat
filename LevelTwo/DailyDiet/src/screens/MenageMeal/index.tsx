import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Button } from "@components/Button";
import { Form } from "@components/Form";
import { NavigationContainer } from "@components/NavigationContainer";

import { validateForm } from "@utils/validateForm";

import { postMeal } from "@storage/meal/postStorageMeal";
import { getStorageMealById } from "@storage/meal/getStorageMeal";
import { putStorageMealById } from "@storage/meal/putStorageMeal";

import type { MealStorageDTO, StatusProps } from "@storage/meal/MealStorageDTO";

export type MealFormProps = Omit<MealStorageDTO, "id" | "status"> & {
    status: StatusProps | ""
}

type RouteParams = {
    id: number
}
let editId: number | null = null

export function MenageMeal() {
    const navigation = useNavigation();
    const route = useRoute();

    const Editing = route.params ? true : false

    const [ meal, setMeal ] = useState({
        name: "",
        description: "",
        date: "",
        time: "",
        status: ""
    } as MealFormProps);

    function handleOnPressButton() {
        if(!(validateForm.allInputsFill(meal))) {
            return Alert.alert("Formulário", "Preencha todos os campos!")
        }
        if (!validateForm.validateTime(meal.time)) {
            return Alert.alert("Formulário", "Hora inválida!")
        }

        if(Editing) {
            handlePutMeal(meal as Omit<MealStorageDTO, "id">);
        } else {
            handlePostMeal(meal as Omit<MealStorageDTO, "id">)
        }
    }

    async function handlePutMeal(validetedMeal: Omit<MealStorageDTO, "id">) {
        try {
            const updatedMeal = {
                ...validetedMeal,
                id: editId as number
            }
            await putStorageMealById(updatedMeal)

            navigation.goBack();

        } catch (error) {
            console.log(error)
        }
    }

    async function handlePostMeal(validetedMeal: Omit<MealStorageDTO, "id">) {
        try {
            await postMeal(validetedMeal)
            
            navigation.navigate("feedback", {status: meal.status as StatusProps});
        } catch (error) {
            console.log(error)
        }
    }
    async function getCurrentMeal(RouteId: number) {
        try {
            const { id, name, description, date, time, status } = await getStorageMealById(RouteId)
            setMeal({
                name,
                description,
                date,
                time,
                status
            })
            editId = id;
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if(Editing) {
            const { id } = route.params as RouteParams
            getCurrentMeal(id)
        }
    }, [])

    return (
        <NavigationContainer
            title={ Editing ? "Editar refeição" : "Nova refeição"}
            type="NONE"
            onPress={() => navigation.navigate("home")}
        >
            <Form 
                meal={ meal }
                setMeal={ setMeal }
            >
                <Button 
                    title={ Editing ? "Salvar alterações" : "Cadastrar refeição"}
                    type="Dark"
                    onPress={ handleOnPressButton }
                />
            </Form>
        </NavigationContainer>
    )
}