import { useCallback, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import logoImg from "@assets/logo/logo.png"
import profileImg from "@assets/profile/profile.jpeg"

import { Container, Header, Logo, Profile } from "./styles";
import { NewMealButton } from "@components/Button";
import { StatisticCardOverview } from "@components/StatisticCard";

import { MealsSectionList, type SectionListMealsProps } from "@components/MealsSectionList";
import { getStorageMeals } from "@storage/meal/getStorageMeal";
import { parseMealsToSectionList } from "@utils/sectionList";
import { statistics } from "@utils/statistics";

import type { MealsStorageDTO, StatusProps } from "@storage/meal/MealStorageDTO";

type PercentTypeProps = {
    type: StatusProps
    percent: string
}
export function Home() {
    const navigation = useNavigation();

    const [ data, setData ] = useState<SectionListMealsProps>([]);
    const [ percent, setPercent ] = useState({} as PercentTypeProps);

    function handleOnPressListItem(mealId: number) {
        navigation.navigate("meal", { id: mealId })
    }

    function fetchMealsToSectionList(meals: MealsStorageDTO) {
        const parsedMeals = parseMealsToSectionList(meals.meals)

        setData(parsedMeals)
    }

    function getGoodMealsPercent(meals: MealsStorageDTO) {
        const result = statistics.goodMealsPercent(meals.meals);

        let formatedPercent = result.toFixed(2) + "%"

        setPercent({
            type: result >= 50 ? "GREEN" : "RED",
            percent: formatedPercent
        })
    }

    async function getHomeData() {
        try {
            const meals = await getStorageMeals();

            fetchMealsToSectionList(meals)
            getGoodMealsPercent(meals);
        } catch (error) {
            console.log(error)
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

            <StatisticCardOverview
                headline={ percent.percent }
                type={ percent.type }
                onPress={() => navigation.navigate("statistics")}
            />

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