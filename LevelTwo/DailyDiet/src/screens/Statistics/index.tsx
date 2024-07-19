import { NavigationContainer } from "@components/NavigationContainer";
import { StatisticCard } from "@components/StatisticCard";
import { Container, Data, Title, TwoColumn } from "./styles";

export function Statistics() {
    return (
        <NavigationContainer
            type="RED"
            headerComponent= {(
                <StatisticCard
                    subHeadline="das refeições dentro da dieta"
                    headline="90,38%"
                    type="RED"
                />
            )}
        >
            <Container>
                <Title>Estatísticas gerais</Title>

                <Data>
                    <StatisticCard
                        subHeadline="melhor sequência de pratos dentro da dieta"
                        headline="4"
                        type="NONE"
                        size="TM"
                    />
                    <StatisticCard
                        subHeadline="refeições registradas"
                        headline="109"
                        type="NONE"
                        size="TM"
                    />
                    <TwoColumn>
                        <StatisticCard
                            subHeadline="refeições registradas"
                            headline="32"
                            type="GREEN"
                            size="TM"
                        />
                        <StatisticCard
                            subHeadline="refeições fora da dieta"
                            headline="77"
                            type="RED"
                            size="TM"
                        />
                    </TwoColumn>
                </Data>
            </Container>
        </NavigationContainer>
    )
}