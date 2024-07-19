import { useState } from "react";
import { SectionList } from "react-native";

import { Container, SectionTitle } from "./styles";
import { ListItem } from "./ListItem";

import { DATA, type MealDTO, type MealsDTO } from "./DATA";

export function MealsSectionList() {
    const [ data, setData ] = useState<MealsDTO>(DATA)

    return (
        <Container>
            <SectionList 
                sections={ data }
                keyExtractor={({time, description}) => time + "_" + description}
                renderItem={({item}) => (
                    <ListItem
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