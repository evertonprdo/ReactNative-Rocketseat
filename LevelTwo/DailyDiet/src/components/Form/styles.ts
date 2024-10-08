import styled, { css } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
`;

export const FieldsContainer = styled.View`
    gap: 24px;
    height: 500px;
`;

export const TwoColumn = styled.View`
    flex-direction: row;
    gap: 20px;
`;

export const OptionsContainer = styled.View`
    gap: 8px;
`;

export const OptionTitle = styled.Text`
    ${({theme}) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.BS}px;
        color: ${theme.COLORS.GRAY_200};
    `};
`;

export const Options = styled.View`
    flex-direction: row;
    gap: 8px;
`;

export const ChildContainer = styled.View`
    flex: 1;
    justify-content: flex-end;
`;