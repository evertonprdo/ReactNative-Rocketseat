import { Plus } from "phosphor-react-native";
import { Pressable, Text } from "react-native";
import styled, { css } from "styled-components/native";

export type ButtonStyleProps = "Dark" | "Light"

type Props = {
    type: ButtonStyleProps
    activited?: boolean
}

export const Container = styled(Pressable)<Props>`
    flex-direction: row;

    justify-content: center;
    align-items: center;

    padding: 16px 24px;
    gap: 12px;

    border-radius: 6px;

    ${({ theme, type, activited }) => type === "Dark" ?
    css`
        background-color: ${ activited ? theme.COLORS.GRAY_100 : theme.COLORS.GRAY_200 };
    ` : css`
        background-color: ${ activited ? theme.COLORS.GRAY_500 : "transparent" };
        border: 1px solid ${theme.COLORS.GRAY_100};
    `};
`;

export const Label = styled(Text)< Omit<Props, "activited"> >`
    ${({ theme, type }) => css`
        color: ${ type === "Dark" ? theme.COLORS.WHITE : theme.COLORS.GRAY_100 };
        font-family: ${ theme.FONT_FAMILY.BOLD };
        font-size: ${ theme.FONT_SIZE.BS }px;
    `}
`;

export const NewMealContainer = styled.View`
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