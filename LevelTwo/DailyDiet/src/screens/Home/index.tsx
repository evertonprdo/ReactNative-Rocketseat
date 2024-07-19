import { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import logoImg from "@assets/logo/logo.png"
import profileImg from "@assets/profile/profile.jpeg"

import { Container, Header, Logo, Profile } from "./styles";
import { NewMealButton } from "@components/Button";
import { StatisticCardOverview } from "@components/StatisticCard";

import { MealsDTO, DATA } from "../../DATA";
import { MealsSectionList } from "@components/MealsSectionList";

export function Home() {
    const navigation = useNavigation();

    const [ data, setData ] = useState<MealsDTO>(DATA);

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
                onPress={() => navigation.navigate("statistics")}
            />

            <NewMealButton
                onPress={ () => navigation.navigate("menage_meal") }
            />

            <MealsSectionList
                data={data}
                onPress={ () => navigation.navigate("meal") }
            />
        </Container>
    )
}