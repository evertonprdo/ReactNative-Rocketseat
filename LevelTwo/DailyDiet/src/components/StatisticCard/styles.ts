import { Pressable } from "react-native";
import styled, { css } from "styled-components/native";

export type StatusVariantType = "GREEN" | "RED" | "NONE"
export type HeadlineSizeVariantType = "TM" | "TG"

type Props = {
    type: StatusVariantType
    size?: HeadlineSizeVariantType
}

export const Container = styled(Pressable)<Props>`
    align-items: center;

    padding: 20px 16px;
    gap: 2px;
    border-radius: 8px;

    background-color: ${({theme, type}) => (
        type === "GREEN" ? theme.COLORS.GREEN_LIGHT
        : type === "RED" ? theme.COLORS.RED_LIGHT
        : theme.COLORS.GRAY_600
    )};
`;

export const Headline = styled.Text< Omit<Props, "type"> >`
    ${({ theme, size }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${ size === "TM" ? theme.FONT_SIZE.TM : theme.FONT_SIZE.TG}px;
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