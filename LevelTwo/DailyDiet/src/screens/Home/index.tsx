import { useCallback, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import logoImg from "@assets/logo/logo.png"
import profileImg from "@assets/profile/profile.jpeg"

import { Container, Header, Logo, Profile } from "./styles";
import { NewMealButton } from "@components/Button";
import { StatisticCard, StatisticCardOverview } from "@components/StatisticCard";
import { Loading } from "@components/Loading";
import { MealsSectionList, type SectionListMealsProps } from "@components/MealsSectionList";

import { parseMealsToSectionList } from "@utils/sectionList";
import { statistics } from "@utils/statistics";

import { getStorageMeals } from "@storage/meal/getStorageMeal";
import type { MealsStorageDTO, StatusProps } from "@storage/meal/MealStorageDTO";

type PercentTypeProps = {
    type: StatusProps
    percent: string
}
export function Home() {
    const navigation = useNavigation();

    const [ data, setData ] = useState<SectionListMealsProps>([]);
    const [ percent, setPercent ] = useState({} as PercentTypeProps);
    const [ isLoading, setIsLoading ] = useState(true);

    let firstTime = percent.percent === "NaN%" ? true : false;

    function handleOnPressListItem(mealId: number) {
        navigation.navigate("meal", { id: mealId })
    }

    function getGoodMealsPercent(meals: MealsStorageDTO) {
        const result = statistics.goodMealsPercent(meals.meals);

        let formatedPercent = result.toFixed(2) + "%"

        return {
            type: result >= 50 ? "GREEN" : "RED" as StatusProps,
            percent: formatedPercent
        }
    }

    async function getHomeData() {
        try {
            const meals = await getStorageMeals();

            const sectionList = parseMealsToSectionList(meals.meals)
            const percentInfo = getGoodMealsPercent(meals);
            
            setData(sectionList)
            setPercent(percentInfo)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        getHomeData();
    }, []))

    return (
        <Container>
            <Header>
                <Logo
                    source={ logoImg }
                />
                <Profile
                    source={ profileImg }
                />
            </Header>

            {firstTime && (
                <StatisticCard
                    headline="Bem vindo(a)!"
                    subHeadline="Que tal começar cadastrando sua primeira refeição clicando no botão abaixo"
                    type="NONE"
                />
            )}

            {(isLoading && !firstTime) ? <Loading/> : ( !firstTime &&
                <StatisticCardOverview
                    headline={ percent.percent }
                    type={ percent.type }
                    onPress={() => navigation.navigate("statistics")}
                />
            )}

            <NewMealButton
                onPress={ () => navigation.navigate("menage_meal")}
            />

            <MealsSectionList
                data={ data }
                onPressMealItem={ handleOnPressListItem }
            />
        </Container>
    )
}