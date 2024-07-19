import type { PressableProps } from "react-native";
import {
    Headline,
    Container,
    SubHeadline,
    type StatusVariantType,
    type HeadlineSizeVariantType,
} from "./styles";

type Props = PressableProps & {
    type: StatusVariantType
    headline: string
    subHeadline: string
    size?: HeadlineSizeVariantType
}

export function StatisticCard({ type, headline, subHeadline, size, ...rest  }: Props) {
    return (
        <Container
            type={type}
            {...rest}
        >
            <Headline size={size}>
                {headline}
            </Headline>

            <SubHeadline>
                {subHeadline}
            </SubHeadline>
        </Container>
    )
}