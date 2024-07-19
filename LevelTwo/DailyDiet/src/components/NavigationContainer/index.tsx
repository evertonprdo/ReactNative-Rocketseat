import type { PressableProps } from "react-native";
import type { StatusVariantType } from "@components/StatisticCard/styles";
import { Container, Content, Header, Icon, PressableIcon, Title } from "./styles";
import { useState } from "react";

type Props = PressableProps & {
    type: StatusVariantType
    title?: string
    children?: React.ReactNode
    headerComponent?: React.ReactNode
}

export function NavigationContainer({ type, title, children, headerComponent, ...rest }: Props) {
    const [ pressIn, setPressIn ] = useState(false);
    return (
        <Container
            type={type}
        >
            <Header>
                <PressableIcon
                    onPressIn={ () => setPressIn(true) }
                    onPressOut={ () => setPressIn(false) }
                    style={pressIn && { 
                        backgroundColor: "#00000020"
                    }}
                    {...rest}
                >
                    <Icon
                        type={type}
                    />
                </PressableIcon>

                { title && <Title>{ title }</Title> }
                
                { headerComponent }
            </Header>
            
            <Content>
                { children }
            </Content>
        </Container>
    )
}