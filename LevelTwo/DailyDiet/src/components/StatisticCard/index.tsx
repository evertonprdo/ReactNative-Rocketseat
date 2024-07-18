import type { PressableProps } from "react-native";
import {
    Headline,
    Container,
    SubHeadline,
    type StatisticCardStyleProps,
} from "./styles";

type Props = PressableProps & {
    type: StatisticCardStyleProps
    headline: string
    subHeadline: string
}

export function StatisticCard({ type, headline, subHeadline, ...rest  }: Props) {
    return (
        <Container
            type={type}
            {...rest}
        >
            <Headline>
                {headline}
            </Headline>

            <SubHeadline>
                {subHeadline}
            </SubHeadline>
        </Container>
    )
}