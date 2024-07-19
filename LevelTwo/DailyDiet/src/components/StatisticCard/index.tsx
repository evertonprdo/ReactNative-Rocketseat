import { useState } from "react";
import { View, type PressableProps } from "react-native";

import {
    Headline,
    Container,
    SubHeadline,
    type StatusVariantType,
    type HeadlineSizeVariantType,
    PressableIcon,
    Icon,
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

export function StatisticCardOverview({ ...rest }: PressableProps) {
    const [ pressIn, setPressIn ] = useState(false);
    
    return (
        <View>
            <StatisticCard
                type="RED"
                headline="32,03%"
                subHeadline="das refeições dentro da dieta"
            />
            <PressableIcon
                onPressIn={ () => setPressIn(true) }
                onPressOut={ () => setPressIn(false) }
                style={pressIn && { 
                    backgroundColor: "#00000020"
                }}
                {...rest}
            >
                <Icon type="RED"/>
            </PressableIcon>
        </View>
    )
}