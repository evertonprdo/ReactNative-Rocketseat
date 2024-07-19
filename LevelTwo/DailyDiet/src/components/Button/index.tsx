import type { PressableProps } from "react-native";
import { ButtonLabel, type ButtonStyleProps, Container, Icon, Label, NewMealContainer } from "./styles";
import { useState } from "react";

type Props = PressableProps & {
    type: ButtonStyleProps
    title: string
    children?: React.ReactNode
}
export function Button({ type, title, children, ...rest }: Props) {
    const [ activated, setActivated ] = useState(false);
    return (
        <Container
            type={ type }
            activited={ activated }
            onPressIn={() => setActivated(true)}
            onPressOut={() => setActivated(false)}
            {...rest}
        >
            { children }

            <Label
                type={ type }
            >
                { title }
            </Label>
        </Container>
    )
}

export function NewMealButton({...rest}: PressableProps) {
    return (
        <NewMealContainer>
            <ButtonLabel>
                Refeições
            </ButtonLabel>
            
            <Button
                type="Dark"
                title="Nova refeição"
                {...rest}
            >
                <Icon/>
            </Button>
        </NewMealContainer>
    )
}