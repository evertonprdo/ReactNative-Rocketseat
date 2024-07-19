import { Form } from "@components/Form";
import { NavigationContainer } from "@components/NavigationContainer";

export function NewMeal() {
    return (
        <NavigationContainer
            title="Nova refeição"
            type="NONE"
        >
            <Form/>
        </NavigationContainer>
    )
}