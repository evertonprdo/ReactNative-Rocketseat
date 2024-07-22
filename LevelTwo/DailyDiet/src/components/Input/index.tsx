import { TextInputProps } from "react-native";
import { Container, InputField, InputStyleProps, Label } from "./styles";

type Props = TextInputProps & {
    label: string
    inputHeight?: number
    name: string
    currentFocus?: string | null
}

export function Input({ name, currentFocus, label, inputHeight = 70, ...rest }: Props) {
    const type: InputStyleProps = name === currentFocus ? "Dark-Border" : "Light-Border"
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