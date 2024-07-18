import styled, { css } from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
    flex: 1;

    padding: 24px;
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

export const Card = styled.View`
    flex: 1;

    max-height: 136px;
    min-height: 136px;
`;