import { Card, Container, Header, Logo, Profile } from "./styles";

import logoImg from "@assets/logo/logo.png"
import profileImg from "@assets/profile/profile.jpeg"

import { Meals } from "@components/Meals";
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

            <Card>
                <StatisticCard
                    type="Red"
                    headline="32,03%"
                    subHeadline="das refeições dentro da dieta"
                />
            </Card>

            <Meals/>
        </Container>
    )
}