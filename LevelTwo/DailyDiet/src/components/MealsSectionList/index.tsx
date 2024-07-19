import { useState } from "react";
import { type PressableProps, SectionList } from "react-native";
import { useTheme } from "styled-components/native";

import { Container, Description, SectionTitle, StatusIcon, Time } from "./styles";
import type { MealStorageDTO } from "@storage/meal/MealStorageDTO";

type Props = PressableProps & {
    data: SectionListMealsProps
}
type SectionListMealsProps = {
    date: string
    data: MealStorageDTO[]
}[]
export function MealsSectionList({data, ...rest}: Props) {
    return (
        <SectionList 
            sections={ data }
            keyExtractor={({time, description}) => time + "_" + description}
            renderItem={({item}) => (
                <ListItem
                    time={item.time}
                    description={item.description}
                    status={item.status}
                    {...rest}
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
    )
}

type ItemProps = PressableProps & Omit<MealStorageDTO, "id" | "date" | "name">

function ListItem({ time, description, status, ...rest }: ItemProps) {
    const [ pressIn, setPressIn ] = useState(false);

    const theme = useTheme();

    return (
        <Container 
            style={ pressIn && {
                backgroundColor: theme.COLORS.GRAY_500
            }}
            onPressIn={() => setPressIn(true)}
            onPressOut={() => setPressIn(false)}
            {...rest}
        >
            <Time>
                {String(time)}
            </Time>

            <Description>
                {description}
            </Description>

            <StatusIcon
                type={status}
            />
        </Container>
    )
}