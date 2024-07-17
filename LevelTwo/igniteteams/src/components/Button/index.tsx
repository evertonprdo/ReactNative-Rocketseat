import type { TouchableOpacityProps } from 'react-native';

import { Container, Title, type ButtonTypeStyleProps } from './styles';

type Props = TouchableOpacityProps & {
    title: string;
    type?: ButtonTypeStyleProps
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
    return (
        <Container
            type={type}
            {...rest}
        >
            <Title>
                {title}
            </Title>
        </Container>
    )
}