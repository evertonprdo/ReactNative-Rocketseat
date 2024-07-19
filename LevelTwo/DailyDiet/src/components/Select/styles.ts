import { Pressable } from "react-native";
import { Circle } from "phosphor-react-native";
import styled, { css } from "styled-components/native";

export type SelectStyleProps = "YES" | "NO";

type Props = {
    type: SelectStyleProps
    Selected?: boolean
}

export const Container = styled(Pressable)<Props>`
    flex: 1;
    flex-direction: row;

    align-items: center;
    justify-content: center;

    padding: 16px;
    gap: 8px;
    border-radius: 6px;

    ${({ theme, type, Selected }) => Selected ? 
    css`
        border-width: 1px;
        background-color: ${type === "YES" ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT};
        border-color: ${type === "YES" ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK};
    `: css`
        background-color: ${theme.COLORS.GRAY_600};
    `}
`;

export const Title = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.BS}px;
        color: ${theme.COLORS.GRAY_100};
    `};
`;

export const Icon = styled(Circle).attrs<Props>(({ theme, type }) => ({
    size: 8,
    color: type === "YES" ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK,
    weight: 'fill'
}))``;