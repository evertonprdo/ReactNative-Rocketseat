import type { PressableProps } from "react-native";
import { type ButtonStyleProps, Container, Label } from "./styles";

type Props = PressableProps & {
    type: ButtonStyleProps
    title: string
    activated?: boolean
    children?: React.ReactNode
}
export function Button({ type, title, activated = false, children, ...rest }: Props) {
    return (
        <Container
            type={ type }
            activited={activated}
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