import styled, { css } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    gap: 32px;
`;

export const SectionTitle = styled.Text`
    margin-top: 24px;
    
    ${({theme}) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.TS}px;
        color: ${theme.COLORS.GRAY_100};
    `}
`;