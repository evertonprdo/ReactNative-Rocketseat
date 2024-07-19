import { useNavigation } from "@react-navigation/native";

import {
    Tag,
    Info,
    TagIcon,
    TagText,
    EditIcon,
    Headline,
    Container,
    DeleteIcon,
    SubHeadline,
    Description,
    ButtonContainer,
} from "./styles";

import { NavigationContainer } from "@components/NavigationContainer";
import { Button } from "@components/Button";
import { DeleteModal } from "@components/DeleteModal";
import { useState } from "react";

export function Meal() {
    const { navigate } = useNavigation();

    const [ showModal, setShowModal ] = useState(false);

    function handleOnDelete() {
        navigate("home")
    }
    return (
        <NavigationContainer
            type="GREEN"
            title="Refeição"
            onPress={ () => navigate("home") }
        >
            <Container>
                <Info>
                    <Headline>Sanduíche</Headline>
                    <Description>Sanduíche de pão integral com atum e salada de alface e tomate</Description>
                </Info>

                <Info>
                    <SubHeadline>Data e hora</SubHeadline>
                    <Description>12/08/2022 às 16:00</Description>
                </Info>

                <Tag>
                    <TagIcon type="GREEN"/>
                    <TagText>dentro da dieta</TagText>
                </Tag>
            </Container>

            <ButtonContainer>
                <Button
                    title="Editar refeição"
                    type="Dark"
                    onPress={ () => navigate("menage_meal") }
                >
                    <EditIcon />
                </Button>
                <Button
                    title="Excluir refeição"
                    type="Light"
                    onPress={() => setShowModal(true)}
                >
                    <DeleteIcon/>
                </Button>
            </ButtonContainer>

            <DeleteModal 
                visible={showModal}
                onPressCancel={() => setShowModal(false)}
                onPressConfirm={ handleOnDelete }
            />
        </NavigationContainer>
    )
}