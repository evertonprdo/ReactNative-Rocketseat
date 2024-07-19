import { ScrollView } from "react-native";

import { Container, FieldsContainer, Options, OptionsContainer, OptionTitle, TwoColumn } from "./styles";
import { Input } from "@components/Input";
import { Select } from "@components/Select";

import type { MealStorageDTO } from "@storage/meal/MealStorageDTO";

type Props = {
    meal?: Omit<MealStorageDTO, "id">
    children?: React.ReactNode
}
export function Form({ meal, children }: Props) {
    return (
        <Container>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{flex: 1}}
                automaticallyAdjustContentInsets
            >
                <FieldsContainer>
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
                </FieldsContainer>
            </ScrollView>

            { children }
        </Container>
    )
}