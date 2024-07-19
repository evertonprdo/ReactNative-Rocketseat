import styled, { css } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;

    gap: 40px;
    padding: 24px;
`;

export const FeedbackContainer =  styled.View`
    align-items: center;
    gap: 8px;
`;

type Props = { type: "RED" | "GREEN" }

export const Headline = styled.Text<Props>`
    ${({ theme, type }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.TM}px;
        color: ${type === "GREEN" ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK};
    `};
`;

export const SubHeadline = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.REGULAR};
        font-size: ${theme.FONT_SIZE.BM}px;
        color: ${theme.COLORS.GRAY_100};
    `};
`;

export const BoldText = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
`;

export const ImageFeedback = styled.Image`
    height: 288px;
    width: 244px;
`;