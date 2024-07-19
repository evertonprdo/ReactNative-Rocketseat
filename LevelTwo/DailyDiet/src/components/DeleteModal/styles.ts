import styled, { css } from "styled-components/native";

export const FillContainer = styled.View`
    flex: 1;

    justify-content: center;
    padding: 24px;
    background-color: #00000040;
`;

export const Window = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;

    max-height: 192px;
    min-height: 192px;
    gap: 32px;

    border-radius: 8px;
    background-color: ${({theme}) => theme.COLORS.GRAY_700};
`;

export const Warning = styled.Text`
    ${({theme}) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.TS}px;
        color: ${theme.COLORS.GRAY_200}
    `};
`;

export const Actions = styled.View`
    flex-direction: row;
    gap: 12px;
    padding: 0 24px;
`;