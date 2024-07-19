import { Button } from "@components/Button";
import { ButtonLabel, Container, Icon } from "./styles";

export function NewMealButton() {
    return (
        <Container>
            <ButtonLabel>
                Refeições
            </ButtonLabel>
            
            <Button
                type="Dark"
                title="Nova refeição"
            >
                <Icon/>
            </Button>
        </Container>
    )
}