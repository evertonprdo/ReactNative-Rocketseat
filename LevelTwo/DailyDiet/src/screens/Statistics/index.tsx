import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Container, Data, Title, TwoColumn } from "./styles";
import { NavigationContainer } from "@components/NavigationContainer";
import { StatisticCard } from "@components/StatisticCard";
import { getStorageMeals} from "@storage/meal/getStorageMeal";

import { statistics, type StatisticsScreenDataProps } from "@utils/statistics";
import { Loading } from "@components/Loading";

export function Statistics() {
    const { navigate } = useNavigation();
    const [ screenData, setScreenData] = useState({} as StatisticsScreenDataProps);
    const [ isLoading, setIsLoading ] = useState(true);

    async function getStatisticData() {
        try {
            const meals = await getStorageMeals();
            setScreenData(statistics.screenData(meals.meals));

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        getStatisticData();
    }, []))

    return (
        <NavigationContainer
            type={screenData.type}
            headerComponent= {(
                <StatisticCard
                    subHeadline="das refeições dentro da dieta"
                    headline={screenData.percent}
                    type={screenData.type}
                />
            )}
            onPress={() => navigate("home")}
        >
            <Container>
                { !isLoading ? (
                    <>
                    <Title>Estatísticas gerais</Title>

                    <Data>
                        <StatisticCard
                            subHeadline="melhor sequência de pratos dentro da dieta"
                            headline={ screenData.streak.toString() }
                            type="NONE"
                            size="TM"
                        />
                        <StatisticCard
                            subHeadline="refeições registradas"
                            headline={ screenData.registers.toString() }
                            type="NONE"
                            size="TM"
                        />
                        <TwoColumn>
                            <StatisticCard
                                subHeadline="refeições dentro da dieta"
                                headline= { screenData.goodMeals.toString() }
                                type="GREEN"
                                size="TM"
                            />
                            <StatisticCard
                                subHeadline="refeições fora da dieta"
                                headline={ screenData.badMeals.toString() }
                                type="RED"
                                size="TM"
                            />
                        </TwoColumn>
                    </Data>
                    </>
                ) : (
                    <Loading/>
                )}
            </Container>
        </NavigationContainer>
    )
}