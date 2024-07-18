import { useState } from "react";

import { ButtonLabel, Container, Icon, NewMeal, SectionTitle } from "./styles";
import { Button } from "@components/Button";
import { SectionList, Text } from "react-native";
import { Meal } from "@components/Meal";

import { DATA, type MealDTO, type MealsDTO } from "./DATA";

export function Meals() {
    const [ data, setData ] = useState<MealsDTO>(DATA)

    return (
        <Container>
            <NewMeal>
                <ButtonLabel>
                    Refeições
                </ButtonLabel>
                
                <Button
                    type="Dark"
                    title="Nova refeição"
                >
                    <Icon/>
                </Button>
            </NewMeal>

            <SectionList 
                sections={ data }
                keyExtractor={({time, description}) => time + "_" + description}
                renderItem={({item}) => (
                    <Meal
                        time={item.time}
                        description={item.description}
                        status={item.status}
                    />
                )}
                renderSectionHeader={({section}) => (
                    <SectionTitle>
                        {section.date}
                    </SectionTitle>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{gap: 8, paddingBottom: 144}}
            />
        </Container>
    )
}