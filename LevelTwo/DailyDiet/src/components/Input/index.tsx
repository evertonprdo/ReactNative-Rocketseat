import { TextInputProps } from "react-native";
import { Container, InputField, InputStyleProps, Label } from "./styles";

type Props = TextInputProps & {
    type: InputStyleProps
    label: string
    sizeNumber?: number
}

export function Input({ type, label, sizeNumber = 70, ...rest }: Props) {
    console.log(sizeNumber)
    return (
        <Container sizeNumber={sizeNumber}>
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