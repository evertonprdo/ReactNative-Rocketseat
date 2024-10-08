import styled from "styled-components/native";

export const ModalBg = styled.View`
    flex: 1;

    background-color: #00000022;
    justify-content: flex-end;
`;

export const DimissZone = styled.Pressable`
    flex: 4;
`;

export const Container = styled.View`
    flex: 5;
    padding: 24px;
    gap: 12px;

    justify-content: space-between;

    border: 1px solid black;
    background-color: ${({theme}) => theme.COLORS.GRAY_700};
`;