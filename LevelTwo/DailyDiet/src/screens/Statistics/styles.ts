import styled, { css } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    align-items: center;

    row-gap: 23px;
    padding-top: 8px;
`;

export const Data = styled.View`
    gap: 12px;
`;

export const TwoColumn = styled.View`
    flex-direction: row;

    gap: 12px;
`;

export const Title = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.BS}px;
        color: ${theme.COLORS.GRAY_100};
    `};
`;