import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowUpRight } from "phosphor-react-native";
import styled from "styled-components/native";

import type { StatusProps } from "@storage/meal/MealStorageDTO";

export const Container = styled(SafeAreaView)`
    flex: 1;

    padding: 24px 24px 0px;
    gap: 32px;

    background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const Header = styled.View`
    flex-direction: row;

    justify-content: space-between;

`;

export const Logo = styled.Image`
    height: 37px;
    width: 82px;
`;

export const Profile = styled.Image`
    height: 40px;
    width: 40px;

    border: 2px solid ${({theme}) => theme.COLORS.GRAY_200};
    border-radius: 73px;
`;

export const PressableIcon = styled.Pressable`
    position: absolute;
    border-radius: 73px;
    padding: 7px;

    top: 8px;
    right: 8px;

    z-index: 7;
`;

type Props = {
    type: StatusProps
}
export const Icon = styled(ArrowUpRight).attrs<Props>(({ theme, type }) => ({
    color: type === "GREEN" ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK,
    size: 24,
}))``;