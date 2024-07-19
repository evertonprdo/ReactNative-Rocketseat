import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

export type InputStyleProps = "Dark-Border" | "Light-Border"

type Props = {
    type: InputStyleProps
    sizeNumber?: number 
}
export const Container = styled.View< Omit<Props, "type"> >`
    flex: 1;

    gap: 4px;

    ${({sizeNumber}) => css`
        min-height: ${sizeNumber}px;
        max-height: ${sizeNumber}px;
    `};
`;

export const Label = styled.Text`
    ${({ theme }) => css`
        font-family: ${ theme.FONT_FAMILY.BOLD };
        font-size: ${ theme.FONT_SIZE.BS }px;
        color: ${theme.COLORS.GRAY_100};
    `};
`;

export const InputField = styled(TextInput).attrs< Omit<Props, "size"> >(({ theme }) => ({
    cursorColor: theme.COLORS.GRAY_100
}))`
    flex: 1;

    padding: 14px;

    border-width: 1px;
    border-radius: 6px;

    ${({ theme, type }) => css`
        border-color: ${type === "Dark-Border" ? theme.COLORS.GRAY_100 : theme.COLORS.GRAY_500};

        font-family: ${ theme.FONT_FAMILY.REGULAR };
        font-size: ${ theme.FONT_SIZE.BM }px;
        color: ${theme.COLORS.GRAY_100};
    `};
`;