import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Button } from "@components/Button";
import { Form } from "@components/Form";
import { NavigationContainer } from "@components/NavigationContainer";

import type { MealStorageDTO } from "@storage/meal/MealStorageDTO";
import { Alert } from "react-native";

export type MealFormProps = Omit<MealStorageDTO, "id" | "status"> & {
    status: "RED" | "GREEN" | "NONE"
}

type RouteParams = {
    id: number
}
export function MenageMeal() {
    const navigation = useNavigation();
    const route = useRoute();

    const Editing = route.params ? true : false

    const [ meal, setMeal ] = useState({
        name: "",
        description: "",
        date: "",
        time: "",
        status: "NONE"
    } as MealFormProps);

    function isValidMeal() {
        let isValid = true
        for (const key in meal) {
            if(!(meal[key as keyof MealFormProps].trim())) {
                Alert.alert("Formulário", "Todos os campos devem ser preenchidos!");
                return isValid = false;
            }
        }
        return isValid
    }

    function handleOnPressButton() {
        if(Editing) {
            navigation.goBack()
        } else {
            if(!isValidMeal()) return

            handlePostMeal();
            navigation.navigate("feedback", {status: meal.status as "GREEN" | "RED"});
        }
    }

    async function handlePostMeal() {
        try {
            console.log(meal)

        } catch (error) {
            console.log(error)
        }
    }

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