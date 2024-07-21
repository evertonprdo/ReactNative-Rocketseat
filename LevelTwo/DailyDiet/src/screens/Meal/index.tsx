import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

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
import { Loading } from "@components/Loading";

import { deleteMealById } from "@storage/meal/deleteStorageMeal";

import type { MealStorageDTO } from "@storage/meal/MealStorageDTO";
import { getStorageMealById } from "@storage/meal/getStorageMeal";
import dayjs from "dayjs";

export function Meal() {
    const { navigate } = useNavigation();
    const route = useRoute();
    const { id } = route.params as { id: number }

    const [ showModal, setShowModal ] = useState(false);
    const [ screenData, setScreenData ] = useState({} as MealStorageDTO);
    const [ isLoading, setIsLoading ] = useState(true)

    async function handleOnDelete() {
        try {
            await deleteMealById(id)
            navigate("home")
        } catch (error) {
            console.log(error)
        }
    }

    async function getScreenData() {
        try {
            const meal = await getStorageMealById(id)
            setScreenData(meal)

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        getScreenData();
    }, []))
    return (
        <NavigationContainer
            type={screenData.status}
            title="Refeição"
            onPress={ () => navigate("home") }
        >
            { !isLoading ? (
                <>
                <Container>
                    <Info>
                        <Headline>{screenData.name}</Headline>
                        <Description>{screenData.description}</Description>
                    </Info>

                    <Info>
                        <SubHeadline>Data e hora</SubHeadline>
                        <Description>{dayjs(screenData.date).format("DD/MM/YYYY")} às {screenData.time}</Description>
                    </Info>

                    <Tag>
                        <TagIcon type={screenData.status}/>
                        <TagText>{screenData.status === "GREEN" ? "dentro" : "fora"} da dieta</TagText>
                    </Tag>
                </Container>

                <ButtonContainer>
                    <Button
                        title="Editar refeição"
                        type="Dark"
                        onPress={ () => navigate("menage_meal",{id: screenData.id}) }
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
            </>
            ) : (
                <Loading/>
            )}
 
        </NavigationContainer>
    )
}