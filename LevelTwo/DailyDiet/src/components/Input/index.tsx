import { TextInputProps } from "react-native";
import { Container, InputField, InputStyleProps, Label } from "./styles";

type Props = TextInputProps & {
    type: InputStyleProps
    label: string
    inputHeight?: number
}

export function Input({ type, label, inputHeight = 70, ...rest }: Props) {
    return (
        <Container inputHeight={inputHeight}>
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