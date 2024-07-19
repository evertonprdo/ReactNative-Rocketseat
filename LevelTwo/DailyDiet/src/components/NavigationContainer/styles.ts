import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

import type { StatusVariantType } from "@components/StatisticCard/styles";
import { ArrowLeft } from "phosphor-react-native";

type Props = {
    type: StatusVariantType
}
export const Container = styled(SafeAreaView)<Props>`
    flex: 1;

    background-color: ${({theme, type}) => type === "GREEN"
        ? theme.COLORS.GREEN_LIGHT
        : type === "RED"
        ? theme.COLORS.RED_LIGHT
        : theme.COLORS.GRAY_500
    };
`;

export const Header = styled.View`
    justify-content: center;
    align-items: center;

    padding: 24px;
`;

export const Content = styled.View`
    flex: 1;

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    padding: 40px 24px 24px;

    background-color: ${({ theme }) => theme.COLORS.GRAY_700};
    box-shadow: 0px 0px 30px #0000000D;
`;

export const PressableIcon = styled.Pressable`
    position: absolute;
    border-radius: 73px;
    padding: 7px;

    top: 24px;
    left: 24px;

    z-index: 7;
`;

export const Icon = styled(ArrowLeft).attrs<Props>(({ theme, type }) => ({
    color: type === "GREEN"
        ? theme.COLORS.GREEN_DARK
        : type === "RED"
        ? theme.COLORS.RED_DARK
        : theme.COLORS.GRAY_200
    ,
    size: 24
}))``;

export const Title = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.TS}px;
        color: ${theme.COLORS.GRAY_100};
    `}
`;