import type { PressableProps } from "react-native";
import { Container, Icon, type SelectStyleProps, Title } from "./styles";

type Props = PressableProps & {
    type: SelectStyleProps
    selected?: boolean
}
export function Select({ type, selected, ...rest }: Props) {
    return (
        <Container
            type= {type}
            Selected= {selected}
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