import { Plus } from "phosphor-react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    gap: 32px;
`;

export const NewMeal = styled.View`
    gap: 8px;
`;

export const ButtonLabel = styled.Text`
    ${({theme}) => css`
        font-family: ${theme.FONT_FAMILY.REGULAR};
        font-size: ${theme.FONT_SIZE.BM }px;
        color: ${theme.COLORS.GRAY_100};
    `}
`;

export const Icon = styled(Plus).attrs(({ theme }) => ({
    color: theme.COLORS.WHITE,
    size: 18,
}))``;

export const SectionTitle = styled.Text`
    margin-top: 24px;
    ${({theme}) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.TS}px;
        color: ${theme.COLORS.GRAY_100};
    `}
`;