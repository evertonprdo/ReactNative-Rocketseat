import { TextInputProps } from "react-native";
import { Container, InputField, InputStyleProps, Label } from "./styles";

type Props = TextInputProps & {
    type: InputStyleProps
    label: string
}

export function Input({ type, label, ...rest }: Props) {
    return (
        <Container>
            <Label>
                { label }
            </Label>

            <InputField
                type={type}
                {...rest}
            />
        </Container>
    )
}