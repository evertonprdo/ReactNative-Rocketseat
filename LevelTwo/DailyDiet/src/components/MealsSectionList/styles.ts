import { Circle } from "phosphor-react-native";
import styled, { css } from "styled-components/native";

type Props = {
    type: "GREEN" | "RED"
}

export const Container = styled.Pressable`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 14px 16px 14px 12px;
    gap: 12px;

    border: 1px solid ${({theme}) => theme.COLORS.GRAY_500};
    border-radius: 6px;
`;

export const Time = styled.Text`
    ${({theme}) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.BXS}px;
        color: ${theme.COLORS.GRAY_200};
    `}
`;

export const Description = styled.Text`
    flex: 1;
    align-self: flex-start;

    padding-left: 12px;

    border-left-width: 1px;
    border-left-color: ${({theme}) => theme.COLORS.GRAY_400};

    ${({theme}) => css`
        font-family: ${theme.FONT_FAMILY.REGULAR};
        font-size: ${theme.FONT_SIZE.BM}px;
        color: ${theme.COLORS.GRAY_200};
    `}
`;

export const StatusIcon = styled(Circle).attrs<Props>(({theme, type}) => ({
    color: type === "GREEN" ? theme.COLORS.GREEN_MID : theme.COLORS.RED_MID,
    size: 14,
    weight: 'fill'
}))``;

export const SectionTitle = styled.Text`
    margin-top: 24px;
    
    ${({theme}) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.TS}px;
        color: ${theme.COLORS.GRAY_100};
    `}
`;