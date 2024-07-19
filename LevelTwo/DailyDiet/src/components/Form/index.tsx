import { Input } from "@components/Input";
import { Container, Options, OptionsContainer, OptionTitle, TwoColumn } from "./styles";
import { Select } from "@components/Select";

export function Form() {
    return (
        <Container>
            <Input
                label="Nome"
                type="Light-Border"
            />
            <Input
                label="Descrição"
                type="Light-Border"
                sizeNumber={132}
            />
            <TwoColumn>
                <Input
                    label="Data"
                    type="Light-Border"
                />
                <Input
                    label="Hora"
                    type="Light-Border"
                />
            </TwoColumn>

            <OptionsContainer>
                <OptionTitle>
                    Está dentro da dieta?
                </OptionTitle>

                <Options>
                    <Select
                        type="YES"
                    />
                    <Select
                        type="NO"
                    />
                </Options>
            </OptionsContainer>
        </Container>
    )
}