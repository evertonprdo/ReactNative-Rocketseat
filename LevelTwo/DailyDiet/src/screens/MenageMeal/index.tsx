import { useNavigation, useRoute } from "@react-navigation/native";

import { Button } from "@components/Button";
import { Form } from "@components/Form";
import { NavigationContainer } from "@components/NavigationContainer";
import { getLastId } from "@storage/meal/getStorageMeal";

type RouteParams = {
    id: number
}
export function MenageMeal() {
    const navigation = useNavigation();
    const route = useRoute();

    const Editing = route.params ? true : false

    function handleOnPressButton() {
        if(Editing) {
            navigation.goBack()
        } else {
            handlePutMeal();
            navigation.navigate("feedback");
        }
    }

    async function handlePutMeal() {
        try {
            const lastId = await getLastId();
            console.log(lastId)

        } catch (error) {
            console.log("Erro", error)
        }
    }

    return (
        <NavigationContainer
            title={ Editing ? "Editar refeição" : "Nova refeição"}
            type="NONE"
            onPress={() => navigation.navigate("home")}
        >
            <Form>
                <Button 
                    title={ Editing ? "Salvar alterações" : "Cadastrar refeição"}
                    type="Dark"
                    onPress={ handleOnPressButton }
                />
            </Form>
        </NavigationContainer>
    )
}