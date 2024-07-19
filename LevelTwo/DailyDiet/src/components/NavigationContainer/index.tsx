import type { PressableProps } from "react-native";
import type { StatusVariantType } from "@components/StatisticCard/styles";
import { Container, Content, Header, Icon, PressableIcon, Title } from "./styles";

type Props = PressableProps & {
    type: StatusVariantType
    title?: string
    children?: React.ReactNode
    headerComponent?: React.ReactNode
}

export function NavigationContainer({ type, title, children, headerComponent, ...rest }: Props) {
    return (
        <Container
            type={type}
        >
            <Header>
                <PressableIcon {...rest}>
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