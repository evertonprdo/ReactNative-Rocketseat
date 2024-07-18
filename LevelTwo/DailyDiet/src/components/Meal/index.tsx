import type { PressableProps } from "react-native";
import { Container, Description, StatusIcon, Time } from "./styles";
import type { MealDTO } from "@components/Meals/DATA";

type Props = PressableProps & MealDTO

export function Meal({ time, description, status }: Props) {
    return (
        <Container>
            <Time>
                {time}
            </Time>

            <Description>
                {description}
            </Description>

            <StatusIcon
                type={status}
            />
        </Container>
    )
}