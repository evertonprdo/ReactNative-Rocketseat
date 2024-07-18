import { Pressable } from "react-native";
import styled, { css } from "styled-components/native";

export type StatisticCardStyleProps = "Green" | "Red" | "Default"

type Props = {
    type: StatisticCardStyleProps
}

export const Container = styled(Pressable)<Props>`
    flex: 1;

    justify-content: center;
    align-items: center;

    padding: 20px 16px;
    gap: 2px;
    border-radius: 8px;

    background-color: ${({theme, type}) => (
        type === "Green" ? theme.COLORS.GREEN_LIGHT
        : type === "Red" ? theme.COLORS.RED_LIGHT
        : theme.COLORS.GRAY_600
    )};
`;

export const Headline = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.TG}px;
        color: ${theme.COLORS.GRAY_100};
    `}
`;

export const SubHeadline = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.REGULAR};
        font-size: ${theme.FONT_SIZE.BS}px;
        color: ${theme.COLORS.GRAY_200};
    `}
`;