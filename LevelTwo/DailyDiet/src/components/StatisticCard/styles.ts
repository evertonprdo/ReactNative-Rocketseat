import { ArrowUpRight } from "phosphor-react-native";
import { Pressable } from "react-native";
import styled, { css } from "styled-components/native";

import type { StatusProps } from "@storage/meal/MealStorageDTO";

export type StatusVariantType = StatusProps | "NONE"
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

export const PressableIcon = styled.Pressable`
    position: absolute;
    border-radius: 73px;
    padding: 7px;

    top: 8px;
    right: 8px;

    z-index: 7;
`;

type OverviewProps = {
    type: StatusProps
}
export const Icon = styled(ArrowUpRight).attrs<OverviewProps>(({ theme, type }) => ({
    color: type === "GREEN" ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK,
    size: 24,
}))``;