import { Circle, PencilSimpleLine, Trash } from "phosphor-react-native";
import styled, { css } from "styled-components/native";

import type { StatusProps } from "@storage/meal/MealStorageDTO";

export const Container = styled.View`
    flex: 1;
    gap: 24px;
`;

export const Info = styled.View`
    gap: 8px;
`;

export const Headline = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.TS}px;
        color: ${theme.COLORS.GRAY_100};
    `};
`;

export const SubHeadline = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.BM}px;
        color: ${theme.COLORS.GRAY_100};
    `};
`;

export const Description = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.REGULAR};
        font-size: ${theme.FONT_SIZE.BS}px;
        color: ${theme.COLORS.GRAY_200};
    `};
`;

export const Tag = styled.View`
    flex-direction: row;
    align-self: flex-start;
    align-items: center;

    padding: 8px 16px;
    gap: 8px;

    border-radius: 73px;
    background-color: ${({theme}) => theme.COLORS.GRAY_600};
`;

type Props = { type: StatusProps }
export const TagIcon = styled(Circle).attrs<Props>(({theme, type}) => ({
    color: type === "GREEN" ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK,
    size: 8,
    weight: "fill"
}))``;

export const TagText = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.REGULAR};
        font-size: ${theme.FONT_SIZE.BS}px;
        color: ${theme.COLORS.GRAY_100};
    `};
`;

export const ButtonContainer = styled.View`
    gap: 9px;
`;

export const EditIcon = styled(PencilSimpleLine).attrs(({theme}) => ({
    color: theme.COLORS.WHITE,
    size: 18,
}))``;

export const DeleteIcon = styled(Trash).attrs(({theme}) => ({
    color: theme.COLORS.GRAY_100,
    size: 18,
}))``;