import { useState } from "react";
import { type PressableProps, SectionList } from "react-native";
import { useTheme } from "styled-components/native";
import dayjs from "dayjs";

import { Container, Description, SectionTitle, StatusIcon, Time } from "./styles";
import type { MealStorageDTO } from "@storage/meal/MealStorageDTO";

type Props = PressableProps & {
    data: SectionListMealsProps
    onPressMealItem: (id: number) => void
}

export type SectionListDateMealsProps = {
    date: string
    data: MealStorageDTO[]
}
export type SectionListMealsProps = SectionListDateMealsProps[]

export function MealsSectionList({data, onPressMealItem, ...rest}: Props) {
    return (
        <SectionList 
            sections={ data }
            keyExtractor={({id}) => "MealKey_" + id}
            renderItem={({item}) => (
                <ListItem
                    date={dayjs(item.date).format("HH:mm")}
                    description={item.name}
                    status={item.status}
                    onPress={ () => onPressMealItem(item.id) }
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

type ItemProps = PressableProps & Omit<MealStorageDTO, "id" | "name">

function ListItem({ date, description, status, ...rest }: ItemProps) {
    const [ pressIn, setPressIn ] = useState(false);
    const theme = useTheme();

    const maxLenght = 33;

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
                {date}
            </Time>

            <Description>
                {description.length <= maxLenght
                    ? description
                    : description.slice(0, maxLenght - 3) + "..."
                }
            </Description>

            <StatusIcon
                type={status}
            />
        </Container>
    )
}