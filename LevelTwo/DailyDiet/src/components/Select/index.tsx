import type { PressableProps } from "react-native";
import { Container, Icon, type SelectStyleProps, Title } from "./styles";

type Props = PressableProps & {
    type: SelectStyleProps
    Selected?: boolean
}
export function Select({ type, Selected, ...rest }: Props) {
    return (
        <Container
            type= {type}
            Selected= {Selected}
            {...rest}
        >
            <Icon
                type= { type }
            />

            <Title>
                { type === "YES" ? "Sim" : "Não" }
            </Title>
        </Container>
    )
}