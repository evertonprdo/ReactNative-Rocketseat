import { View } from "react-native";
import { Container, Header, Icon, Logo, Profile } from "./styles";

import logoImg from "@assets/logo/logo.png"
import profileImg from "@assets/profile/profile.jpeg"

import { MealsSectionList } from "@components/MealsSectionList";
import { NewMealButton } from "@components/MealsSectionList/NewMealButton";
import { StatisticCard } from "@components/StatisticCard";

export function Home() {
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

            <View>
                <StatisticCard
                    type="RED"
                    headline="32,03%"
                    subHeadline="das refeições dentro da dieta"
                />
                <Icon type="RED"/>
            </View>

            <NewMealButton/>

            <MealsSectionList/>
        </Container>
    )
}